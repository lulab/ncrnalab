/**

	main js for the details of datasets;

 * 

 */



//dataset，点击出现，点击隐藏

function onClickDiv(DivId)
{
if(document.all[DivId].style.display=='none')
   { document.all[DivId].style.display=''; }
   else
   { document.all[DivId].style.display='none'; }
   return 0;
}



//for cutoff 
function changeurl(url,id){
	var  cutoff = document.getElementById(id);
	var  index  = cutoff.selectedIndex;
	var  value  = cutoff.options[index].value;
if (value==0.001) 
	{
		url = url+"_"+value;
	}
	url = url+"/";
	window.open(url);
}

//For download


/*                  */

function changehidden(stl){   //mf

var xmlcctv;

if (stl.length==0)
  {
  //document.getElementById("txtHint").innerHTML="";
  return;
  }

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlcctv=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlcctv=new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlcctv.onreadystatechange=function()
  {
  if (xmlcctv.readyState==4 && xmlcctv.status==200)
    {
	$("#hiddenkey").val(xmlcctv.responseText);
    }
  }
tag = "factor";

xmlcctv.open("GET","./public/js/cghidden.php?q="+stl+"&tag="+tag,true);
xmlcctv.send();

}

// gene change hidden
function changegeneshidden(stl){   //mf
//alert (stl);
var xmlcctv;

if (stl.length==0)
  {
  //document.getElementById("txtHint").innerHTML="";
  return;
  }

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlcctv=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlcctv=new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlcctv.onreadystatechange=function()
  {
  if (xmlcctv.readyState==4 && xmlcctv.status==200)
    {
//	$("#genesHiddenkey").val(xmlcctv.responseText);
    }
  }

tag = "genes";
xmlcctv.open("GET","./public/js/cghidden.php?q="+stl+"&tag="+tag,true);
xmlcctv.send();

}



function changeinput(key_value){
//$(document).ready(function(){
	//$('.inputkey li a').on('click', function(){
        	//var cc = $(this).html()
		var cc = key_value;
		$("#content").html(cc);
		changehidden(cc);
		$("#txtHint").html("");
		$("#inputmanul").val(cc);
		$('#select-content').hide('fast');
	//});

//});
}

// change input for genes

function changegenesinput(key_value){
//$(document).ready(function(){
        //$('.inputkey li a').on('click', function(){
                //var cc = $(this).html()
                var cc = key_value;
            //    $("#content-genes").html(cc);
                changegeneshidden(cc);
                $("#genesHint").html("");
                $("#inputgenesmanul").val(cc);
                $('#select-content-genes').hide('fast');
        //});

//});
}





function showHint(str) // mf get the factors
{
var xmlhttp;
$('#select-content').hide('fast');


if (str.length==0)
  {
  document.getElementById("txtHint").innerHTML="";
  $("#content").html("Please Select");
  return;
  }else{
  $("#content").html(str);
  }
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	//alert (xmlhttp.responseText);
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
	//$("#txtHint").html(xmlhttp.responseText);
    }
  }
	$("#content").html(str);
xmlhttp.open("GET","./public/js/getfactor.php?q="+str,true);
xmlhttp.send();

changehidden(str);
}


// for genes  showgeneHit
function showgenesHint(str) // mf get the factors
{
var xmlhttp;
$('#select-content-genes').hide('fast');
var species = $('#genesHiddenkey').val();
//alert(key);

if (str.length==0)
  {
  document.getElementById("genesHint").innerHTML="";
 // $("#content-genes").html("human");
  return;
  }else{
 //  $("#content-genes").html(str);
  }
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	//alert (xmlhttp.responseText);
    document.getElementById("genesHint").innerHTML=xmlhttp.responseText;
	//$("#txtHint").html(xmlhttp.responseText);
    }
  }
	//$("#content-genes").html(str);
xmlhttp.open("GET","./getgene.php?q="+str+"&species="+species,true);
xmlhttp.send();
 
changegeneshidden(str);
//alert (str);
}


//for statistics
function getRatio(special_key){   //mf
var rbpStatistics  = new Array();
                        $.ajax({
                                url:'detail_ajax_statistics.php',
                                dateType:'json',
                                type:'POST',
                                async :false,
                                data:'key='+special_key,
                                success:function(response){
                                        if (typeof response !== 'object') response = JSON.parse(response);
                                                 rbpStatistics = response.data[0];
//alert (rbpStatistics);

                                },
                                error:function(){

                                },
                                beforeSend:function(){

                                },
                                complete:function(){

                                }
                        });
        return rbpStatistics;

}


function detail(special_key){   //mf
		
var isempty = 0;
			$.ajax({
				url:'detail_ajax_rbpinfo.php',
				dateType:'json',
				type:'POST',
				async :false,
				data:'key='+special_key,	
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					var dataLen = response['data'].length;
					for(var i=0; i<dataLen; i++){
						var rbpInfo = response.data[i];
						
						if(rbpInfo['motif']) isempty++;
						if(rbpInfo['assay']) isempty++;
						if(rbpInfo['rbd'])  isempty++;
						if(rbpInfo['pwm'])  isempty++;
						if(rbpInfo['logo'])  isempty++;
						if(rbpInfo['link'])  isempty++;
                        			if (rbpInfo['reference'])  isempty++;
	
					}

				},
				error:function(){
				
				},
				beforeSend:function(){
					
				},
				complete:function(){
					
				}
			});
	return isempty;
				
}


//mf
                                   
$(document).ready(function(){

	$('.ui-nav-main li').on('click', function(){
	    $(this).addClass('ui-nav-item-current').siblings().removeClass('ui-nav-item-current');
	});

	$('ul.ui-nav-main').each(function(){
	  // For each set of tabs, we want to keep track of
	  // which tab is active and it's associated content
	  var $active, $content, $links = $(this).find('a');

	  // If the location.hash matches one of the links, use that as the active tab.
	  // If no match is found, use the first link as the initial active tab.
	  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
	 // alert ($active);
	  $active.addClass('active');
	  $content = $($active.attr('href'));

	  // Hide the remaining content
	  $links.not($active).each(function () {
	    $($(this).attr('href')).hide();
	  });

	  // Bind the click event handler
	  $(this).on('click', 'a', function(e){
	    // Make the old tab inactive.
	    $active.removeClass('active');
	    $content.hide();

	    // Update the variables with the new link and content
	    $active = $(this);
	    $content = $($(this).attr('href'));

	    // Make the tab active.
	    $active.addClass('active');
	    $content.show();

	    // Prevent the anchor's default click action
	    e.preventDefault();
	  });
	});
});


// Wait until the DOM has loaded before querying the document
$(document).ready(function(){
	$('#hiddenkey').val('86');
	$('#select-trigger').click(function(){
		$('#select-content').slideToggle('fast');
		$('#hiddenkey').val('-1');
	});
	$('.ui-select-item-factors').each(function(index){
		var thisObj = $(this);
		thisObj.click(function(event){
			var key = thisObj.attr('id');
			$("#txtHint").html("");
			$("#inputmanul").val("");
			if(typeof key != 'undefined' && key != ''){
				$('#content').html($('#a'+key).html());
				$('#hiddenkey').val(key);
				$('#select-content').slideToggle('fast');
				event.stopPropagation();
			}
		});
	});
	
	
	$('#search').click(function(){
		 $("#txtHint").html("");
		 $("#inputmanul").val("");
		 $("#content").html("Please Select");
		$('#show-tips').hide('fast'); //错误提示
		$('#success-content-rbpinfo').hide('fast'); //成功后显示的数据
		$('#select-content').hide('fast');
		var key = $('#hiddenkey').val();
		//alert (key);

		if(typeof key == 'undefined' || key == '' || !key || key < 0){
			//$('#errorMsg').html('Empty, please select.');
			//$('#show-tips').slideToggle('fast');
			// mf  去除错误提示
			$('#success-content-rbpinfo').hide('fast');
			$('#select-content').hide('fast');
		}else{

		//start

			$.ajax({
				url:'search_ajax_rbpinfo.php',
				dataType:'json',
				type:'POST',
				data:'key=' + key,
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					if(response.code){
					
					$('#success-table-rbpinfo thead').html(' ' );
					
					var rbpinfo = response.data[0];
			    		var ismore  = detail(rbpinfo['species_id']);
					var tempStr = '';
					tempStr += '<tr>';
					tempStr += '<th>Factors</th>';
					tempStr += '<th>Species</th>';
					tempStr += '<th>Entrez ID</th>';
					tempStr += '<th>Annotation ID</th>';
					tempStr += '<th>Synonyms</th>';
					tempStr += '<th>Binding Domain</th>';
					if (ismore > 0) tempStr += '<th>More</th>';
					$('#success-table-rbpinfo thead').append(tempStr);

					//mf
					$('#success-table-rbpinfo tbody').html(' ');
				// 加载factor 信息   
			
				var datalen = response.data.length;

				for(var i=0; i<datalen; i++){
                            	
				var rbpInfo = response.data[i];
                         //   for (var n in rbpInfo) {
				// modi by ytao
                           //     if (rbpInfo[n] === null) rbpInfo[n] = "NA";
                           // 
			 //   alert (key);
			//    alert (rbpInfo['species_id']);	mf
			    var isdetails  = detail(rbpInfo['species_id']);

					if (rbpInfo['species'] == "Mouse"){

					}					

					if(i % 2 == 0){
								var tempStr = '<tr class="dataeven" trname="trkey" trkey="'+ rbpInfo['species_id'] +'">';	
							}else{
								var tempStr = '<tr class="dataeven" trname="trkey" trkey="'+ rbpInfo['species_id'] +'">';
							}
							tempStr += '<td>'+rbpInfo['factor']+'</td>';
							tempStr += '<td>'+rbpInfo['species']+'</td>';
							tempStr += '<td>'+rbpInfo['species_id']+'</td>';
							tempStr += '<td>'+rbpInfo['annotation_id']+'</td>';
							tempStr += '<td>'+rbpInfo['synonyms']+'</td>';
							tempStr += '<td>'+rbpInfo['binding_domain']+'</td>';
							if (isdetails > 0)
							tempStr += '<td id='+rbpInfo['id']+' tdkey="td">'+'<img src="public/images/show.png" width="30px"  height="30px"; /></td>';
							//alert();   mf
							tempStr += '</tr>';
							$('#success-table-rbpinfo tbody').append(tempStr);

						}
						$('#success-content-rbpinfo').show('fast');
						$('#show-tips').hide('fast');
					}else{
						//modi by ytao
						//$('#errorMsg').html(response.message);
						//$('#show-tips').show('fast');
						//$('#success-content-rbpinfo').hide('fast');
					}
				},
				error:function(){
					//$('#show-tips2').show('fast').delay('3000').hide('slow');
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips').show('fast');
					$('#success-content-rbpinfo').hide('fast');
				},
				beforeSend:function(){
					if($.browser.msie){
						$('.ui-loading').show('fast');		
					}
				},
				complete:function(){
					$('.ui-loading').hide('fast');	
				}
			});

			$.ajax({
				url:'search_ajax.php',
				dataType:'json',
				type:'POST',
				data:'key=' + key,
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					if(response.code){
						$('#success-table tbody').html(' ');
						var datalen = response.data.length;
						for(var i=0; i<datalen; i++){
 			                           var rbpInfo = response.data[i];
							if(i % 2 == 0){
								var tempStr = '<tr class="dataodd" trname="trkey" trkey="'+ rbpInfo['id'] +'">';	
							}else{
								var tempStr = '<tr class="dataeven" trname="trkey" trkey="'+ rbpInfo['id'] +'">';
							}
							tempStr += '<td>'+rbpInfo['species']+'</td>';
							tempStr += '<td>'+rbpInfo['cell_line']+'</td>';
							tempStr += '<td id='+rbpInfo['id']+' tdkey="td">'+rbpInfo['cn']+'</td>';
							tempStr += '</tr>';
							$('#success-table tbody').append(tempStr);
						}
						$('#success-content').show('fast');
						$('#show-tips').hide('fast');
					}else{
						$('#errorMsg').html(response.message);
						$('#show-tips').show('fast');
						$('#success-content').hide('fast');
					}
				},
				error:function(){
					//$('#show-tips2').show('fast').delay('3000').hide('slow');
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips').show('fast');
					$('#success-content').hide('fast');
				},
				beforeSend:function(){
					if($.browser.msie){
						$('.ui-loading').show('fast');		
					}
				},
				complete:function(){
					$('.ui-loading').hide('fast');	
				}
			});
		}
	});
	$('#success-table-rbpinfo tbody tr[trname="trkey"]').live('click', function(event){
		event.stopPropagation();
		$('#show-tips').hide('fast'); //错误提示
		var key = 0;
		key = $(this).attr('trkey');
		var thisObj = $(this);
		var trkeyHtml = $('#rbpinfotr'+key).html(); 
		if(typeof trkeyHtml == 'undefined' || trkeyHtml == false || !trkeyHtml || trkeyHtml == ''){
			$.ajax({
				url:'detail_ajax_rbpinfo.php',
				dateType:'json',
				type:'POST',
				data:'key='+key,	
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					var dataLen = response['data'].length;
					//var htmlStr = '<tr class="success-detail" id="rbpinfotr'+key+'" trname="detail">';
					//htmlStr += '<td colspan="7">';
				
					var tempStr = ''; 
					for(var i=0; i<dataLen; i++){
                        var rbpInfo = response.data[i];
			//for (key in rbpInfo){
			//	alert (key);
			//}
						//var tempStr = '';
			// mf
						var isEmpty = 0;
						tempStr += '<div class="data-detail">';
						//modi by ytao
						//tempStr += '<div class="data-left">';
						tempStr += '<ul>';
						//modi by ytao
						if(rbpInfo['motif'])
							{ tempStr += '<li><label>RNA recognition motif:</label>'+rbpInfo['motif']+'</li>'; isEmpty++;}
						if(rbpInfo['assay'])
							{ tempStr += '<li><label>Assay:</label>'+rbpInfo['assay']+'</li>'; isEmpty++;}
						if(rbpInfo['rbd'])
							{ tempStr += '<li><label>Motif evidence:</label>'+rbpInfo['rbd']+'</li>'; isEmpty++;}
						//modi by ytao
						//tempStr += '</ul>';
						//tempStr += '</div>';
						//tempStr += '<div class="data-right">';
						//tempStr += '<ul>';
						//modi by ytao
						if(rbpInfo['pwm'])
							{ tempStr += '<li><label>PWM:</label><a target="_blank" href="'+rbpInfo['pwm']+'">Click</a></li>'; isEmpty++;}
						//	tempStr += '<li><label>Matrix:</label><a target="_blank" href="'+rbpInfo['pwm']+'"></a></li>';
						//modi by ytao
						if(rbpInfo['logo'])
							//tempStr += '<li><label>LOGO:</label><a target="_blank" href="../../public/images/logo/'+rbpInfo['logo']+'">link out</a></li>';
						
							{
								var tempL='/database/rbpome/public/images/logo/'+rbpInfo['logo'];
							//	tempStr += '<li><label>LOGO:</label><a target="_blank" href="'+tempL+'" target=_blank >Click</a></li>';
								isEmpty++;
							}
//								tempStr += '<li><label>LOGO:</label><a target="_blank" href="onClick="window.open(tempL,'newwindow','height=200,width=200,scrollbars=yes')"">link out</a></li>';
						//	tempStr += '<li><label>LOGO:</label><a target="_blank" href="../../public/images/logo/'+rbpInfo['logo']+'"></a></li>';
						//
						//modi by ytao
						if(rbpInfo['link'])
							{ tempStr += '<li><label>More info:</label><a target="_blank" href="'+rbpInfo['link']+'">Link out</a></li>'; isEmpty++;}
						//}else{
						//	tempStr += '<li><label>Info:</label><a target="_blank" href="'+rbpInfo['link']+'"></a></li>';
						//}
						//modi by ytao
                        			if (rbpInfo['reference']) 
                            				{ tempStr += '<li><label>Reference:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+rbpInfo['reference']+'">PMID:'+rbpInfo['reference']+'</a></li>'; isEmpty++;}
                        			//} else {
                        			//    tempStr += '<li><label>Reference:</label><a target="_blank" href="#">NA</a></li>';
                        			//}
						//if (isEmpty == 0)
						//	tempStr += '<li><label>Sorry:</label>this entry is empty!</li>';
						tempStr += '</ul>';
						//modi by ytao
						//tempStr += '</div>';
						tempStr += '<div class="clear"></div>';
						tempStr += '</div>';
					}
					//alert(tempStr);
						if (isEmpty != 0 && tempStr){
						var htmlStr = '<tr class="success-detail" id="rbpinfotr'+key+'" trname="detail">';
						htmlStr += '<td colspan="7">';
						htmlStr += tempStr;
						htmlStr += '</td>';
						htmlStr += '</tr>';
					thisObj.after(htmlStr);
						}


						if(tempStr){
                                        $('#rbpinfotr'+key).show('fast');
					//$('#success-content').show('fast');
					$('#show-tips').hide('fast');
					}
					//alert(htmlStr);

				//	var text=document.getElementById("1").innerHTML;
				//	alert(text);
	
				},
				error:function(){
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips').show('fast');
					$('#success-content').hide('fast');				
				},
				beforeSend:function(){
					
				},
				complete:function(){
					
				}
			});			
		}
		//modi by ytao
		else if($('#rbpinfotr'+key).css('display') != 'none' || $('#rbpinfotr'+key).css('display') != 'undefined'){
	$('#rbpinfotr'+key).slideToggle('fast');
			}
		// end ytao
	});


	$('#success-table tbody tr[trname="trkey"]').live('click', function(event){
		event.stopPropagation();
		$('#show-tips').hide('fast'); //错误提示
		var key = 0;
		key = $(this).attr('trkey');
		//alert (key);   //mf
		var thisObj = $(this);
		// alert (thisObj);  //mf
		var trkeyHtml = $('#factorstr'+key).html(); 
		// alert ();         //mf
		if(typeof trkeyHtml == 'undefined' || trkeyHtml == false || !trkeyHtml || trkeyHtml == ''){
			$.ajax({
				url:'detail_ajax.php',
				dateType:'json',
				type:'POST',
				data:'key='+key,
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					var dataLen = response['data'].length;
					

					var htmlStr = '<tr class="success-detail" id="factorstr'+key+'" trname="detail">';
					htmlStr += '<td colspan="5">';
					var temp1 = '';
					var temp2 = new Array();
					var tempStr = '';
				//	alert(dataLen);	
					for(var i=0; i<dataLen; i++){
						var myData = new Array();
						var myData1 = '';
						var myData2 = '';
						var myData3 = '';
						myData = response['data'][i]['data_accession'].split(/\;/);
						myData1 = myData[0];
						myData2 = myData[1];
				//		if (myData2[1]){alert (myData2[i]);}
                        var rbpInfo = response.data[i];
	//modi by ytao to del Factor P4 part NA
                        //for (var n in rbpInfo) {
                            //if (rbpInfo[n] === null) rbpInfo[n] = "NA";
                        //}
						if(i == 0){
							//tempStr += XXX;

							tempStr += '<div class="data-detail">';
							/*
							if(rbpInfo['pubmed_id'])
							{
								tempStr += '<div class="data-title">Reference:</div>';
                            					var pubmed_id = (rbpInfo['pubmed_id'] === "NA") ? "NA" : rbpInfo['pubmed_id'];
								tempStr += '<div class="data-title-explain"><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+pubmed_id+'">'+rbpInfo['reference']+'</a></div>';
							}
							*/
							tempStr += '<div class="data-left">';
							tempStr += '<ul>';
							if(rbpInfo['factor'] )
								tempStr += '<li><label>Factor:</label>'+rbpInfo['factor']+'</li>';
							if(rbpInfo['species'] )
								tempStr += '<li><label>Species:</label>'+rbpInfo['species']+'</li>';
							if(rbpInfo['tissue_type'] )
								tempStr += '<li><label>Tissuee Type:</label>'+rbpInfo['tissue_type']+'</li>';
							if(rbpInfo['material'] )
								tempStr += '<li><label>Material:</label>'+rbpInfo['material']+'</li>';
							if(rbpInfo['cell_type'] )
								tempStr += '<li><label>Cell Type:</label>'+rbpInfo['cell_type']+'</li>';
							if(rbpInfo['cell_line'] )
								tempStr += '<li><label>Cell Line:</label>'+rbpInfo['cell_line']+'</li>';
							if(rbpInfo['cell_population'] )
								tempStr += '<li><label>Population:</label>'+rbpInfo['cell_population']+'</li>';
							if(rbpInfo['disease_state'] )
								tempStr += '<li><label>Disease:</label>'+rbpInfo['disease_state']+'</li>';
							if(rbpInfo['treatment'] )
								tempStr += '<li><label>Treatment:</label>'+rbpInfo['treatment']+'</li>';
							if(rbpInfo['assay_method'] )
								tempStr += '<li><label>Technology:</label>'+rbpInfo['assay_method']+'</li>';
							if(rbpInfo['pubmed_id'])
							{
							//	tempStr += '<div class="data-title">Reference:</div>';
                            					var pubmed_id = (rbpInfo['pubmed_id'] === "NA") ? "NA" : rbpInfo['pubmed_id'];
								tempStr += '<li><label>Reference:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+pubmed_id+'">'+'PubMed link</a></li>';
							}
							tempStr += '</ul>';
							tempStr += '</div>';
							tempStr += '<div class="data-right">';
							tempStr += '<ul>';
							if(rbpInfo['developmental_stage'] )
								tempStr += '<li><label>Development:</label>'+rbpInfo['developmental_stage']+'</li>';
							if(rbpInfo['strain'] )
								tempStr += '<li><label>Strain:</label>'+rbpInfo['strain']+'</li>';
							//	tempStr += '<li><label>Dataseries:</label>NA</li>';
							// end ytao

							temp1 = myData1;
							temp2[0] = myData2;
							if(i == dataLen - 1){  // dataLen == 1
								//alert('1: ' + temp1 + ' ' + temp2); // 只有一条数据，直接输出
                                                        if(temp1=="NA"){        
									tempStr += '<li>Raw CLIP-seq data not used because of their unavailability or low quality</li>';           
							}						
								if(temp1 !="NA" ){
								    	if(temp1 == "http://sanfordlab.mcdb.ucsc.edu/Sanford_Lab/Datasets.html"){
						//		tempStr += '<li><label>Dataseries:</label><a target="_blank" href="'+temp1+'">'+temp1+'</a></li>';
						}else{
                                                                        var srx = new RegExp("SRX");
                                                                        var result_srx = srx.test(temp1);
                                                                        var err = new RegExp("MTAB");
                                                                        var result_err = err.test(temp1);
                                                                        if (result_err){
						//				tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/arrayexpress/experiments/'+temp1+'">'+temp1+'</a></li>';
									} else if(result_srx){
						//			tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp1+'">'+temp1+'</a></li>';
									} else {
								
						//		tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp1+'">'+temp1+'</a></li>';
									}	
							}
						}

						if (temp1!="NA"){	
								temp3 = temp2[0].split(/\,/);//for Datasets
                                                                     
							//&
								   temp4 = temp2[0].replace(/,/g,"-");//for GenomeLocation

                                                                if (temp1==temp2[0]){
							tempStr += '<li><label>Set 1:</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">Download</a></li>';
                                                                } else {
							tempStr += '<li><label>Set 1:</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.bed">Download</a></li>';
                                                                      
								 }
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./statistics.php?dataset='+rbpInfo['factor']+'_'+temp1+'-'+temp4+'">Statistics</a></li>';
							//&

                                                               // tempStr += '<li><label>display:</label>';

							//	tempStr += '<a href="###" onclick="return onClickDiv(\'dy3\')")>'+temp2+'</a></li>';
							//	tempStr += '<Div Id="dy3" Style=display:none';
                                                                for (var k = 0; k < temp3.length; k++){
                                                                        var err = new RegExp("R");
                                                                        var result_err = err.test(temp3[k]);
                                                                        if (result_err){
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
                                                                        }else{
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
									}
								}
                                                               // tempStr += '<li><label>1Binding site:</label><a target="_blank" href="../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp2+'/">'+temp2+'</a></li>';
/*
                                                                tempStr += '<li><label>1Binding site:</label>';
                                                                tempStr += '<select id=\"'+temp1+'\" name="cutoff"';
                                                                tempStr += '<option value="cutoff">cutoff</option>';
                                                                tempStr += '<option value="0.01">0.01</option>';
                                                                tempStr += '<option value="0.001">0.001</option>';
                                                                tempStr += '</select>';
                                                                tempStr += '<li>';
                                                                        temp5 = temp2[0].replace(/,/g,"-");//for Bindingsite
								if (temp1==temp2[0]){
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'\'\,\''+temp1+'\')\">'+temp2+'</a> ';
								} else {
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'-'+temp5+'\'\,\''+temp1+'\')\">'+temp2+'</a> ';
									}
*/
// var hai  = statistics();
// 	
/*
                                                                        temp4 = temp2[0].replace(/,/g,"-");//for GenomeLocation
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./statistics.php?dataset='+rbpInfo['factor']+'_'+temp1+'-'+temp4+'">Statistics</a></li>';

                                                                if (temp1==temp2[0]){
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">Download</a></li>';
                                                                } else {
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.bed">Download</a></li>';
                                                                      
								 }
*/
								}
                                                                tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="clear"></div>';
								tempStr += '</div>';
								htmlStr += tempStr;
							}
						}else if(i > 0 && i < dataLen - 1){
							if(temp1 == myData1){
								temp2.push(myData2);
							}else{
								//alert('2: ' + temp1 + ' ' + temp2); // 中间遇到不同数据集，果断输出
                                                                if(temp1 ){
                                                                        if(temp1 == "http://sanfordlab.mcdb.ucsc.edu/Sanford_Lab/Datasets.html"){
                                                               //         tempStr += '<li><label>Dataseries:</label><a target="_blank" href="'+temp1+'">'+temp1+'</a></li>';
                                                }else{
                                                                        var srx = new RegExp("SRX");
                                                                        var result_srx = srx.test(temp1);
                                                                        var err = new RegExp("MTAB");
                                                                        var result_err = err.test(temp1);
                                                                        if (result_err){
                                                              //                  tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/arrayexpress/experiments/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else if(result_srx){
                                                              //                  tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else {

                                                                //        tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp1+'">'+temp1+'</a></li>';
                                                                        }
                                                        }
                                                }
								tempStr += '</li>';
						//		tempStr += '<li><label>2Binding site:</label>';
/*
tempStr += '<select id=\"'+temp1+'\" name="cutoff" > ';
tempStr += '<option value="cutoff">cutoff</option>';
tempStr += '<option value="0.01">0.01</option>';
tempStr += '</select>';
tempStr += '<li>';
                                                                for (var j = 0; j < temp2.length; j++){
                                                                //tempStr += '<a target="_blank" href="../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp2[j]+'">'+temp2[j]+'</a> ';
                                                                        temp5 = temp2[j].replace(/,/g,"-");//for Bindingsite
                                                                        if (temp1==temp2[j]){
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'\'\,\''+temp1+'\')\">'+temp2[j]+'</a> ';
									} else {
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'-'+temp5+'\'\,\''+temp1+'\')\">'+temp2[j]+'</a> ';
                                                                	}
								}
                                                                tempStr += '<li><label>Genome location:</label>';

                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp4 = temp2[j].replace(/,/g,"-");//for GenomeLocation

                                                                tempStr += '<a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">'+temp2[j]+'</a> ';
                                                                }
								tempStr += '<li><label>Download:</label>';
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp6 = temp2[j].replace(/,/g,"-");//for download
                                                                if (temp1==temp2[j]){
							tempStr += '<a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">'+temp2[j]+'</a> ';
                                                                } else {
							tempStr += '<a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp6+'.bed">'+temp2[j]+'</a> ';
                                                                      
								 }
								}
*/
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp4 = temp2[j].replace(/,/g,"-");//for GenomeLocation
                                                                        if(temp2[j] )
                                                                        				        temp3=temp2[j].split(/\,/);

                                                                        temp6 = temp2[j].replace(/,/g,"-");//for download
                                                                if (temp1==temp2[j]){
                                                        tempStr += '<li><label>Set '+(j+1)+':</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">Download</a></li>';
                                                                } else {
                                                        tempStr += '<li><label>Set '+(j+1)+':</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp6+'.bed">Download</a></li>';

                                                                 }
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./statistics.php?dataset='+rbpInfo['factor']+'_'+temp1+'-'+temp4+'">Statistics</a></li>';
                                                                for (var k = 0; k < temp3.length; k++){
                                                                        var err = new RegExp("R");
                                                                        var result_err = err.test(temp3[k]);
                                                                        if (result_err){
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
                                                                        } else {
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
                                                                	}
								}
                                                        //        tempStr += '<li><label>&nbsp</label><a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">Statistics</a></li>';
                                                                }

								tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="clear"></div>';
								tempStr += '</div>';
								htmlStr += tempStr;
								tempStr = '';

								//tempStr += XXX;

								tempStr += '<div class="data-detail">';
								/*
								if(rbpInfo['reference'] )
								{
									tempStr += '<div class="data-title">Reference:</div>';
                            						var pubmed_id = (rbpInfo['pubmed_id'] === "NA") ? "NA" : rbpInfo['pubmed_id'];
									tempStr += '<div class="data-title-explain"><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+pubmed_id+'">'+rbpInfo['reference']+'</a></div>';
								}
								*/
								tempStr += '<div class="data-left">';
								tempStr += '<ul>';
								if(rbpInfo['factor'] )
									tempStr += '<li><label>Factor:</label>'+rbpInfo['factor']+'</li>';
								if(rbpInfo['species'] )
									tempStr += '<li><label>Species:</label>'+rbpInfo['species']+'</li>';
								if(rbpInfo['tissue_type'] )
									tempStr += '<li><label>Tissue Type:</label>'+rbpInfo['tissue_type']+'</li>';
								if(rbpInfo['material'] )
									tempStr += '<li><label>Material:</label>'+rbpInfo['material']+'</li>';
								if(rbpInfo['cell_type'] )
									tempStr += '<li><label>Cell Type:</label>'+rbpInfo['cell_type']+'</li>';
								if(rbpInfo['cell_line'] )
									tempStr += '<li><label>Cell Line:</label>'+rbpInfo['cell_line']+'</li>';
								if(rbpInfo['cell_population'] )
									tempStr += '<li><label>Population:</label>'+rbpInfo['cell_population']+'</li>';
								if(rbpInfo['disease_state'] )
									tempStr += '<li><label>Disease:</label>'+rbpInfo['disease_state']+'</li>';
								if(rbpInfo['treatment'] )
									tempStr += '<li><label>Treatment:</label>'+rbpInfo['treatment']+'</li>';
								if(rbpInfo['assay_method'] )
									tempStr += '<li><label>Technology:</label>'+rbpInfo['assay_method']+'</li>';
							if(rbpInfo['pubmed_id'])
							{
							//	tempStr += '<div class="data-title">Reference:</div>';
                            					var pubmed_id = (rbpInfo['pubmed_id'] === "NA") ? "NA" : rbpInfo['pubmed_id'];
								tempStr += '<li><label>Reference:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+pubmed_id+'">'+'PubMed link</a></li>';
							}
								tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="data-right">';
								tempStr += '<ul>';
								if(rbpInfo['developmental_stage'] )
									tempStr += '<li><label>Development:</label>'+rbpInfo['developmental_stage']+'</li>';
								if(rbpInfo['strain'] )
									tempStr += '<li><label>Strain:</label>'+rbpInfo['strain']+'</li>';

								temp1 = myData1;
								temp2 = [];
								temp2[0] = myData2;
							}
						}else{  // i == dataLen - 1
							if(temp1 == myData1){
								temp2.push(myData2);
							//alert('3: ' + temp1 + ' ' + temp2); // 所有数据属于一个数据集
                                                                if(temp1 ){
                                                                        if(temp1 == "http://sanfordlab.mcdb.ucsc.edu/Sanford_Lab/Datasets.html"){
                                                               //         tempStr += '<li><label>Dataseries:</label><a target="_blank" href="'+temp1+'">'+temp1+'</a></li>';
                                                }else{
                                                                        var srx = new RegExp("SRX");
                                                                        var result_srx = srx.test(temp1);
                                                                        var err = new RegExp("MTAB");
                                                                        var result_err = err.test(temp1);
                                                                        if (result_err){
                                                              //                  tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/arrayexpress/experiments/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else if(result_srx){
                                                              //                 tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else {

                                                              //          tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp1+'">'+temp1+'</a></li>';
                                                                        }
                                                        }
                                                }

						//	if (temp2.length > 0){	//mf
								tempStr += '</li>';
/*
                                                        	tempStr += '<li><label>3Binding site:</label>';
								tempStr += '<select id=\"'+temp1+'\" name="cutoff" > ';
                                                       		tempStr += '<option value="cutoff">cutoff</option>';
                                                        	tempStr += '<option value="0.01">0.01</option>';
                                                        	tempStr += '<option value="0.001">0.001</option>';
                                                        	tempStr += '</select>';
                                                        	tempStr += '<li>';
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        if(temp2[j] )
                                                                        temp5 = temp2[j].replace(/,/g,"-");//for Bindingsite
                                                                        if (temp1==temp2[j]){
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'\'\,\''+temp1+'\')\">'+temp2[j]+'</a> ';
									} else {
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'-'+temp5+'\'\,\''+temp1+'\')\">'+temp2[j]+'</a> ';
                                                                	}
                                                                }
                                                                tempStr += '<li><label>Genome location:</label>';
                                                                for (var j = 0; j < temp2.length; j++){
									temp4 = temp2[j].replace(/,/g,"-");
                                                             tempStr += '<a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">'+temp2[j]+'</a> ';
                                                                }
								}
								tempStr += '<li><label>Download:</label>';
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp6 = temp2[j].replace(/,/g,"-");//for download
                                                                if (temp1==temp2[j]){
							tempStr += '<a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">'+temp2[j]+'</a> ';
                                                                } else {
							tempStr += '<a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp6+'.bed">'+temp2[j]+'</a> ';
                                                                      
								 }
								}
*/
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp4 = temp2[j].replace(/,/g,"-");//for GenomeLocation
                                                                        if(temp2[j] )
                                                                                temp3=temp2[j].split(/\,/);

                                                                        temp6 = temp2[j].replace(/,/g,"-");//for download
                                                                if (temp1==temp2[j]){
                                                        tempStr += '<li><label>Set '+(j+1)+':</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">Download</a></li>';
                                                                } else {
                                                        tempStr += '<li><label>Set '+(j+1)+':</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp6+'.bed">Download</a></li>';

                                                                 }
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./statistics.php?dataset='+rbpInfo['factor']+'_'+temp1+'-'+temp4+'">Statistics</a></li>';
                                                                for (var k = 0; k < temp3.length; k++){
									var err = new RegExp("R");
									var result_err = err.test(temp3[k]);
                                                                        if (result_err){
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
									} else {
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
                                                                	}
									}
									
                                                        //        tempStr += '<li><label>&nbsp</label><a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">Statistics</a></li>';
                                                                }

								tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="clear"></div>';
								tempStr += '</div>';
								htmlStr += tempStr;
						//	}
							}else{
					//			alert('4: ' + temp1 + ' ' + temp2); // 到最后一个时遇到不同数据集，果断输出
                                                                if(temp1 ){
                                                                        if(temp1 == "http://sanfordlab.mcdb.ucsc.edu/Sanford_Lab/Datasets.html"){
                                                                //        tempStr += '<li><label>Dataseries:</label><a target="_blank" href="'+temp1+'">'+temp1+'</a></li>';
                                                }else{
                                                                        var srx = new RegExp("SRX");
                                                                        var result_srx = srx.test(temp1);
                                                                        var err = new RegExp("MTAB");
                                                                        var result_err = err.test(temp1);
                                                                        if (result_err){
                                                                //                tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/arrayexpress/experiments/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else if(result_srx){
                                                                //                tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else {

                                                                //        tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp1+'">'+temp1+'</a></li>';
                                                                        }
                                                        }
                                                }

								tempStr += '</li>';
/*
                                                                tempStr += '<li><label>4Binding site:</label>';
								tempStr += '<select id=\"'+temp1+'\" name="cutoff" > ';
                                                       		tempStr += '<option value="cutoff">cutoff</option>';
                                                        	tempStr += '<option value="0.01">0.01</option>';
                                                        	tempStr += '<option value="0.001">0.001</option>';
                                                        	tempStr += '</select>';
                                                        	tempStr += '<li>';
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        if(temp2[j] )
                                                                //tempStr += '<a target="_blank" href="../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp2[j]+'/">'+temp2[j]+'</a> ';
                                                                        temp5 = temp2[j].replace(/,/g,"-");//for Bindingsite
                                                                        if (temp1==temp2[j]){
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'\'\,\''+temp1+'\')\">'+temp2[j]+'</a> ';
									} else {
                                                                tempStr += '<a target="_blank" href="javascript:changeurl(\'../../gb2/gbrowse/'+rbpInfo['factor']+'_'+temp1+'-'+temp5+'\'\,\''+temp1+'\')\">'+temp2[j]+'</a> ';
                                                                	}
                                                                }
                                                                tempStr += '<li><label>Genome location:</label>';
                                                                for (var j = 0; j < temp2.length; j++){
									temp4 = temp2[j].replace(/,/g,"-");
                                                                tempStr += '<a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">'+temp2[j]+'</a> ';
                                                                }
								tempStr += '<li><label>Download:</label>';
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp6 = temp2[j].replace(/,/g,"-");//for download
                                                                if (temp1==temp2[j]){
							tempStr += '<a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">'+temp2[j]+'</a> ';
                                                                } else {
							tempStr += '<a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp6+'.bed">'+temp2[j]+'</a> ';
                                                                      
								 }
								}
*/
                                                                for (var j = 0; j < temp2.length; j++){
                                                                        temp4 = temp2[j].replace(/,/g,"-");//for GenomeLocation
                                                                        if(temp2[j] )
                                                                                temp3=temp2[j].split(/\,/);

                                                                        temp6 = temp2[j].replace(/,/g,"-");//for download
                                                                if (temp1==temp2[j]){
                                                        tempStr += '<li><label>Set '+(j+1)+':</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">Download</a></li>';
                                                                } else {
                                                        tempStr += '<li><label>Set '+(j+1)+':</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp6+'.bed">Download</a></li>';

                                                                 }
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./statistics.php?dataset='+rbpInfo['factor']+'_'+temp1+'-'+temp4+'">Statistics</a></li>';
                                                                for (var k = 0; k < temp3.length; k++){
                                                                        var err = new RegExp("R");
                                                                        var result_err = err.test(temp3[k]);
                                                                        if (result_err){
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
                                                                        } else{ 
                                                                        if (k==0){
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }else{
                                                                                tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp3[k]+'">'+temp3[k]+'</a><li> ';
                                                                        }
                                                                	}
								}
                                                        //        tempStr += '<li><label>&nbsp</label><a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">Statistics</a></li>';
                                                                }

								tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="clear"></div>';
								tempStr += '</div>';
								htmlStr += tempStr;
								tempStr = '';

								//tempStr += XXX;

								tempStr += '<div class="data-detail">';
								/*
								if(rbpInfo['reference'] )
								{
									tempStr += '<div class="data-title">Reference:</div>';
                            						var pubmed_id = (rbpInfo['pubmed_id'] === "NA") ? "NA" : rbpInfo['pubmed_id'];
									tempStr += '<div class="data-title-explain"><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+pubmed_id+'">'+rbpInfo['reference']+'</a></div>';
								}
								*/
								tempStr += '<div class="data-left">';
								tempStr += '<ul>';
								if(rbpInfo['factor'] )
									tempStr += '<li><label>Factor:</label>'+rbpInfo['factor']+'</li>';
								if(rbpInfo['species'] )
									tempStr += '<li><label>Species:</label>'+rbpInfo['species']+'</li>';
								if(rbpInfo['tissue_type'] )
									tempStr += '<li><label>Tissue Type:</label>'+rbpInfo['tissue_type']+'</li>';
								if(rbpInfo['material'] )
									tempStr += '<li><label>Material:</label>'+rbpInfo['material']+'</li>';
								if(rbpInfo['cell_type'] )
									tempStr += '<li><label>Cell Type:</label>'+rbpInfo['cell_type']+'</li>';
								if(rbpInfo['cell_line'] )
									tempStr += '<li><label>Cell Line:</label>'+rbpInfo['cell_line']+'</li>';
								if(rbpInfo['cell_population'] )
									tempStr += '<li><label>Population:</label>'+rbpInfo['cell_population']+'</li>';
								if(rbpInfo['disease_state'] )
									tempStr += '<li><label>Disease:</label>'+rbpInfo['disease_state']+'</li>';
								if(rbpInfo['treatment'] )
									tempStr += '<li><label>Treatment:</label>'+rbpInfo['treatment']+'</li>';
								if(rbpInfo['assay_method'] )
									tempStr += '<li><label>Technology:</label>'+rbpInfo['assay_method']+'</li>';
							if(rbpInfo['pubmed_id'])
							{
							//	tempStr += '<div class="data-title">Reference:</div>';
                            					var pubmed_id = (rbpInfo['pubmed_id'] === "NA") ? "NA" : rbpInfo['pubmed_id'];
								tempStr += '<li><label>Reference:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/pubmed/'+pubmed_id+'">'+'PubMed link</a></li>';
							}
								tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="data-right">';
								tempStr += '<ul>';
								if(rbpInfo['developmental_stage'] )
									tempStr += '<li><label>Development:</label>'+rbpInfo['developmental_stage']+'</li>';
								if(rbpInfo['strain'] )
									tempStr += '<li><label>Strain:</label>'+rbpInfo['strain']+'</li>';
							//	tempStr += '<li><label>Dataseries:</label>NA</li>';

								temp1 = myData1;
								temp2 = [];
								temp2[0] = myData2;
								//alert('5: ' + temp1 + ' ' + temp2); // 输出最后一哥不同的数据
                                                        if(temp1=="NA"){        
									tempStr += '<li>Raw CLIP-seq data not used because of their unavailability or low quality</li>';           
							}						
							if(temp1 !="NA"){
                                                                        if(temp1 == "http://sanfordlab.mcdb.ucsc.edu/Sanford_Lab/Datasets.html"){
                                                             //           tempStr += '<li><label>Dataseries:</label><a target="_blank" href="'+temp1+'">'+temp1+'</a></li>';
                                                }else{
                                                                        var srx = new RegExp("SRX");
                                                                        var result_srx = srx.test(temp1);
                                                                        var err = new RegExp("MTAB");
                                                                        var result_err = err.test(temp1);
                                                                        if (result_err){
                                                             //                  tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/arrayexpress/experiments/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else if(result_srx){
                                                             //                   tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp1+'">'+temp1+'</a></li>';
                                                                        } else {

                                                              //          tempStr += '<li><label>Dataseries:</label><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp1+'">'+temp1+'</a></li>';
                                                                        }
                                                        }
                                                }
								if (temp1 !="NA"){
                                                                        temp4 = temp2[0].replace(/,/g,"-");//for GenomeLocation
							//tempStr += '<li><label>&nbsp</label><a target="_blank" href="GenomeLocation/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.pdf">Statistics</a></li>';
                                                                if (temp1==temp2[0]){
							tempStr += '<li><label>Set 1</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'.bed">Download</a></li>';
                                                                } else {
							tempStr += '<li><label>Set 1</label><a target="_blank" href="./download_bed/'+rbpInfo['factor']+'_'+temp1+'-'+temp4+'.bed">Download</a></li>';
                                                                      
								 }
							tempStr += '<li><label>&nbsp</label><a target="_blank" href="./statistics.php?dataset='+rbpInfo['factor']+'_'+temp1+'-'+temp4+'">Statistics</a></li>';

								if(temp2 ){
                                                                        var err = new RegExp("R");
                                                                        var result_err = err.test(temp2);
                                                                        if (result_err){	
										 tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ebi.ac.uk/ena/data/view/'+temp2+'">'+temp2+'</a></li>';
									} else {		
									tempStr += '<li><label>&nbsp</label><font color="#08C">Raw Data </font><a target="_blank" href="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+temp2+'">'+temp2+'</a></li>';
									}
								}
								}
								tempStr += '</ul>';
								tempStr += '</div>';
								tempStr += '<div class="clear"></div>';
								tempStr += '</div>';
								htmlStr += tempStr;
							}
						}
					}
					htmlStr += '</td>';
					htmlStr += '</tr>';
					thisObj.after(htmlStr);
					$('#factorstr'+key).show('fast');
					//$('#success-content').show('fast');
					$('#show-tips').hide('fast');
				},
				error:function(){
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips').show('fast');
					$('#success-content').hide('fast');				
				},
				beforeSend:function(){
					
				},
				complete:function(){
					
				}
			});			
		}else if($('#factorstr'+key).css('display') != 'none' || $('#factorstr'+key).css('display') != 'undefined'){
			$('#factorstr'+key).slideToggle('fast');
		}
	});
	
	$('#success-table-rbpinfo tbody tr[trname="detail"]').live('dblclick', function(event){
		event.stopPropagation();
		$(this).hide('fast');
	});

	$('#success-table tbody tr[trname="detail"]').live('dblclick', function(event){
		event.stopPropagation();
		$(this).hide('fast');
	});


	// Gene View  **********************************
        $('#genesHiddenkey').val('Human');
        $('#select-trigger-genes').click(function(){
               $('#select-content-genes').slideToggle('fast');
                $('#genesHiddenkey').val('Human');
        });

        $('.ui-select-item-genes').each(function(index){
                var thisObj = $(this);
                thisObj.click(function(event){
                        var inputspecies = thisObj.attr('id');
			if (inputspecies == "-1"){ var key= "Human"};
			if (inputspecies == "0"){ var key= "Human"};
			if (inputspecies == "1"){ var key= "Mouse"};
			if (inputspecies == "2"){ var key= "Worm"};
			if (inputspecies == "3"){ var key= "Yeast"};

//alert(key);	
			$("#genesHint").html("");
			//$("#inputgenesmanul").val("");
                       if(typeof key != 'undefined' && key != ''){
                                $('#content-genes').html($('#g'+inputspecies).html());
                                $('#genesHiddenkey').val(key);
                                $('#select-content-genes').slideToggle('fast');
                                event.stopPropagation();
                        }
                });
        });

$("#select-content-genes").keydown(function(e){
    if(e.keyCode == 13)
                {
searchgene();
                }
  });

if (document.addEventListener) {
    //?~B?~^~\?~X?Firefox  
            document.addEventListener("keypress", enterEvent, true);
                    } else {
                                //?~B?~^~\?~X?IE
                                                document.attachEvent("onkeypress", enterEvent);
                                                                }
                                                                                function enterEvent(evt) {
                                                                                                    if (evt.keyCode == 13) {
                                                                                                                                //do something
                                                                                                                                        searchgene();   
                                                                                                                                        //alert("enter");
                                                                                                                                                                        }
                                                                                                                                                                                                        }

	function searchgene(){
		
		var inputvalue=$("#inputgenesmanul").val();
	//	alert(inputvalue);
	var key = $('#genesHiddenkey').val();	
		$("#genesHint").html("");
	        $("#inputgenesmanul").val("");
		$('#show-tips-genes').hide('fast'); //错误提示
		$('#success-content-genes').hide('fast'); //成功后显示的数据
		$('#select-content-genes').hide('fast'); //成功后显示的数据
		$('#content-genes').html(key);
			
		//获取物种当前值
		var key = $('#genesHiddenkey').val();
		if(typeof key == 'undefined' || key == '' || !key ){
			//$('#errorMsg').html('Empty, please select.');
			//$('#show-tips2').slideToggle('fast');
			$('#success-content-genes').hide('fast');
			$('#content-genes').html("Please Select Species");
		}else{
			$.ajax({
				url:'search_ajax_gene_summary.php',
				dataType:'json',
				type:'POST',
				data:'key=' + key+ "&inputvalue=" + inputvalue,
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					if(response.code){
					$('#success-table-rbpinfo thead').html(' ' );
					
					var rbpinfo = response.data[0];
			    		var ismore  = detail(rbpinfo['species_id']);
					var tempStr = '';
					tempStr += '<tr>';
					tempStr += '<th>Gene Name</th>';
					tempStr += '<th>Gene ID</th>';
					tempStr += '<th>Gene Status</th>';
					tempStr += '<th>Gene Type</th>';
					if (rbpinfo['Annotation'])
					tempStr += '<th>Annotation</th>';
					if (rbpinfo['Weblink'])
					tempStr += '<th>lncRNA db link</th>';
					if (ismore > 0) tempStr += '<th>More</th>';
					$('#success-table-rbpinfo thead').append(tempStr);

					//mf
					$('#success-table-rbpinfo tbody').html(' ');
				// 加载factor 信息   
			
				var datalen = response.data.length;

				for(var i=0; i<1; i++){
                            	
				var rbpInfo = response.data[i];
			    var isdetails  = detail(rbpInfo['species_id']);


					if(i % 2 == 0){
								var tempStr = '<tr class="dataeven" trname="trkey" trkey="'+ rbpInfo['species_id'] +'">';	
							}else{
								var tempStr = '<tr class="dataeven" trname="trkey" trkey="'+ rbpInfo['species_id'] +'">';
							}
							tempStr += '<td>'+rbpInfo['geneName']+'</td>';
							tempStr += '<td>'+rbpInfo['geneId']+'</td>';
							tempStr += '<td>'+rbpInfo['geneStatus']+'</td>';
							tempStr += '<td>'+rbpInfo['geneType']+'</td>';
							if (rbpInfo['Annotation'])	
							tempStr += '<td>'+rbpInfo['Annotation']+'</td>';
							if (rbpInfo['Weblink'])	
							tempStr += '<td><a target="_blank" href='+rbpInfo['Weblink']+'>link</a></td>';
							if (isdetails > 0)
							tempStr += '<td id='+rbpInfo['id']+' tdkey="td">'+'<img src="public/images/show.png" width="30px"  height="30px"; /></td>';
							//alert();   mf
							tempStr += '</tr>';
							$('#success-table-rbpinfo tbody').append(tempStr);

						}
						$('#success-content-rbpinfo').show('fast');
						$('#show-tips').hide('fast');
					}else{
						//modi by ytao
					//	$('#errorMsg').html(response.message);
					//	$('#show-tips').show('fast');
						$('#success-content-rbpinfo').hide('fast');
					}
				},
				error:function(){
					//$('#show-tips2').show('fast').delay('3000').hide('slow');
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips').show('fast');
					$('#success-content-rbpinfo').hide('fast');
				},
				beforeSend:function(){
					if($.browser.msie){
						$('.ui-loading').show('fast');		
					}
				},
				complete:function(){
					$('.ui-loading').hide('fast');	
				}
			});

			$.ajax({
				url:'search_ajax_gene.php',
				dataType:'json',
				type:'POST',
			data:'key=' + key + "&inputvalue=" + inputvalue,
	//			data:'key=' + key ,
	//			data:'inputvalue=' + inputvalue,
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					if(response.code){
						$('#success-table-genes tbody').html(' ');
						var datalen = response.data.length;
						for(var i=0; i<datalen; i++){
                            var rbpInfo = response.data[i];
			
			    	
                         //   for (var n in rbpInfo) {
                           //     if (rbpInfo[n] === null) rbpInfo[n] = "NA";
                          //  }
							//alert (rbpInfo['speciesTotal']);
							// mf
							if(i % 2 == 0){
								var tempStr = '<tr class="dataodd" trname="trkey" trkey="'+ rbpInfo['id'] +'">';	
							}else{
								var tempStr = '<tr class="dataeven" trname="trkey" trkey="'+ rbpInfo['id'] +'">';
							}
							//if(rbpInfo['factor'] )
								tempStr += '<td>'+rbpInfo['geneName']+'</td>';
								tempStr += '<td>'+rbpInfo['geneId']+'</td>';
							if(rbpInfo['subclass'] ){
								tempStr += '<td>'+rbpInfo['subclass']+'</td>';
}else{
								tempStr += '<td>NA</td>';
}
							//if(rbpInfo['speciesTotal'] )
								tempStr += '<td id='+rbpInfo['id']+' tdkey="td">'+rbpInfo['genesTotal']+'</td>';
							tempStr += '</tr>';
							$('#success-table-genes tbody').append(tempStr);
						}
						$('#success-content-genes').show('fast');
						$('#show-tips-genes').hide('fast');
					}else{
						$('.success-content-genes').hide('fast');
					}
				},
				error:function(){
					//$('#show-tips2').show('fast').delay('3000').hide('slow');
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips-genes').show('fast');
					$('.success-content-genes').hide('fast');
				},
				beforeSend:function(){
					if($.browser.msie){
						$('.ui-loading').show('fast');		
					}
				},
				complete:function(){
					$('.ui-loading').hide('fast');	
				}
			});
		}
	}
	$('#search-genes').click(function(){
	searchgene();
	});



	$('#success-table-genes tbody tr[trname="trkey"]').live('click', function(event){
		event.stopPropagation();
		$('#show-tips-genes').hide('fast'); //错误提示
		var key = 0;
		key = $(this).attr('trkey');
		var thisObj = $(this);
		var trkeyHtml = $('#genestr'+key).html();
		if(typeof trkeyHtml == 'undefined' || trkeyHtml == false || !trkeyHtml || trkeyHtml == ''){
			$.ajax({
				url:'detail_ajax_gene.php',
				dateType:'json',
				type:'POST',
				data:'key='+key,	
				success:function(response){
					if (typeof response !== 'object') response = JSON.parse(response);
					var dataLen = response['data'].length;
					var htmlStr = '<tr class="success-detail" id="genestr'+key+'" trname="detail">';
					htmlStr += '<td colspan="5">';
					var temp1 = '';
					var temp2 = new Array();
					var tempStr = '';
					for(var i=0; i<dataLen; i++){
						var myData = new Array();
						var myData1 = '';
						var myData2 = '';
						myData1 = myData[0];
						myData2 = myData[1];
                        var rbpInfo = response.data[i];
                //        for (var n in rbpInfo) {
                  //          if (rbpInfo[n] === null) rbpInfo[n] = "NA";
                    //    }
                                                        tempStr += '<div class="data-gene-detail">';
							tempStr += '<div class="data-left">';
							tempStr += '<ul>';
						//	if(rbpInfo['id'] )
						//		tempStr += '<li><label>ID:</label>'+rbpInfo['id']+'</li>';
							if(rbpInfo['geneId'] )
								tempStr += '<li><label>Gene ID:</label>'+rbpInfo['geneId']+'</li>';
							if(rbpInfo['geneName'] )
								tempStr += '<li><label>Gene Name:</label>'+rbpInfo['geneName']+'</li>';
							if(rbpInfo['geneStatus'] )
								tempStr += '<li><label>Gene Status:</label>'+rbpInfo['geneStatus']+'</li>';
							if(rbpInfo['geneType'] )
								tempStr += '<li><label>Gene Type:</label>'+rbpInfo['geneType']+'</li>';
							if(rbpInfo['transcriptId'] )
								tempStr += '<li><label>Transcript Id:</label>'+rbpInfo['transcriptId']+'</li>';
							if(rbpInfo['transcriptType'] )
								tempStr += '<li><label>Transcript Type:</label>'+rbpInfo['transcriptType']+'</li>';
							if(rbpInfo['Confidence'] )
								tempStr += '<li><label>Confidence Level:</label>'+rbpInfo['Confidence']+'</li>';

							tempStr += '</ul>';
							tempStr += '</div>';
							tempStr += '<div class="data-right">';
							tempStr += '<ul>';
							if(rbpInfo['Chromosome'] )
								tempStr += '<li><label>Chromosome:</label>'+rbpInfo['Chromosome']+'</li>';
							if(rbpInfo['Strand'] )
								tempStr += '<li><label>Strand:</label>'+rbpInfo['Strand']+'</li>';
							if(rbpInfo['Start'] )
								tempStr += '<li><label>Start:</label>'+rbpInfo['Start']+'</li>';
							if(rbpInfo['End'] )
								tempStr += '<li><label>End:</label>'+rbpInfo['End']+'</li>';
							if(rbpInfo['subclass'] )
								tempStr += '<li><label>Subclass:</label>'+rbpInfo['subclass']+'</li>';
							if(rbpInfo['Noncoding_potential'] )
								tempStr += '<li><label>Noncoding Potential:</label>'+rbpInfo['Noncoding_potential']+'</li>';
//GSM*****
							temp1 = myData1;
							temp2 = myData2;
							//if(temp2 )
                                                          //      tempStr += '<li><label>GBrowse:</label><a target="_blank" href="../../gb2/gbrowse/'+rbpInfo['RBPs']+'_'+temp1+'-'+temp2+'/">'+temp2+'</a></li>';           
                                                                tempStr += '</ul>';
                                                                tempStr += '</div>';
                                                                tempStr += '<div class="clear"></div>';
                                                                tempStr += '</div>';
                                                                htmlStr += tempStr;
								tempStr = "";
					}
					htmlStr += '</td>';
					htmlStr += '</tr>';	
					thisObj.after(htmlStr);
					$('#genestr'+key).show('fast');
					//$('#success-content').show('fast');
					$('#show-tips-genes').hide('fast');	
				},
				error:function(){
					//$('#errorMsg').html('请求失败，请稍后重试或联系网站管理员');
					$('#errorMsg').html('Failed');
					$('#show-tips-genes').show('fast');
					$('.success-content-genes').hide('fast');				
				},
				beforeSend:function(){
					
				},
				complete:function(){
					
				}
			});			
		}else if($('#genestr'+key).css('display') != 'none' || $('#genestr'+key).css('display') != 'undefined'){
			$('#genestr'+key).slideToggle('fast');
		}
	});

	$('#success-table-genes tbody tr[trname="detail"]').live('dblclick', function(event){
		event.stopPropagation();
		$(this).hide('fast');
	});


});
