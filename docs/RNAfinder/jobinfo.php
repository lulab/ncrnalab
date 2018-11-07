<?php

exec("curl localhost:4321/jobinfo", $result);
    foreach ($result as $line){ 
      echo " $line <br />"; 
    } 
?>
