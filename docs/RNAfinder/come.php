<?php
///////////////////////////////////////////////////////////
//1. a function to format result files (result --> result.json) for display by result.php  
///////////////////////////////////////////////////////////
	function displayResult($resultId){
		//convert the raw table file to a json file
	if (!file_exists("./".$resultId."/result")){
		echo "2";
		exit;
	}
/*
	if (!file_exists("./".$resultId."/result")){
		$log_page="./".$resultId."/log";
		echo '<div> <h2 style = "text-align: center;">Computational error: </h2> </div>';
		$logfile = fopen("./".$resultId."/log", "r") or die("Unable to open log file!");
		while(!feof($logfile)) {
			   echo fgets($logfile) . "<br>";
		}
		fclose($logfile);
	}
*/
		$uploadfile = fopen("./".$resultId."/result", "r") ;
  		$resultString= fread($uploadfile,filesize("./".$resultId."/result"));	
		fclose($uploadfile);
		$line = explode("\n",$resultString);
	 	for ($i = 0; $i < count($line); $i++){
                        if (!preg_match("/[a-zA-Z0-9_]/",$line[$i])) continue;
                        $each = explode("\t",$line[$i]);
			$resultArray[$i] = array (	"Transcript ID" => $each[0],
							"Coding Potential" => $each[1],
							"Predicted Class" => $each[2],

							 "subclass" => $each[3],
							 "DNA_Conservation" => $each[4],
							 "Protein_Conservation" => $each[5],
							 "NonpolyA" => $each[6],
							 "PolyA" => $each[7],
							 "smallRNA" => $each[8],
							 "GC_content" => $each[9],
							 'H3K36me3' => $each[10],
							 'RNA_structure' => $each[11],
							 'H3K4me3' => $each[12],
							 'Transcript_length' => $each[13],

						 );	
		}
		$jsonresultArray=json_encode($resultArray);		
		$jsonfile = fopen("./".$resultId."/result.json", "w") ;

		fwrite($jsonfile, '{"data":');
		fwrite($jsonfile, $jsonresultArray);
		fwrite($jsonfile, "}");
                fclose($jsonfile);

		//re-direct to the display page
//		header("Location: $result_page");  
	}


///////////////////////////////////////
//2. a function to run COME at queue
///////////////////////////////////////
	function codingPotential($tempId){
		$cmd = "name=job1&command=".urlencode("/var/www/html/RNAfinder/submit_job.sh ".$tempId."/input ".$tempId." ".$_POST["species"]);
		exec("curl 'localhost:4321/submit?".$cmd."'",$res,$res1);
		return $res[0];
		
	}

///////////////////////////////////////
//3. a function to make a dir to store result of come
///////////////////////////////////////
	function makeTemp(){
		//exec("mktemp -d  --tmpdir -p result XXXXXXXXXXXXXXX", $tempId);
		
		exec("mkdir result/".$_POST["id"]);
		return "result/".$_POST["id"];	
	}

	function linkPage($resultId){

		$result_page="./result.php?ID=".$resultId;
		echo " <div> <h3 style = \"text-align: center;\">Coding Potential for your RNA transcripts</h3> </div>";
 		echo "<div>";
		echo '<a href="'.$result_page.'">Show Result</a>';
 		echo "</div>";
	}
///////////////////////////////////////
///////////////////////////////////////
// main part of php: read from uploaded file or pasted text; then call other functions to run
///////////////////////////////////////
///////////////////////////////////////
	// get input and write input file for uploaded file
/*
	if ($_FILES["file"]["size"]){
		if ($_FILES["file"]["error"] > 0){
                 echo "Error: " . $_FILES["file"]["error"] . "<br />";
		}
			$filePath = $_FILES["file"]["tmp_name"];
			$gtf=file_get_contents($_FILES['file']['tmp_name']);
			$tempId = makeTemp();  //prepare the dir
			linkPage($tempId);
			exec("/bin/mv ".$filePath." ./".$tempId."/input");
			if (codingPotential($tempId)) displayResult($tempId); //run COME and output result files
			else echo "No result";
	// get input and write input file for pasted text
	}else if ($_POST["text"]){
*/
		$gtf = $_POST["text"]; 
		if(get_magic_quotes_gpc()){   //如果get_magic_quotes_gpc()是打开的
			$gtf=stripslashes($gtf);  //将字符串进行处理
		}
		//echo $gtf;
		$tempId = makeTemp();  //prepare the dir
		$myfile = fopen("./".$tempId."/input", "w") or die("Unable to open file!");
		fwrite($myfile, $gtf);
		fclose($myfile);
		exec("dos2unix ./".$tempId."/input");
		if (codingPotential($tempId)){
			 displayResult($tempId); //run COME and output result files
			 echo "1";
		}
		else echo "2";
	//handle other input errors
/*
	}else if (!$_POST["text"] && !$_FILES["file"]["size"]){
		echo "<script>alert('Please paste or upload gtf file');</script>";
	}else{
		echo "<script>alert('Invalid file');</script>";
	}
*/
?>

