
//--------- config ----------------
var baseurl='http://localhost/slim3-rest/';

//---------- default ------------------
$(document).ready(function() {// initial traitment, not after : OK
	myHome();	
	return false;
});

function myHome(){
   console.log('home');
   $('.msg').html("");
   $('.msg').append("Welcome to CRUD page");
   $('#title').val('');
   $('#id').val('');
}
//------------------- controller ---------------
$('#btnCreate').click(function() {
		myCreate();
	return false;// OBLIGATORY avoid to redirect (add query in param) and product error
});
$('#btnRead').click(function() {
		myRead();//display();
	return false;// OBLIGATORY avoid to redirect (add query in param) and product error
});
$('#btnUpdate').click(function() {
		myUpdate();
	return false;// OBLIGATORY avoid to redirect (add query in param) and product error
});
$('#btnDelete').click(function() {
		myDelete();
	return false;// OBLIGATORY avoid to redirect (add query in param) and product error
});

$('#btnClear').click(function() {
		myHome();		
	return false;// OBLIGATORY avoid to redirect (add query in param) and product error
});


//----------------- helper ------------------------
function formToJSON() {
    return JSON.stringify({
		"id": $('#id').val(),
		"title": $('#title').val()
		});
}//var data={id:$('#id').val(),title: $('#title').val()}

//----------------- crud ---------------------------
function myCreate() {
	//console.log('update');
	$.ajax({
		type: 'POST',
		url: baseurl,
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('created with success  '+ JSON.stringify(results));
	//var myfields = JSON.parse(results);// yet done
	$('.msg').html("");
	$('.msg').append(results.msg+" - "+results.title);
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
}

function myRead() {
	//console.log('update');
	$.ajax({
		type: 'GET',
		url: baseurl + $('#id').val(),
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('retrieved with success  '+ JSON.stringify(results));
	//var myfields = JSON.parse(results);// yet done
	$('.msg').html("");
	$('.msg').append(results.msg+" - "+results.title);
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
}

function myUpdate() {
	//console.log('update');
	$.ajax({
		type: 'PUT',
		url: baseurl + $('#id').val(),
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('updated with success  '+ JSON.stringify(results));
	//var myfields = JSON.parse(results);// yet done
	$('.msg').html("");
	$('.msg').append(results.msg+" - "+results.title);
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
}

function myDelete() {// delete is reserved
	//console.log('update');
	$.ajax({
		type: 'DELETE',
		url: baseurl + $('#id').val(),
		dataType: "json",
		contentType: 'application/json',
		data:formToJSON(),
}).done(function (results) {
	console.log(results);
    console.log('deleted with success  '+ JSON.stringify(results));
	//var myfields = JSON.parse(results);// yet done
	$('.msg').html("");
	$('.msg').append(results.msg);
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log('fail : ' + textStatus);
});
}