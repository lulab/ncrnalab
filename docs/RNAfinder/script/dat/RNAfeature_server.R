#Args <-commandArgs(TRUE);
#inputF1= Args[1];#input the CP h5 file;
#inputF2= Args[2];#input the transcripts file list
#inputF3= Args[2];#input the model;
#output1= Args[4];#output the prediction coding potential for transcripts
inputF1 = '/home/shibinbin/RNAfeature2/dat/human/CP.h5';
inputF3 = '/home/shibinbin/RNAfeature2/dat/human/transcripts.model';

options(scipen=1000);

library(rhdf5);
library(randomForest);
load(inputF3);
####	assign function:
my_fuc=function(X, CP){
x0	=	as.numeric(unlist(strsplit(X,split=",")))
x	=	CP[x0];
N	=	as.numeric(length(x));
Mean	=       as.numeric(mean(x));
Min     =       as.numeric(min(x));
Q1	=       as.numeric(quantile(x,0.25));
Median	=       as.numeric(median(x));
Q3	=       as.numeric(quantile(x,0.75));
Max     =       as.numeric(max(x));
CSS	=	as.numeric(sum((x-Mean)^2));
USS	=	as.numeric(sum(x^2));
y	=       c(N,Mean,Min,Q1,Median,Q3,Max,CSS,USS);
}
####	

rnafeature2 <- function(inputF2, output1){
  TR_files	=	as.vector(as.matrix(read.table(inputF2,sep="\t",head=F)));
  for(i in 1:length(TR_files)){
	TR_NM	=	TR_files[i];
	tmp	=	unlist(strsplit(TR_NM,fix=T,split="."));
	PT_NM	=	paste(tmp[(length(tmp)-1)],tmp[length(tmp)],sep=".");
	TR	=	read.table(TR_NM,head=F,sep="\t",quote="");
	TRID    =       as.data.frame(as.matrix(TR[,1]))
	CP	=	h5read(inputF1,PT_NM)
	m       =       as.vector(TR[,2]);
	out	=	matrix(0,nrow=length(m),ncol=9);
	colnames(out)	=	c("N","Mean","Min","Q1","Median","Q3","Max","CSS","USS")
	for(j in 1:length(m)){
		out[j,]	=	round(my_fuc(m[j],CP),6)
	}
        RF_pred	=	predict(rf,out,type="vote");
	CDS	=	RF_pred[,1];
	CDS	=	as.data.frame(CDS)
	out2	=	cbind(TRID,CDS);
	if(i==1){
	final_out	=	out2;
	}else{
	final_out	=	rbind(final_out,out2);
	}
  }

  write.table(final_out,file=output1,quote=F,sep="\t",col.name=F,row.name=F);
}

