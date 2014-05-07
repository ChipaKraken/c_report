var map = L.map('map').setView([
    42.87093,
    74.60335
], 13);
var count = 1;
L.tileLayer('map/map/{s}/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom: 13,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery \xa9 <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);
var myMarkers = new Array;
var tmpMarker;

Handlebars.registerHelper('escape', function(context) {
    var html = context;
    return new Handlebars.SafeString(html);
});

var fitBoundsSouthWest = new L.LatLng(42.77889737331239, 74.35615539550781);
var fitBoundsNorthEast = new L.LatLng(43.00364283408512, 74.92469787597656);

var fitBoundsArea = new L.LatLngBounds(fitBoundsSouthWest, fitBoundsNorthEast);

var maxBoundsSouthWest = new L.LatLng(42.77889737331239, 74.35615539550781);
var maxBoundsNorthEast = new L.LatLng(43.00364283408512, 74.92469787597656);

var maxBoundsArea = new L.LatLngBounds(maxBoundsSouthWest, maxBoundsNorthEast);

var onViewReset = function(e){
    map.setMaxBounds(maxBoundsArea); 
    map.off('viewreset', onViewReset);
};

map.on('viewreset', onViewReset);
    
map.fitBounds(fitBoundsArea, {reset: true}); 

var LeafIcon = L.Icon.extend({
                options: {
                    iconAnchor:   [12, 41],
                    popupAnchor:  [1, -35]
                }
            });
popup = L.popup();
var click_cheker = 0;
//compiling templates
handl_post = "<div class=\"modal\" id=\"Post\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"false\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"crid\">{{id}}</h4></div><div class=\"modal-body\"><h2>{{title}}</h2><p>{{escape post}}</p><span>{{date}} {{time}}</span>{{#comments}}<hr /><b>{{commentor_name}}: </b><p>{{comment}}</p>{{/comments}}<hr /><div class=\"form-group\"><label class=\"sr-only\" for=\"exampleInputEmail2\">Name</label><input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Name\"></div><div class=\"form-group\"><label class=\"sr-only\" for=\"exampleInputPassword2\">Comment</label><input type=\"text\" required class=\"form-control\" id=\"message\" placeholder=\"Comment\"></div><button type=\"button\" class=\"btn btn-info\" onclick=\"comment_submit()\">Comment</button></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div>";
handl_news = "<br><div class=\"titleContainer\">{{category}}<div class=\"titleTime\">{{time}}</div></div><div class=\"newsItem\"><div id=\"{{crime_id}}\"><br>{{escape description}}<br><br>{{date}}</div></div>";
var news = Handlebars.compile(handl_news);
var template = Handlebars.compile(handl_post);
moment.lang('ru');
var forma = "<div class=\"submitFormActive\"><div><label for=\"description\">Подробное описание</label><br><textarea class=\"text_area\" id=\"description\" rows=\"3\" maxlength=\"2000\"></textarea></div><div><label for=\"category\">Тип происшествия</label><br><select class=\"form_input\" style=\"height: 30px;\" id=\"category\"><option value=\"1\">кража</option><option value=\"2\">убийство</option><option value=\"3\">вымогательство</option><option value=\"4\">автоугон</option><option value=\"5\">изнасилование</option><option value=\"6\">ДТП</option><option value=\"7\">другое</option></select></div><center><div class=\"date_time\"><label for=\"date\">Дата</label><br><input type=\"date\" class=\"date_time\" style=\"height: 25px;\" id=\"date\" placeholder=\"Date\"></div><div class=\"date_time\"><label for=\"time\">Время</label><br><input type=\"time\" class=\"form_input\" id=\"time\" placeholder=\"Time\"></div><div><label for=\"police\">Обращались в миллицию?</label><select class=\"police_input\" id=\"police\"><option value=\"Да\">Да</option><option value=\"No\">Нет</option></select></div></center><button type=\"button\" class=\"submitFormCancelButton\" onclick=\"cancelInp()\">Отменить</button><button type=\"button\" class=\"submitFormButton\" onclick=\"post_aka_submit()\">Отправить</button></div>";
var buton = "<button type=\"button\" class=\"submitButton\" id=\"submitButton\" onclick=\"subButton()\">Сообщить</button>";
var sfs = $('#submitForm').height();
var ffs = $('#feedForm').height();
function subButton() {
    _start();
    $('#submitForm').html(forma);
    $('#submitForm').height(320);
    $('#feedForm').height($(window).height() - 320 - 50 - 35 - 60);
    $('#date').val(moment().format('YYYY-MM-DD'));
    $('#time').val(moment().format('hh:mm:ss'));
}



function cancelInp() {
    $('#submitForm').html(buton);
    map.removeLayer(myMarkers[myMarkers.length - 1])
    $('#submitForm').html(buton);
    $('#submitForm').height(sfs);
    $('#feedForm').height($(document).height() - 205);
    update_news();
    click_cheker = 0;
}

function httpGet(theUrl) {
    var xmlHttp;
    xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function convert_category(category) {
    var temp;
    switch (category) {
        case '1':
            temp = 'Кража';
            break;
        case '2':
            temp = 'Убийство';
            break;
        case '3':
            temp = 'Вымогательство';
            break;
        case '4':
            temp = 'Автоугон';
            break;
        case '5':
            temp = 'Изнасилование';
            break;
        case '6': 
            temp = 'ДТП';
            break;
        case '7': 
            temp = 'Другое';
    }
    return temp;
}
var k;
function new_line_handling(text) {
    text = text.toString();
    text = text.split('\n');
    var _text = '';
    for (k = 0; k < text.length; k++) {
        _text += text[k] + "<br>";
    }
    return _text;
}

var url = 'Controller/Crime_controller';
var i, _i, _len, jsonArr;
function update_news() {
    for (var i = 0; i < myMarkers.length; i++) {
        map.removeLayer(myMarkers[i])
    }
    $.get(url, function(data) {
        jsonArr = JSON.parse(data);
        $('#feedForm').html('');
        for (_i = jsonArr.length - 1, _len = -1; _i > _len; --_i) {
            i = jsonArr[_i];
            temp = i['time'].split(':');
            i['time'] = temp[0] + ':' + temp[1];
            cdate = i['date'] + '-' + temp[0] + '-' + temp[1];
            i['date'] = moment(cdate, "YYYY-MM-DD-hh-mm").fromNow();
            var temp = i['description'];
            temp = temp.split(' ');
            i['category'] = convert_category(i['category']);
            if (temp.length >= 3) {
                var popup_message = '<b>' + i['category'] + '</b><br />' + temp[0] + ' ' + temp[1] + ' ' + temp[2]  + '</div>' + '<br />' + '<a onclick=comma("' + i['crime_id'] + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
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
            } else {
                var popup_message = '<b>' + cat_pop + '</b><br />' + mess_pop[0] + '<br />' + '<a onclick=comma("' + crime[0].crime_id + '") style="cursor: pointer;">\u0427\u0438\u0442\u0430\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435 \u2192</a>'
            }
            tmpMarker = L.marker([crime[0].latitude, crime[0].longitude], {icon: icon_blue}).addTo(map).bindPopup(popup_message);
            tmpMarker.openPopup();
            myMarkers.push(tmpMarker);
            map.setView(new L.LatLng(crime[0].latitude, crime[0].longitude), 13);
        });
    });
}
update_news();
function _start(argument) {
    for (var i = 0; i < myMarkers.length; i++) {
        map.removeLayer(myMarkers[i])
    };
    click_cheker = 1;
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
    if (description.length > 4 && description.length <= 2000 && (longitude!=0 && latitude!=0)){
        $.post(constroler, {
            'description': description,
            'category': category,
            'date': date,
            'time': time,
            'police_report': police,
            'longitude': longitude,
            'latitude': latitude
        });
        map.removeLayer(myMarkers[myMarkers.length - 1])
        $('#submitForm').html(buton);
        $('#submitForm').height(sfs);
        $('#feedForm').height(ffs);
        setTimeout(function() {
            update_news();
            click_cheker = 0
        }, 1000)
    } else {
        alert("Пожалуйста, заполните это поле (минимум 5 символов) или/и укажите место на карте");
    }
}   

function comment_submit() {
    var constroler = 'Controller/Comment_controller.php';
    var comment = $('#message').val();
    var commentor_name = $('#name').val();
    if (comment == null || comment == "" || commentor_name == null || commentor_name =="") {
        alert("Поля 'Имя' и 'Комментарий' не должны быть пустыми!");
    } else {
        var crime_id = $('#crid').html();
        $.post(constroler, {
            'comment': comment,
            'commentor_name': commentor_name,
            'crime_id': crime_id
        });
        $('#Post').modal('hide');
        comma(crime_id)
    }
}

function comma(id) {
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
        marker.setLatLng(newLatLng).addTo(map)    }
}

map.on('click', onMapClick)
