function gmap_context_menu(map, allMarker){
//	create the ContextMenuOptions object
	var contextMenuOptions={};
	contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};
	
	//	create an array of ContextMenuItem objects
	var menuItems=[];
	menuItems.push({className:'context_menu_item', eventName:'zoom_in_click', label:'Zoom in'});
	menuItems.push({className:'context_menu_item', eventName:'zoom_out_click', label:'Zoom out'});
	menuItems.push({className:'context_menu_item', eventName:'marker_create_click', label:'Create marker'});
	//	a menuItem with no properties will be rendered as a separator
	menuItems.push({});
	menuItems.push({className:'context_menu_item', eventName:'center_map_click', label:'Center map here'});
	contextMenuOptions.menuItems=menuItems;
	
	//	create the ContextMenu object
	var contextMenu=new ContextMenu(map, contextMenuOptions);
	
	//	display the ContextMenu on a Map right click
	google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
		contextMenu.show(mouseEvent.latLng);
	});
	
	
	
	var mouseX, mouseY;
	$(document).mousedown(function(e){ 
		if( e.button == 2 ) { 
			mouseX = e.pageX;
			mouseY = e.pageY;
		} 
	});
	//	listen for the ContextMenu 'menu_item_selected' event
	google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
		//	latLng is the position of the ContextMenu
		//	eventName is the eventName defined for the clicked ContextMenuItem in the ContextMenuOptions
		switch(eventName){
			case 'zoom_in_click':
				map.setZoom(map.getZoom()+1);
				break;
			case 'zoom_out_click':
				map.setZoom(map.getZoom()-1);
				break;
			case 'center_map_click':
				map.panTo(latLng);
				break;
				
			//Create marker when click on "create marker"
			case 'marker_create_click':
				$.ajax({
					url: "ajax.php?insert=1",
					type: 'get',
					data: {lat: latLng.lat(), lng: latLng.lng(), info: ''},
					dataType: 'html',
					beforeSend: function() {},	
					complete: function(html) {},	
					success: function(html) {
						var marker = new google.maps.Marker({
							id: html,
							position: latLng,
							map: map,
							draggable: true,
						});
						allMarker.push(marker);
						console.log(allMarker);
						google.maps.event.addListener(marker, "dragend", function() {
							drag_marker(this);
						});

						google.maps.event.addListener(marker, "rightclick", function() {
							marker_menu_rightclick(marker, mouseX, mouseY);
						});	
					}
				});	
				break;
		}
	});
}



