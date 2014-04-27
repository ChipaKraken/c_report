function func(checkbox) {
  var all_checkbox = document.getElementById("checkbox1");
  _checkbox = document.getElementById(checkbox);

  if (checkbox == "checkbox1") {
    if (_checkbox.checked == false) {
      for (var i = 2; i <= 6; ++i) {
        document.getElementById("checkbox" + i.toString()).checked = true;
      } 
    } else {
      for (var i = 2; i <= 6; ++i) {
        var temp = document.getElementById("checkbox" + i.toString());  
        temp.checked = false;
      }
    }
  } else {
    if (_checkbox.checked == false) {
      var counter = 0;
      for (var i = 2; i <= 6; ++i) {
        if (document.getElementById("checkbox" + i.toString()).checked == true) {
          counter++;
        }
      }
      if (counter == 0) {
        all_checkbox.checked = true;
      }
    } else {
      all_checkbox.checked = false;
    }
  } 
  // Now check what checkboxes are checked and build GET REQUEST

  if (all_checkbox.checked == true) {
    //just call method update_news
    update_news();
  } else {
    //otherwise build get request
    var crime_url = "Controller/Crime_controller?category=";
    var counter = 0;
    var loop_checker = 0;
    for (var i = 2; i <= 6; ++i) {
      if (document.getElementById("checkbox" + i.toString()).checked == true) {
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
    var crime = JSON.parse(httpGet(crime_url));
    $('#feedForm').html('');
    for (var i = 0; i < myMarkers.length; i++) {
      map.removeLayer(myMarkers[i])
    }
    for (_i = crime.length - 1, _len = -1; _i > _len; --_i) {
            i = crime[_i];
            temp = i['time'].split(':');
            i['time'] = temp[0] + ':' + temp[1];
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
            comma(a.toElement.id);
        });
  }
};