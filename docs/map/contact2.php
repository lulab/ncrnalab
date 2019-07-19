<!DOCTYPE html>
<html>
    <head>
        <title>Contact Us</title>
        <!-- Bootstrap -->
        <link href="./bootstrap_custom/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <script type="text/javascript" src="http://www.openlayers.org/api/OpenLayers.js"></script>
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true&language=en"></script>
<script type="text/javascript">
    function initialize() {
    /*----- ??????? -----*/
    var latlng = new google.maps.LatLng(34,135);
 
    /*----- ?????????????? -----*/
    var myOptions = {
        zoom: 12,
        
        center: new google.maps.LatLng(40.005146, 116.316391),
       mapTypeId: google.maps.MapTypeId.HYBRID
    };
 
    /*----- ??????? -----*/
    var styles = [
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#808080" }
            ]
        }
    ];
 
    /*----- ???????? -----*/
    var styleName = 'MyStyle';
 
    /*----- ?????? -----*/
    var map = new google.maps.Map(document.getElementById('map_basic'), myOptions);
 
    /*----- ??????? -----*/
    map.mapTypes.set(styleName, new google.maps.StyledMapType(styles, { name: styleName }));
    map.setMapTypeId(styleName);
 
    /*----- ???????????? -----*/
    var markerOptions = {
        position: new google.maps.LatLng(40.005146, 116.316391),
        map: map,
        title: ''
    };
 
    /*----- ?????? -----*/
    var marker = new google.maps.Marker(markerOptions);
 
    /*----- ??????????? -----*/
    var geocoder = new google.maps.Geocoder();
 
    /*----- ??????????? -----*/
    geocoder.geocode({
        'address':'????'
    },function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
        }
    });
}
</script>
    </head>
    <body>

        
          <!-- call menu & call javascript --->
   
        <div class="row-fluid" style = "
    margin-right: auto; margin-left: auto; width: 1300px;
">
            <div class="col-lg-6" 
>
                <div class="well">
                                                    <p>
                                                   
<br><br>               
<h2>Welcome to Lu Lab</h2>
MOE Key Lab of Bioinformatics<br>
School of Life Sciences, Tsinghua University<br>
<h3>Location</h3>
Room 2-108; 2-110; 2-111; 3-106; 3-109<br>
Biotech. Building<br> 
Tsinghua University<br>
Beijing 100084, China</br>

<h3>Email Address</h3>
<img src="./images/email.png"  /> 
<h3>Tel.</h3>
+86-010-62789217; +86-010-62789526
<br>
<h3>Lab Homepage</h3>  
<a href="http://bioinformatics.life.tsinghua.edu.cn">Lulab Tsinghua University</a>

<br><br><br>               
                 </p>
                </div>
                
            </div>
            <div class="col-lg-6">
                <body onload="initialize()">
<p><br><br><br></p>
    <div id="map_basic" style="width: 600px; height: 600px"></div></div>
</body>
            </div>
        </div>
           
           


         





          



        

          
</body>
</html>
