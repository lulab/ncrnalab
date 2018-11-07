

 species = document.getElementById("species");

//check upload file local
function readSingleFile(e) {
	var file = e.target.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e) {
		 contents = e.target.result;
		if(!checkInput(contents)){
			document.getElementById('file-input').value = "";
		}
	};
	reader.readAsText(file);
}


document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);


function isEmpty(str){
	if (typeof(str) == "undefined") return 1;
	var replace = str.replace(/(^\s*)|(\s*$)/g, "");
	return !replace.length;
}



function checkInput(input){
	var line = input.split("\n");
	if (line.length > 990000) {
		alert("Input file more than 100M!");
		return 0;
	}
	for(var i=0; i<line.length; i++){
		if (line[i].match(/^#/g)) continue;
		if (line[i].match(/^$/g)) continue;

		var word = line[i].split(/\t/);
		for(var j = 0; j<9; j++){
			if(isEmpty(word[j])) {  
				 alert("Please check each column not null, or make sure echo column is separated by \"tab\". Usually \"tab\" cannot be typed directly in a html web page. You can edit the gtf format with \"tab\" in word, then copy and paste it here.");
				 return 0;
			}
		}
		var reads_length=word[4]-word[3];
		if (species.value == "human"){
			//var chrNum = word[0].match(/\d*/g);
			//alert(chrNum); 
			if (!(word[0].match(/^chr(1[0-9]|2[0-2]|[0-9])$/g)||word[0].match(/^chr(X|Y)$/g))){

			//	if (word[0].match(/^chr(1[0-9]|2[0-2]|[0-9])$/ig)) alert ("Chromosome names are not in lower case");
			//	else if (word[0].match(/^chr\d+/ig)) alert("Chromosome names are not chr1-chr22 or chrX!");
			//	else alert("Please check the chromosome name."); 
				alert("Your file contains chromosome \""+word[0]+"\", which is not chr1, chr2, ..., chr22, chrX or chrY");
				return 0;
			} 
		}
		else if (species.value == "mouse"){
			if (!(word[0].match(/^chr(1[0-9]|[0-9])$/g)||word[0].match(/^chr(X|Y)$/g))){
				alert("Your file contains chromosome \""+word[0]+"\", which is not chr1, chr2, ..., chr19, chrX or chrY");
				return 0;
			}
		}
		else if  (species.value == "worm"){
			if (!(word[0].match(/^chr(I|II|III|IV|V|X|Y)$/g))){
			//	 if (word[0].match(/^chr(I|II|III|IV|X|Y)$/ig)) alert ("Chromosome names are not in lower case");
			//	 else alert("Chromosome name are not chrI, chrII, chrIII, chrIV, chrX, chrY."); 
				
				alert("Your file contains chromosome \""+word[0]+"\", which is not chrI, chrII, chrIII, chrIV, chrV or chrX");
				return 0;
			} 
		}
		else if (species.value == "fly"){
			if (!(word[0].match(/^chr(2R|2L|3L|3R|4|X)$/g))){
				alert("Your file contains chromosome \""+word[0]+"\", which is not chr2L, chr2R, chr3L, chr3R, chr4 or chrX");
				return 0;
			}
		}
		else if (species.value == "plant"){
			if (!(word[0].match(/^chr([1-5])$/g))){
				alert("Your file contains chromosome \""+word[0]+"\", which is not chr1, chr2, chr3, chr4 or chr5");
				return 0;
			}
		}
		if(isNaN(word[3]) || isNaN(word[3]) || reads_length<=0){ 
			 alert("Please check the exon length !");
			 return 0;
		}
		if(!(word[2].match(/exon/i)||word[2].match(/transcript/i))){
			 alert("The third column should be \"exon\" or \"transcript\" !");
			 return 0;
		}
		if(!word[8].match(/transcript_id/i)){
			 alert("Please check the transcript_id !");
			 return 0;
		}else{
			var temp1 = word[8].split(word[8].match(/transcript_id/i));
			var temp2 = temp1[1].split("\"");
			if (isEmpty(temp2[1])){
				alert("Please check the transcript_id not null!");
				return 0;
				
			}
		}


		if(!word[8].match(/gene_id/i)){
			 alert("Please check the gene_id !");
			 return 0;
		}else{
			var temp1 = word[8].split(word[8].match(/gene_id/i));
			var temp2 = temp1[1].split("\"");
			if (isEmpty(temp2[1])){
				alert("Please check the gene_id not null!");
				return 0;
				
			}
		}

	}
//alert(input);
	return 1;
} 




function validate_form(){
	var fileUrl=document.getElementById('file-input').value ;

	 //var form = document.forms["demoForm"]; 

	 if (fileUrl) { 
		inputText = contents;
	 } else if (text.value){ 
		if(checkInput(text.value)) {
			inputText = text.value;
		}else{
			return false;
		}
	 } else {
	 	alert ("Please paste or choose a file."); 
	 	return false;
	 } 
	//
	inputText = inputText.replace(/\+/g, "%2B");
	id = randNum(10);
	load();
	$.ajax({
		url:'come.php',
		type:'POST',
		data:'text='+inputText+'&species='+species.value+'&id='+id,
		success:function(response){
			if (response==1){
//				$("#jobState").html('<p  style="font-size:24px"> Job state : <a style="color:#32E932">Done</a></p>');
				$("#jobState").html('<p  style="font-size:24px"> Job status and link to log: <a style="color:#32E932" target="_blank" href="./result/'+id+'/log">Done</a></p>');
			}
			if (response==2){
				$("#here").hide();
				$("#jobState").html('<p  style="font-size:24px"> Job status and link to log : <a style="color:red" target="_blank" href="./result/'+id+'/log">Error Message</a></p>');
			}
		}
	});


	return false;
}

function randNum(n){
  var rnd="";
  for(var i=0;i<n;i++)
     rnd+=Math.floor(Math.random()*10);
  return rnd;
}

function load(){
$(".load").show();
//$("#change").html('Please wait ... <br> (This page will be autonatically refreshed when the result is ready.)');
$("#change").hide();
$("#resultLink").html('<p id="here" style="font-size:24px">Click <a target="_blank" href="result.php?ID=result/'+id+'">here</a> to see your result, when the job status is "Done".</p><p id="jobState" style="font-size:24px"> Job status : <a style="color:#428BCA" target="_blank" href="./result/'+id+'/log"><blink>Running...</blink></a></p>');

}

//blink function
  setInterval(function(){
      $('blink').each(function(){
        $(this).css('visibility' , $(this).css('visibility') === 'hidden' ? '' : 'hidden')
      });
    }, 250);



function load_safari(){

x=document.getElementById("change");  //查找元素
x.innerHTML="<link href=\"./load.css\" rel=\"stylesheet\"><div class=\"container\"><div class=\"warning\"></div></div>";

}

/*
            $('form').on('submit', function() {
              //  $(this).find('input').css('background', '#c00');
              alert("test");
		setTimeout(load,1000);
              //load();
		//setTimeout("window.location.href='http://lulab.life.tsinghua.edu.cn/RNAfinder/test.html'",1);
		
            });
*/
