var i, _i, _len, jsonArr;
  function se () {
    for (var i = 0; i < myMarkers.length; i++) {
        map.removeLayer(myMarkers[i])
    }
    var input = document.getElementById('search_id').value;
    var url = 'se.php?searchq=' + input;
    if (input.length > 0) {
      $.get(url, function(data) {
          jsonArr = JSON.parse(data);
          $('#feedForm').html('');
          for (_i = jsonArr.length-1, _len = -1; _i > _len; --_i) {
              i = jsonArr[_i];
              console.log(i);
              temp = i['time'].split(':');
              i['time'] = temp[0]+':'+temp[1];
              
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
      });
    } else {
      update_news();
    }
  }