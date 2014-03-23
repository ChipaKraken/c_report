httpGet = (theUrl) ->
	xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	xmlHttp.responseText;

url = "api.php"
jsonArr = JSON.parse(httpGet(url));
check = jsonArr.length
feed = document.getElementById("feedForm");
for_feed = "";
for_temp = "";
for i in jsonArr
	for_feed += '<br>';
	for_feed += '<div class="titleContainer">' + i['title'];
	for_feed += '<div class="titleTime">' + i['title_time'] + '</div>';
	for_feed += '</div>';
	for_feed += '<div class="newsItem">';
	for_feed += '<br>';
	for_feed += i['news_item']
	for_feed += '<br><br>' + i['place']
	for_feed += i['_when']
	for_feed += '</div>';
	
	for_feed += for_temp;
	for_temp = for_feed;
	for_feed = "";
feed.innerHTML=for_temp;
