library(RSclient);

Args <-commandArgs(TRUE);
#inputF1= Args[1];#input the CP h5 file;
inputF2= Args[1];#input the transcripts file list
#inputF3= Args[3];#input the model;
output1= Args[2];#output the prediction coding potential for transcripts

c <- RSconnect();
RSeval(c, sprintf('rnafeature2(\'%s\', \'%s\');', inputF2, output1));
RSclose(c);
