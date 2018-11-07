<?php
    
    require_once '../../model/Knowle.model.php';
    require_once '../../configs/sys.config.php';

$q=$_GET["q"];
  $hint = "";

    $tag = $_GET["tag"];
if ($tag == "factor" ){


    $knowleObj = new KnowleModel();
    $rsArray = $knowleObj -> getFactors();

    $selectArray = array();
    if(is_array($rsArray) && !empty($rsArray)){
        foreach($rsArray as $rskey=>$tempArray){
            if(is_array($tempArray) && !empty($tempArray)){
                $selectArray[] = $tempArray['factor'];
		$test = $tempArray['factor'];
		$selectidArray[$test] = $tempArray ['id'];  
	    }
        }
    }
if (strlen($q) > 0)
  {	
  $hint=$selectidArray[$q];
	
}
}

if ($tag == "genes" ){
    $knowleObj = new KnowleModel();
// use getIdByGenes($q) to avoid select all rows from RBPgene.
  $rsArray = $knowleObj -> getIdByGenes($q);
 // $rsArray = $knowleObj -> getGenes();

if (strlen($q) > 0)
  {	
  $hint=$rsArray[0]['id'];
}
}
//获得来自 URL 的 q 参数



//获得来自 URL 的 q 参数


//如果 q 大于 0，则查找数组中的所有提示



/*
if ($hint == "")
    $response = "";
}else{
    $response = $hint;
}

//输出响应
echo $response;
*/

echo $hint;
?>
