var map = L.map('map').setView([
    42.87093,
    74.60335
], 13);
var count = 1;
L.tileLayer('map/map/{s}/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery \xa9 <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);
var myMarkers = new Array;
var tmpMarker;
var LeafIcon = L.Icon.extend({
                options: {
                    shadowUrl: 'js/images/marker-shadow.png',
                    iconAnchor:   [12, 41],
                    popupAnchor:  [-3, -76]
                }
            });
popup = L.popup();
var click_cheker = 0;
//compiling templates
handl_post = "<div class=\"modal\" id=\"Post\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"false\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"crid\">{{id}}</h4></div><div class=\"modal-body\"><h2>{{title}}</h2><p>{{post}}</p><span>{{date}} {{time}}</span>{{#comments}}<hr /><b>{{commentor_name}}: </b><p>{{comment}}</p>{{/comments}}<hr /><div class=\"form-group\"><label class=\"sr-only\" for=\"exampleInputEmail2\">Name</label><input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\"></div><div class=\"form-group\"><label class=\"sr-only\" for=\"exampleInputPassword2\">Comment</label><input type=\"text\" class=\"form-control\" id=\"message\" placeholder=\"Comment\"></div><button type=\"button\" class=\"btn btn-info\" onclick=\"comment_submit()\">Comment</button></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div>";
handl_news = "<br><div class=\"titleContainer\">{{category}}<div class=\"titleTime\">{{time}}</div></div><div class=\"newsItem\"><div id=\"{{crime_id}}\"><br>{{description}}<br><br>{{date}}</div></div>";
var news = Handlebars.compile(handl_news);
var template = Handlebars.compile(handl_post);
moment.lang('ru');
var forma = "<div><div class=\"form-group\"><label for=\"description\">Description</label><textarea class=\"form-control\" id=\"description\" rows=\"3\"></textarea></div><div class=\"form-group\"><label for=\"category\">Category</label><select class=\"form-control\" id=\"category\"><option value=\"1\">кража</option><option value=\"2\">убийство</option><option value=\"3\">вымогательство</option><option value=\"4\">автоугон</option><option value=\"5\">изнасилование</option></select></div><div class=\"form-group\"><label for=\"date\">Date</label><input type=\"date\" class=\"form-control\" id=\"date\" placeholder=\"Date\"></div><div class=\"form-group\"><label for=\"time\">Time</label><input type=\"time\" class=\"form-control\" id=\"time\" placeholder=\"Time\"></div><div class=\"form-group\"><label for=\"police\">Police???</label><select class=\"form-control\" id=\"police\"><option>Yes</option><option>No</option></select></div><div class=\"form-group\"><button type=\"button\" class=\"submitFormCancelButton\" onclick=\"cancelInp()\">Отменить</button><button type=\"button\" class=\"submitFormButton\" onclick=\"post_aka_submit()\">Отправить</button></div>";
var buton = "<button type=\"button\" class=\"submitButton\" id=\"submitButton\">Сообщить</button>";
var sfs = $('#submitForm').height();
var ffs = $('#feedForm').height();

$( "#submitButton" ).click(function() {
  _start();
  $('#submitForm').html(forma);
  $('#submitForm').height(450);
  $('#feedForm').height($(window).height()-600);
  $('#date').val(moment().format('YYYY-MM-DD'));
  $('#time').val(moment().format('hh:mm:ss'));
});



function cancelInp() {
	$('#submitForm').html(buton);
	map.removeLayer(myMarkers[myMarkers.length-1])
	$('#submitForm').html(buton);
	$('#submitForm').height(sfs);
    $('#feedForm').height(ffs);
	update_news();
	click_cheker = 0;
}
function httpGet (theUrl) {
	var xmlHttp;
	xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

function convert_category (category)
{
	var temp;
	switch(category)
		{
			case '1':
				temp = 'кража';
				break;
			case '2':
				temp = 'убийство';
				break;
			case '3':
				temp = 'вымогательство';
				break;
			case '4':
				temp = 'автоугон';
				break;
			case '5':
				temp = 'изнасилование';
				break;
		}
		return temp;
}

var url = 'Controller/Crime_controller';
var i, _i, _len, jsonArr;
function update_news() {
	$.get(url, function (data) {
    	jsonArr = JSON.parse(data);
		$('#feedForm').html('');
	    for (_i = jsonArr.length-1, _len = -1; _i > _len; --_i) {
	        i = jsonArr[_i];
			temp = i['time'].split(':');
			i['time'] = temp[0]+':'+temp[1];
			i['date'] = moment(i['date'], "YYYY-MM-DD").fromNow(); 
	        var temp = i['description'];
	        temp = temp.split(' ');
			i['category'] = convert_category(i['category']);
	        if (temp.length >= 3) {
	            var popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + ' ' + temp[1] + ' ' + temp[2] + '<br />' + '<a onclick=comma("' + i['crime_id'] + '")>\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
	        } else {
	            var popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + '<br />' + '<a onclick=comma("' + i['crime_id'] + '")>\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
	        }
	        marker = L.marker([
	            i['latitude'],
	            i['longitude']
	        ]).addTo(map).bindPopup(popup_message);
	        myMarkers.push(marker)
	        $('#feedForm').append(news(i));
		}
        $('.newsItem')
        .mouseover(function(a) {
            var crime_url = "Controller/Crime_controller?crime_id=" + a.toElement.id;
            var crime = JSON.parse(httpGet(crime_url));
            var redIcon = new LeafIcon({iconUrl: 'js/images/marker-red.png'});
            tmpMarker = L.marker([crime[0].latitude, crime[0].longitude], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
            map.setView(new L.LatLng(crime[0].latitude, crime[0].longitude), 13);
        })
        .mouseout(function() {
            map.removeLayer(tmpMarker);
        });  
		$('.newsItem').click(function(a) {
		comma(a.toElement.id)});
	});
}
update_news();
function _start(argument) {
    $('#firstModal').modal('hide');
    for (var i = 0; i < myMarkers.length; i++) {
        map.removeLayer(myMarkers[i])
    }
    ;
    click_cheker = 1;
    marker = new L.marker([
        42.87593,
        74.60135
    ], { id: 1 }).addTo(map)//.bindPopup('<b>Choose</b><br />placse on map.<br><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">\u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c!</button>').openPopup();
    myMarkers.push(marker)
}
function post_aka_submit(argument) {
    var constroler = 'Controller/Crime_controller.php';
    var description = document.getElementById('description').value;
    var category = document.getElementById('category').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var police = document.getElementById('police').value;
    var longitude = document.getElementById('longitude').value;
    var latitude = document.getElementById('latitude').value;
    $.post(constroler, {
        'description': description,
        'category': category,
        'date': date,
        'time': time,
        'police_report': police,
        'longitude': longitude,
        'latitude': latitude
    });
	map.removeLayer(myMarkers[myMarkers.length-1])
    $('#submitForm').html(buton);
	$('#submitForm').height(sfs);
    $('#feedForm').height(ffs);
    setTimeout(function () {
        update_news();
        click_cheker = 0
    }, 1000)
}
function comment_submit() {
    var constroler = 'Controller/Comment_controller.php';
    var comment = $('#message').val();
    var commentor_name = $('#name').val();
    var crime_id = $('#crid').html();
    $.post(constroler, {
        'comment': comment,
        'commentor_name': commentor_name,
        'crime_id': crime_id
    });
    $('#Post').modal('hide');
    comma(crime_id)
}

function comma(id){
        var crime_url = "Controller/Crime_controller?crime_id=" + id;
        var com_url = "Controller/Comment_controller.php?crime_id=" + id;
        var crime = JSON.parse(httpGet(crime_url));
        var com = JSON.parse(httpGet(com_url));
        crime[0].category = convert_category(crime[0].category);
		
        var data = { 
		  "id": id,
		  "title": crime[0].category,
		  "post": crime[0].description,
		  "date": crime[0].date,
		  "time": crime[0].time,
		  "comments": com
		};
        $('#com_helper').html(template(data));
		$('#Post').modal('show');
}
function onMapClick(e) {
    if (click_cheker === 1) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;
        var newLatLng = new L.LatLng(lat, lng);
        marker.setLatLng(newLatLng).addTo(map)//.bindPopup('<b>Choose</b><br />placse on map.<br><button class="btn btn-primary" data-target="#myModal" data-toggle="modal" type="button">\u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c!</button>').openPopup()
    }
}

map.on('click', onMapClick)

