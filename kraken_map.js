var map = L.map('map').setView([42.87093, 74.60335], 13);
var count = 1;
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

L.marker([42.87093, 74.60335]).addTo(map)
	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

var popup = L.popup();

var k_lat =document.getElementById('lat')
var k_lng =document.getElementById('lng')

function onMapClick(e) {
	var lat = (e.latlng.lat);
	var lng = (e.latlng.lng);
	k_lat.value = lat;
	k_lng.value = lng;
	if (count === 1)
	{
		marker = new L.marker(e.latlng, {id:1}).addTo(map)
			.bindPopup("<b>Это произошло</b><br />здесь.").openPopup();
		count+=1;
	} 
	else
	{
		var newLatLng = new L.LatLng(lat, lng);
		marker.setLatLng(newLatLng).addTo(map)
			.bindPopup("<b>Это произошло</b><br />здесь.").openPopup();
	};
};

map.on('click', onMapClick);