var form = document.createElement("form");
var tab = document.createElement("table");
tab.setAttribute("border","1");
for(var key in myPlace)
{
	var tr = document.createElement("tr");
	var myField = document.createElement("input");
	myField.setAttribute("name", myPlace[key]['title']);
	myField.setAttribute("value", myPlace[key]['lonlat']);

	var myP= document.createElement("span");
	myP.innerHTML = myPlace[key]['title'];

	var td1= document.createElement("td");
	var td2= document.createElement("td");

	td1.appendChild(myP);
	td2.appendChild(myField);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tab.appendChild(tr);
}
var sub = document.createElement("input");
sub.setAttribute("class","button");
sub.setAttribute("type","submit");
sub.setAttribute("value","submit");

form.appendChild(tab);
form.appendChild(sub);
document.body.appendChild(form);
