var geocoder = new google.maps.Geocoder();
function geocodePosition(pos) {
	geocoder.geocode({
		latLng: pos
	}, function(responses) {
			if (responses && responses.length > 0) {
			  updateMarkerAddress(responses[0].formatted_address);
			} else {
			  updateMarkerAddress('Cannot determine address at this location.');
			}
	});
}



function updateMarkerStatus(str) {
  document.getElementById('markerStatus').innerHTML = str;
}



function updateMarkerPosition(latLng) {
  document.getElementById('info').innerHTML = [
    latLng.lat(),
    latLng.lng()
  ].join(', ');
}




function updateMarkerAddress(str) {
  document.getElementById('address').innerHTML = str;
}


function drag_marker(marker){
	var m_postion= marker.getPosition();
	$.ajax({
		//
		url: root_url +"ajax/position_update_latlng",
		type: 'post',
		data: {lat: m_postion.jb, lng: m_postion.kb, id_position: marker.id},
		dataType: 'html',
		beforeSend: function() {
		},	
		complete: function() {
			
		},	
		success: function() {
			
		}
	});
}



function marker_menu_rightclick(marker, mouseX, mouseY){
	$('.rc-map-menu').css({
		display: 'block',
		position: 'absolute',
		top: mouseY,
		left: mouseX,
		zIndex: 1,
	});
	$('.rc-map-menu ul #rc_marker_id').attr('value', marker.id);
	
}

function find_marker_id(id, markers){
	var i=0;
	for(i=0; i< markers.length; i++){
		if(markers[i].id==id){
			return i;
		}
	}
	return -1;
}

function rightclick_marker(markers){
	//delete marker
	$('.rc-map-menu ul li').click(function(){
		markerid= $('.rc-map-menu ul #rc_marker_id').val();
		$.ajax({
			url: "ajax.php?delete=1",
			type: 'get',
			data: {id: markerid},
			dataType: 'html',
			beforeSend: function() {
				$('.rc-map-menu').hide();
			},	
			complete: function() {
				var m_index= find_marker_id(markerid, markers);
				alert(m_index);
				markers[m_index].setMap(null);
			},	
			success: function() {
			}
		});
	});
}

function initialize() {
	//all current markers on map
	var allMarker= [];


	//Create a position depend on this structure
	var markers= get_all_marker();
	
	//initial the map
	var latLng = new google.maps.LatLng(10.750336450732853, 106.70443815612794);
	var map = new google.maps.Map(document.getElementById('mapCanvas'), {
		zoom: 8,
		center: latLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	
	
	//  Create a new viewpoint bound what can see all markers
	var bounds = new google.maps.LatLngBounds();
	
	var infowindow = new google.maps.InfoWindow();	
	
	//Create marker list
	for(var i=0; i< markers.length; i++){
		//Create a marker
		var marker = new google.maps.Marker({
			id: markers[i][3],
			position: new google.maps.LatLng(markers[i][0], markers[i][1]),
			title: 'Point ' +i,
			map: map,
			draggable: true,
			//Style for marker
			// icon: new google.maps.MarkerImage(
                // 'marker/mgreen.png',  // different image
                // new google.maps.Size(30, 30),
                // new google.maps.Point(0, 0),
                // new google.maps.Point(0, 30)
            // )
		});
		//all current markers on map
		allMarker.push(marker);
		
		
		//Set marker for bound, can view all markers
		bounds.extend(marker.getPosition());
		
						
		//Drag marker
		google.maps.event.addListener(marker, 'drag', (function(marker, i) {
			return function() {
				// updateMarkerStatus('Dragging...');
				// updateMarkerPosition(marker.getPosition());
			}
		})(marker, i));
		google.maps.event.addListener(marker, 'dragend', (function(marker, i) {
			return function() {
				drag_marker(this);
			}
		})(marker, i));
		
		
		//Info window for each event
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(markers[i][2]);
				infowindow.open(map, marker);
			}
		})(marker, i));	
		
		//get left top of mouse right click
		var mouseX, mouseY;
		$(document).mousedown(function(e){ 
			if( e.button == 2 ) { 
				mouseX = e.pageX;
				mouseY = e.pageY;
			} 
		});
		
		
		google.maps.event.addListener(marker, 'rightclick', (function(marker, i) {
			return function() {	
				marker_menu_rightclick(marker, mouseX, mouseY);
			}
		})(marker, i));	
	}
	
	// console.log(allMarker);
	
	rightclick_marker(allMarker);
	//Fit screen to see all markers
	 map.fitBounds(bounds);
	
	
	google.maps.event.addListener(map, 'click', function(event) {
		// map.setZoom(8);
		// map.setCenter(event.latLng);
		// infowindow.close();	
		$('.rc-map-menu').hide();
	});
	
	
	//include adding marker when choose "Create marker"
	gmap_context_menu(map, allMarker);
	
		
	//disable menu context of browser
	// $(document).bind("contextmenu",function(e){
		// return false;
	// });
}

google.maps.event.addDomListener(window, 'load', initialize);
