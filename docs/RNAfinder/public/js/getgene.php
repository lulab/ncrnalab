<?php
    
    require_once '../../model/Knowle.model.php';
    require_once '../../configs/sys.config.php';

$q=$_GET["q"];
$species = $_GET["species"];
    $knowleObj = new KnowleModel();

if ($species== "Human"){
    $rsArray = $knowleObj -> getGenesByGenes($q);
    } else if ($species== "Mouse"){
    $rsArray = $knowleObj -> getGenesByGenes_mouse($q);
    }  else if ($species== "Worm"){
    $rsArray = $knowleObj -> getGenesByGenes_worm($q);
    }  else if ($species== "Yeast"){
    $rsArray = $knowleObj -> getGenesByGenes_yeast($q);
    }

    $selectArray = array();
    if(is_array($rsArray) && !empty($rsArray)){
        foreach($rsArray as $rskey=>$tempArray){
            if(is_array($tempArray) && !empty($tempArray)){
                $selectArray[] = $tempArray['IdorName'];
		$selectidArray[$tempArray['IdorName']] = $tempArray ['id'];  
	    }
        }
    }



//获得来自 URL 的 q 参数

//如果 q 大于 0，则查找数组中的所有提示
  if (strlen($q) > 0)
  {
  $hint="";
  for($i=0; $i<count($selectArray); $i++)
    {
//$hint.= $rsArray[$i]['genes'];
      if ($hint=="")
        {
        $hint="<li><a id=\"".$selectidArray[$selectArray[$i]]."\" href=\"javascript:changegenesinput('$selectArray[$i]')\">".$selectArray[$i]."</a></li>";
        }
      else
        {
        //<li class="ui-select-item ui-select-item-factors" id={$key}><a href="javascript:void(0);" id="a{$key}">{$value}</a></li>
        //$hint=$hint." , ".$selectArray[$i];
        $hint = $hint."<li><a id=\"".$selectidArray[$selectArray[$i]]."\" href=\"javascript:changegenesinput('$selectArray[$i]')\">".$selectArray[$i]."</a></li>";
        }    
}


}



if ($hint == "")
  {
  $response="No suggestion";
  }
else
  {
  $hint="<ul id=\"inputkeys\"  style=\"height:100px;overflow:auto;\" class=\"inputkey\">".$hint."</ul>";
  $response = $hint;

  }

//输出响应
echo $response;
?>
