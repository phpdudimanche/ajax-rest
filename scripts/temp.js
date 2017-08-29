$(function(){// FUNCTIONS BEGIN
//--- var
var baseurl='http://localhost/slim3-rest/';
var target=$('body');//  html tag to target : id '#id', class '.class', html body 'body'
var data={
	"footer":
		{
		"name": "Julien Gontier",
		"copyright": "2017"
		},
	"header":
		{
		"title":"CRUD example",
		"description":"easy to understand with :",
		"elements":
			[
			"json data exchange,","ajax jquery request","and multiple include mustachejs template."
			]
		},
	"myid":"","mytitle":"","mymsg":"CRUD script"
};
//------------ template -------------
var tplFooter="<strong>{{footer.name}}</strong> - {{footer.copyright}}";// one line
var tplHeader="<strong>{{header.title}}</strong> - "+
			"<i>{{header.description}}</i>"+
			"<ul>{{#header.elements}}<li>{{.}}</li>{{/header.elements}}</ul>";// multiline with +
var tplFrame="{{> theheader}}<hr />{{> thecontent}}<br /><hr />{{> thefooter}}";
var tplContent="<br />"+
"<div>"+
    "<p class=\"msg\">{{mymsg}}</p>"+
"</div>	 "+  	   
"<form id=\"issue\">"+
	"<label>Identifier : </label><input type=\"text\" id=\"id\" value=\"{{myid}}\" size=3 name=\"id\"/>"+
	"<label>Title : </label><input type=\"text\" id=\"title\" value=\"{{mytitle}}\" size=50 name=\"title\"/>"+
	"<button id=\"btnCreate\">Create</button>"+
	"<button id=\"btnRead\">Read</button>"+
	"<button id=\"btnUpdate\">Update</button>"+
	"<button id=\"btnDelete\">Delete</button>"+
	 " - <button id=\"btnClear\">Clear form</button>"+
"</form>";
//-------------- template glue (multiple template) -------
var partials = {
  thefooter: tplFooter,
  theheader: tplHeader,
  thecontent: tplContent
};// specific for multiple partials
//----------------- helper ------------------------
function displayTemplate(){
	//var glueFrame = Mustache.render(tplContent,data);// alternative version with just one template
	var glueFrame = Mustache.render(tplFrame,data,partials);//ADD for template
	target.html(glueFrame);// ADD for template
}
function formToJSON() {
    return JSON.stringify({
		"id": $('#id').val(),
		"title": $('#title').val()
		});
}
function JSONToForm(results){
data.myid="id" in results ? results.id : "";
data.mytitle="title" in results ? results.title: "";
data.mymsg="msg" in results ? results.msg: "";
}
//--- controller
$(document).ready(function() {// initial
	console.log('init');
	displayTemplate();
});
target.on('click','#btnClear',myClear);// clean form
target.on('click','#btnCreate',myCreate);
target.on('click','#btnRead',myRead);
target.on('click','#btnUpdate',myUpdate);
target.on('click','#btnDelete',myDelete);
//---- CRUD
function myCreate() {
	$.ajax({
		type: 'POST',
		url: baseurl,
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('created with success  '+ JSON.stringify(results));	
	JSONToForm(results);
	displayTemplate();
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);	
});
return false;// ADD after ajax
}
function myRead(){	
	$.ajax({
	type: 'GET',
	url: baseurl +$('#id').val(),// 34 $('#id').val()
	dataType: "json",
	contentType: 'application/json',
	//data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('retrieved with success  '+ JSON.stringify(results));	
	JSONToForm(results);
	displayTemplate();
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
	return false;// ADD after ajax
	
};
function myUpdate() {
	$.ajax({
		type: 'PUT',
		url: baseurl + $('#id').val(),
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('updated with success  '+ JSON.stringify(results));
	JSONToForm(results);
	displayTemplate();
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
return false;// ADD after ajax
}
function myDelete() {
	$.ajax({
		type: 'DELETE',
		url: baseurl + $('#id').val(),
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('deleted with success  '+ JSON.stringify(results));
	JSONToForm(results);
	displayTemplate();
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
return false;// ADD after ajax
}
function myClear(){
	var results={"msg":"Clean data form"};
	JSONToForm(results);
	displayTemplate();
}
});//--- FUNCTIONS END