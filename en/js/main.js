$(function(){

	initializeDateTimePicker();

	initializeBookings();

	// Add Header to the HTML
	$("#headerField").load("templates/header.html", function(){
		addActiveHeader();

		var loading = $.loading();
		loading.ajax(true);	
	}); 

	//Add Footer to the HTML
	$("#footerField").load("templates/footer.html"); 

	$('#screenshot-carousel').carousel({
      interval: 5000
    });
});



function addActiveHeader(){
	var url = window.location.href.split('/');
	url = url[url.length -1].split('#')[0];

	if(url == "index.html"){
		$('.menu_list > li').eq(0).addClass('current-item');
	}else if(url == "kolleksjon.html"){
		$('.menu_list > li').eq(1).addClass('current-item');
	}else if(url == "accessories.html"){
		$('.menu_list > li').eq(2).addClass('current-item');
	}else if(url == "bestill_time.html" || url == "bestilling_ferdig.html"){
		$('.menu_list > li').eq(3).addClass('current-item');
	}else if(url == "om_oss.html"){
		$('.menu_list > li').eq(4).addClass('current-item');
	}else{
		$('.menu_list > li').eq(0).addClass('current-item');
	}
}


function initializeBookings(){

	$('#booking_form_main').submit(function(e) {
		e.preventDefault();
		var values = $(this).serializeArray();

		if($.trim(values[0]['value']) == '' ){
			alert('You need to write in a message');
		}else if($.trim(values[1]['value']) == '' &&  !isEmail(values[2]['value'])){
			alert('You need to insert a valid email or a phone number');
		}else if($.trim(values[3]['value']) == ''){
			alert('You need to write in a message');
		}else{
			SendEmail('email_kontakt.php',  values);
		}

	});

	$('#booking_form').submit(function(e) {
		e.preventDefault();

		if($.trim(this[0].value) && $.trim(this[1].value) && $.trim(this[2].value)){
			var values = $(this).serialize();
			
			$.ajax({
				type: "POST",
				url: 'php/dataUpload.php',
				data: values,
					
				success: function (data) {
					SendEmail('email_booking.php', values);
				},
				cache: false
			});
			
		}else{
			alert('Fill inn more information');			
		};
	});

}

function SendEmail(emailPHP, values){

	$.ajax({
		type: "POST",
		url: 'php/email_kontakt.php',
		data: values,
			
		success: function (data) {
			if(emailPHP=='email_kontakt.php'){
				if(data=='1'){
					alert('Message sent. We will respond to you during the next working day');
				}else{
					alert(data);
				}
				$('#booking_form_main')[0].reset();
			}else if(emailPHP=='email_booking.php'){
				$('#booking_form')[0].reset();
				document.location.href = "bestilling_ferdig.html";
			}
		},
		cache: false
	});

}


function initializeDateTimePicker(){
	$('#datetimepicker1').datetimepicker({
        locale: 'nb',
        daysOfWeekDisabled: [0],
        viewMode: 'months',
        format: 'L'
    });
    $('#datetimepicker2').datetimepicker({
        locale: 'nb',
        daysOfWeekDisabled: [0],
        viewMode: 'months',
        format: 'L'
    });
    $('#datetimepicker3').datetimepicker({
        locale: 'nb',
        enabledHours: [10, 11, 12, 13, 14, 15, 16, 17, 18],
        stepping: [30],
        format: 'LT'
    });
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function initMap() {
	var zoomVar = 14
	var UI = false;

	var myLatLng = {lat: 59.9559, lng: 10.6854};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: zoomVar,
		center: myLatLng,
		disableDefaultUI: UI
	});

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'address'
	});
}

