#! /bin/sh
# $1 input gtf
# #2 output directory
# $3 species
# $4 ratio


rootdir=/var/www/html/RNAfinder
  cd $rootdir
 bash $rootdir/come/bin/COME_main.sh $rootdir/$1 $rootdir/$2 $rootdir/come/bin $3 &>$rootdir/$2/log  
 #bash $rootdir/come/bin/COME_main.sh $rootdir/$1 $rootdir/$2 $rootdir/come/bin  &>$rootdir/$2/log  
 cat $2/result
