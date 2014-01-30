var map = L.map('map').setView([42.87093, 74.60335], 13);
var count = 1;
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery В© <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

L.marker([42.87093, 74.60335]).addTo(map)
	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

var popup = L.popup();

function startTime()
{
    var tm = new Date();
    var h = tm.getHours();
    var m = tm.getMinutes();
    var s = tm.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("hour").innerHTML = h;
    document.getElementById("min").innerHTML =  m;
    t = setTimeout('startTime()',500);
}
function checkTime(i)
{
    if (i<10)
    {
    i = "0" + i;
    }
    return i;
}

//var k_lat =document.getElementById('lat')
//var k_lng =document.getElementById('lng')

function onMapClick(e) {
	var lat = (e.latlng.lat);
	var lng = (e.latlng.lng);
//	k_lat.value = lat;
//	k_lng.value = lng;
	if (count === 1)
	{
		marker = new L.marker(e.latlng, {id:1}).addTo(map)
			.bindPopup("<b>Р­С‚Рѕ РїСЂРѕРёР·РѕС€Р»Рѕ</b><br />Р·РґРµСЃСЊ.").openPopup();
		count+=1;
	} 
	else
	{
		var newLatLng = new L.LatLng(lat, lng);
		marker.setLatLng(newLatLng).addTo(map)
			.bindPopup("<b>Р­С‚Рѕ РїСЂРѕРёР·РѕС€Р»Рѕ</b><br />Р·РґРµСЃСЊ.").openPopup();
	};
};

map.on('click', onMapClick);
