url = 'Controller/Crime_controller'

this.httpGet = (theUrl) ->
	xmlHttp = null

	xmlHttp = new XMLHttpRequest()
	xmlHttp.open( "GET", theUrl, false )
	xmlHttp.send( null )
	xmlHttp.responseText

this.update_news = () ->
	data = httpGet(url)
	jsonArr = JSON.parse(data)
	for i in jsonArr
		$('#feedForm').append(news(i))
		temp = i['description']
		temp = temp.split(' ')

		if temp.length >= 3
			popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + ' ' + temp[1] + ' ' + temp[2]
			# ...
		else
			popup_message = '<b>' + i['category'] + '</b><br />' + temp[0]
		popup_message += '<br />' + '<a onclick=comma("' + i['crime_id'] + '")>\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
		
		marker = L.marker([i['latitude'],i['longitude']]).addTo(map).bindPopup(popup_message)
	undefined

update_news()

this._start = () ->
	$('#firstModal').modal('hide');
	for i in myMarkers
		map.removeLayer(i)
	click_cheker = 1;
	marker = new L.marker([42.87593,74.60135], { id: 1 }).addTo(map).bindPopup('<b>Choose</b><br />placse on map.<br><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">\u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c!</button>').openPopup()
	myMarkers.push(marker)
	undefined

this.post_aka_submit = () ->
	constroler = 'Controller/Crime_controller.php';
	description = $('#description').val
	category = $('#category').val
	date = $('#date').val
	time = $('#time').val
	police = $('#police').val
	longitude = $('#longitude').val
	latitude = $('#latitude').val
	$.post(constroler, {
		'description': description,
		'category': category,
		'date': date,
		'time': time,
		'police_report': police,
		'longitude': longitude,
		'latitude': latitude
	})
	$('#myModal').modal('hide');
	setTimeout(() ->
		update_news()
		click_cheker = 0
		undefined
	,1000)
	undefined

this.comment_submit = () ->
	constroler = 'Controller/Comment_controller.php';
	comment = $('#message').val()
	commentor_name = $('#name').val()
	crime_id = $('#crid').html()
	$.post(constroler, {
		'comment': comment,
		'commentor_name': commentor_name,
		'crime_id': crime_id
	});
	$('#Post').modal('hide')
	comma(crime_id)
	undefined

this.comma = (id) ->
	crime_url = "Controller/Crime_controller?crime_id=" + id;
	com_url = "Controller/Comment_controller.php?crime_id=" + id;
	crime = JSON.parse(httpGet(crime_url));
	com = JSON.parse(httpGet(com_url));
	data = { 
		"id": id,
		"title": crime[0].category,
		"post": crime[0].description,
		"date": crime[0].date,
		"time": crime[0].time,
		"comments": com
	};
	$('#com_helper').html(template(data))
	$('#Post').modal('show')
	undefined

this.onMapClick = (e) ->
	if click_cheker == 1
		lat = e.latlng.lat
		lng = e.latlng.lng
		document.getElementById('latitude').value = lat
		document.getElementById('longitude').value = lng
		newLatLng = new L.LatLng(lat, lng);
		marker.setLatLng(newLatLng).addTo(map).bindPopup('<b>Choose</b><br />placse on map.<br><button class="btn btn-primary" data-target="#myModal" data-toggle="modal" type="button">\u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c!</button>').openPopup()
		undefined

map.on('click', onMapClick)