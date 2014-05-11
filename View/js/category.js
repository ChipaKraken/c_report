function func() {
  //clear search field
  document.getElementById('search_id').value="";
  
  //declaring variables
  var all_checkbox = document.getElementById("checkbox1");

  // Now check what checkboxes are selected and build GET REQUEST

  if (all_checkbox.selected == true) {
    //just call method update_news if we chose "all" category
    update_news();
  } else {
    //otherwise build get request
    var crime_url = "Controller/Crime_controller?category=";
    var counter = 0;
    var loop_checker = 0; //loop checker is needed to build properly get request (check if comma is needed)
    for (var i = 2; i <= 8; ++i) {
      if (document.getElementById("checkbox" + i.toString()).selected == true) {
        if (loop_checker == 0) {
          i--;
          crime_url += i; 
          i++;
          loop_checker = 1;
        } else {
          i--;
          crime_url += "," + i;
          i++;
        }
      }
    }
    //getting data after get request
    var crime = JSON.parse(httpGet(crime_url));
    
    //clear newsfeed
    $('#feedForm').html('');
    
    //clear map
    for (var i = 0; i < myMarkers.length; i++) {
      map.removeLayer(myMarkers[i])
    }
    //appending newsfeed and map
    for (_i = crime.length - 1, _len = -1; _i > _len; --_i) {
            i = crime[_i];
            temp = i['time'].split(':');
            i['time'] = temp[0] + ':' + temp[1];

            cdate = i['date'] + '-' + temp[0] + '-' + temp[1];
            i['fromNow'] = moment(cdate, "YYYY-MM-DD-hh-mm").fromNow();
            i['date'] = checkDate(i['date']);

            var temp = i['description'];
            i['description'] = checkLength(i['description']);
            temp = temp.split(' ');
            i['category'] = convert_category(i['category']);
            if (temp.length >= 3) {
                var popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + ' ' + temp[1] + ' ' + temp[2]  + '</div>' + '<br />' + '<a onclick=comma("' + i['crime_id'] + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
            } else if(temp.length == 2) {
				var popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + ' ' + temp[1] + '<br />' + '<a onclick=comma("' + i['crime_id'] + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
			} else {
                var popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + '<br />' + '<a onclick=comma("' + i['crime_id'] + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
            }
            marker = L.marker([
                i['latitude'],
                i['longitude']
            ]).addTo(map).bindPopup(popup_message);
            myMarkers.push(marker)
            $('#feedForm').append(news(i));
        }
        $('.newsItem').click(function(a) {
            var crime_url = "Controller/Crime_controller?crime_id=" + a.toElement.id;
            var crime = JSON.parse(httpGet(crime_url));
            var icon_blue = new LeafIcon({iconUrl: 'js/images/marker-icon.png'});
			var cat_pop = convert_category(crime[0].category);
			var mess_pop = crime[0].description;
			mess_pop = mess_pop.split(' ');
            if (mess_pop.length >= 3) {
                var popup_message = '<b>' + cat_pop + '</b><br />' + mess_pop[0] + ' ' + mess_pop[1] + ' ' + mess_pop[2]  + '</div>' + '<br />' + '<a onclick=comma("' + crime[0].crime_id + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
            } else if(mess_pop.length == 2){
                var popup_message = '<b>' + cat_pop + '</b><br />' + mess_pop[0] + ' ' +  mess_pop[1] + '<br />' + '<a onclick=comma("' + crime[0].crime_id + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
            } else {
				var popup_message = '<b>' + cat_pop + '</b><br />' + mess_pop[0] + '<br />' + '<a onclick=comma("' + crime[0].crime_id + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
			}
            tmpMarker = L.marker([crime[0].latitude, crime[0].longitude], {icon: icon_blue}).addTo(map).bindPopup(popup_message);
			tmpMarker.openPopup();
			myMarkers.push(tmpMarker);
            map.setView(new L.LatLng(crime[0].latitude, crime[0].longitude), 13);
        });
  }
};