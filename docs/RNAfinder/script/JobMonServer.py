#! /usr/bin/env python

# a truly minimal HTTP proxy

import SocketServer
import argparse
import random
import time
import urlparse
import BaseHTTPServer
import sqlite3
import os
import multiprocessing

rng = random.Random()
job_dbfile = ''
pool = None

def InitJobDB(dbfile):
    conn = sqlite3.connect(dbfile)
    cursor = conn.cursor()
    cursor.execute('''DROP TABLE IF EXISTS JobInfo''')
    cursor.execute('''CREATE TABLE JobInfo
        (jobid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, command TEXT,
        status TEXT, time TEXT)''')
    conn.commit()
    conn.close()
    
def job1(args):
    time.sleep(2)
    print 'job completed %s'%args
    
import subprocess
import sys

def runjob(jobid):
    conn = sqlite3.connect(job_dbfile)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM JobInfo WHERE jobid = ?', (jobid,))
    row = cursor.fetchone()
    if row:
        script_file = row[2]
        try:
            out = subprocess.check_output(script_file, shell=True)
            cursor.execute('UPDATE JobInfo SET status = ? WHERE jobid = ?',
                           ('completed', jobid))
            conn.commit()
            conn.close()
            return out
        except subprocess.CalledProcessError as e:
            sys.stderr.write('CalledProcessError: exit code: %d\n'%e.returncode)
            sys.stderr.write('Command line: %s\n'%e.cmd)
            cursor.execute('UPDATE JobInfo SET status=? WHERE jobid=?',
                           ('failed', jobid))
            conn.commit()
    conn.close()
            
class JobMonitor(BaseHTTPServer.BaseHTTPRequestHandler):
    def print_info(self):
        path = urlparse.urlparse(self.path)
        self.wfile.write('scheme: %s\n'%path.scheme)
        self.wfile.write('path: %s\n'%path.path)
        self.wfile.write('netloc: %s\n'%path.netloc)
        self.wfile.write('query: %s\n'%path.query)
        self.wfile.write('hostname: %s\n'%path.hostname)
        self.wfile.write('port: %s\n'%path.port)
        
    def submit_handler(self):
        # parse form data
        data = {}
        if self.command == 'POST':
            import cgi
            form = cgi.FieldStorage(fp=self.rfile, headers=self.headers,
                                environ={'REQUEST_METHOD': 'POST', 
                                         'CONTENT_TYPE': self.headers['Content-Type']})
            for field in form:
                data[field] = form[field].value
        elif self.command == 'GET':
            query = urlparse.urlparse(self.path).query
            if query:
                query = urlparse.parse_qs(query)
                for field in query:
                    data[field] = query[field][0]
        else:
            return
        
        required_fields = ['name', 'command']
        for field in required_fields:
            if field not in data:
                self.wfile.write('Error: field %s is required!\n'%field)
                return
          
        conn = sqlite3.connect(job_dbfile)
        cursor = conn.cursor()
        timestr = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
        cursor.execute('INSERT INTO JobInfo (name, command, status, time) VALUES (?, ?, ?, ?)',
                       (data['name'], data['command'], 'queued', timestr))
        conn.commit()
        jobid = cursor.lastrowid
        
        result = pool.map(runjob, (jobid,))
        
        #self.wfile.write('Job %d has been submitted\n'%jobid)
        #self.wfile.write('Output: %s\n'%result[0])
        self.wfile.write(result[0])
        
        # for debugging
        """
        cursor.execute('SELECT * FROM JobInfo WHERE jobid == ?', (jobid,))
        row = cursor.fetchone()
        if row:
            self.wfile.write('JobInfo: ' + ', '.join([str(v) for v in row]) + '\n')
        """
        conn.close()
        
    def del_handler(self):
        pass
    
    def jobinfo_handler(self):
        data = {}
        query = urlparse.urlparse(self.path).query
        if query:
            query = urlparse.parse_qs(query)
            for field in query:
                data[field] = query[field][0]
        
        self.wfile.write('Job information\n')
        conn = sqlite3.connect(job_dbfile)
        cursor = conn.cursor()
        
        if 'jobid' in data:
            cursor.execute('SELECT * FROM JobInfo WHERE jobid = ?', (data['jobid'],))
        else:
            cursor.execute('SELECT * FROM JobInfo')
        self.wfile.write('\t'.join(zip(*cursor.description)[0]) + '\n')
        for row in cursor.fetchall():
            self.wfile.write('\t'.join([str(v) for v in row]) + '\n')
        conn.close()
        
    def shutdown_handler(self):
        self.wfile.write('Shutting down server\n')
        pool.close()
        self.server.shutdown()
        
    def do_GET(self):
        path = urlparse.urlparse(self.path)
        print '[GET]', self.headers['Host'], self.path
        
        handlers = {}
        handlers['/submit'] = self.submit_handler
        handlers['/jobinfo'] = self.jobinfo_handler
        handlers['/shutdown'] = self.shutdown_handler
        handlers['/print_info'] = self.print_info
        if path.path in handlers:
            self.send_response(200)
            self.end_headers()
            handlers[path.path]()
        else:
            self.send_error(404)
            
    def do_POST(self):
        path = urlparse.urlparse(self.path)
        print '[POST]', self.headers['Host'], self.path
        
        handlers = {}
        handlers['/submit'] = self.submit_handler
        handlers['/del'] = self.del_handler
        handlers['/jobinfo'] = self.jobinfo_handler
        handlers['/shutdown'] = self.shutdown_handler
        handlers['/print_info'] = self.print_info
        
        if path.path in handlers:
            self.send_response(200)
            self.end_headers()
            handlers[path.path]()
        else:
            self.send_error(404)
            
def main():
    parser = argparse.ArgumentParser('Simple HTTP proxy server')
    parser.add_argument('-a', '--addr', type=str, required=False,
                        default='127.0.0.1', help='Address to listen on')
    parser.add_argument('-p', '--port', type=int, required=False, default=None,
                        help='Port to listen to')
    parser.add_argument('-d', '--dbfile', type=str, required=False, default='jobs.sqlite',
                        help='SQLite database containing job information')
    parser.add_argument('-j', '--jobs', type=int, required=False, default=4,
                        help='Maximum number of jobs to run in parallel')
    parser.add_argument('--async', action='store_true', default=False,
                        help='Asynchronous job submission')
    
    args = parser.parse_args()
    
    if not args.port:
        args.port = rng.randint(2000, 30000)
        
    global job_dbfile
    job_dbfile = args.dbfile
    if not os.path.exists(args.dbfile):
        print 'Initializing job database ...'
        InitJobDB(args.dbfile)
    
    print 'Starting %d worker processes ...'%args.jobs
    global pool
    pool = multiprocessing.Pool(args.jobs)
    
    print "JobMonitor serving at %s:%d"%(args.addr, args.port)
    SocketServer.TCPServer.allow_reuse_address = True
    httpd = SocketServer.ThreadingTCPServer((args.addr, args.port), JobMonitor)
    httpd.serve_forever()
    
if __name__ == '__main__':
    main()