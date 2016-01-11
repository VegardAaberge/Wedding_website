(function() {
	// Check if user is in session, if not toggle modal login window
	if(sessionStorage.getItem("userdata")  !== null){
		var userdata = JSON.parse(sessionStorage.userdata);
		initialize(userdata);
	}else{
		$('#contact').modal('toggle');
	};

	// Check if password is correct
	// If it is correct, call the display data function
	$('.submitPasswordButton').click(function(){
		var username = $('#system_username').val();
		var password = $('#system_password').val();

		$.ajax({
			type: "POST",
			url: 'php/login.php',
			data: {username: username, password: password},
			
			success: function (data) {
				if(data == 'success'){
					var userdata = [username, password];
					sessionStorage.userdata = JSON.stringify(userdata);
					
					initialize(userdata);
				}else{
					alert('you typed in wrong username or password');
				};
			},
			cache: false
		});


	})
})();



function initialize(userdata){
	// Change CSS to the current page
	if(sessionStorage.getItem("ref") === null){
		sessionStorage.ref = '#tab1';
	}
	changePage(sessionStorage.ref);

	// Display the Data
	initializeData(userdata);

	// Load the dynamic submit fields 
	initializeFields(userdata);

	// Load the Event listeners
	initializeEvents(userdata);
}
	

///////////////// Initialize Functions ///////////////////

function initializeEvents(userdata){

	// Change Page event //
	// Save the page clicked, then call change page functions
	$('.tab-links a').on('click', function(e)  {
		sessionStorage.ref = $(this).attr('href');
		changePage(sessionStorage.ref);
	});


	// Order Event //
	// Save the current order name to sessionStorage
	// Display data in the right order with or without search
	$(document).on('click', '.tableHeader', function(){ 
		var typeID = sessionStorage.ref.replace('#tab','');
		sessionStorage.setItem('order_name'+ typeID, $(this).attr('name'));

		var searchOption = $('.searchOptions' + typeID).val();
		var search_name = $($('#search' + typeID)).val().toLowerCase();

		if(jQuery.trim(search_name) != ''){
			showData(userdata, search_name, searchOption);
		}
		else{
			showData(userdata);
		}
	});


	// Search Keyup Event //
	// Get the search data and display with or without search
	$('.search').keyup(function() {

		var searchOption = $('.searchOptions' + (sessionStorage.ref).replace('#tab','')).val();
		var search_name = $(this).val().toLowerCase();

		if(jQuery.trim(search_name) != ''){
			showData(userdata, search_name, searchOption); 
		}
		else{
			showData(userdata); 
		}
	});



	// Delete Event //
	// Get the parameters for the row clicked
	// Delete data from the server
	$(document).on('click', '.delete_button', function(){ 
		if(confirm('Are you sure you want to delete this user?')){			
			data = getParameters($(this));

			$.ajax({
				type: "POST",
				url: 'php/dataDelete.php',
				data: {userdata: userdata, id: data.id, type: data.type},
				
				success: function (data) {
					showData(userdata); 
				},

				cache: false
			});
			
		};
		
	});


	// Save event //
	// Get the parameters for the row clicked
	// Get the input data from the fields
	// Convert to JSON, update data to server
	$(document).on('click', '.save_button', function(){
	
		data = getParameters($(this));

		saveData = [];
		for (i = 0; i < data.names.length; i++) {
			var typeID = data.typeRef + (i+2);
			var fieldType = $('.field' + data.orderID +' .data'+ typeID).children().prop('nodeName');
			saveData[i] = $('.field' + data.orderID +' .data'+ typeID +' '+ fieldType).val();
		};	

		saveData = JSON.stringify(saveData);

		$.ajax({
			type: "POST",
			url: 'php/dataUpdate.php',
			data: {userdata: userdata, data: saveData, names: data.names, type: data.type, id: data.id},
			
			success: function (data) {
				showData(userdata); 
			},

			cache: false
		});

	});



	// Submit Event //
	// Prevent refresh, get the mysql database name
	// Convert submit data, upload data to server
	$('.submit_form').submit(function(e) {
		e.preventDefault();

		var typeID = sessionStorage.ref.replace('#tab','')
		
		var type = ['people', 'orders','ordersacc', 'dresses' , 'accessories', 'bookings'];
		type = type[typeID-1];

		var data = JSON.stringify($(this).serializeArray());

		$.ajax({
				type: "POST",
				url: 'php/dataUpload.php',
				data: {userdata: userdata, data: data, type: type},
				
				success: function (data) {
					showData(userdata);
				},

			cache: false
		});
	});

}

function initializeFields(userdata){
	$.ajax({
		type: "POST",
		url: 'php/dataLoad.php',
		data: {userdata: userdata},
		
		success: function (data) {				
			var Data = JSON.parse(data);
			
			// Customer //
			// Create label and select for the 3 dresses fields 
			// Add the current dresses as options to the fields
			for(j=1 ; j< 4 ; j++){
				$('.dress_field' + j).html('<label for "wedding_dress"> Wedding Dress '+j+'</label>'+
				'<select name="wedding_dress'+ j +'" id="wedding_dress'+ j +'"></select>');
				
				for(i=0 ; i< Data[1].length ; i++){
					
					var newOption = $('<option>');
					newOption.attr('value', Data[0][i][0]).text(Data[0][i][1]);
					
					$('#wedding_dress' + j).append(newOption);  
				}
			}
			
			// Orders //
			// Create label and select for dress field
			// Add the current dresses as options to the field
			$('.dress_field').html('<label for "wedding_dress"> Wedding Dress </label>'+
			'<select name="dress" id="wedding_dress"></select>');
				
			for(i=0 ; i< Data[0].length ; i++){
					
				var newOption = $('<option>');
				newOption.attr('value', Data[0][i][0]).text(Data[0][i][1]);
				
				$('#wedding_dress').append(newOption);   
			}

			// Orders Accessory //
			// Create label and select for the fields 
			// Add the current accessories as options to the field.
			$('.accessory_field').html('<label for "accessory"> Accessory Code </label>'+
			'<select name="accessory" id="accessory"></select>');
				
			for(i=0 ; i< Data[1].length ; i++){
					
				var newOption = $('<option>');
				newOption.attr('value', Data[1][i][0]).text(Data[1][i][1]);
				
				$('#accessory').append(newOption);   
			}
		},
		cache: false
	});
}


function initializeData(userdata){
	dataCustomer(userdata);
	dataAccessories(userdata);
	dataDresses(userdata);
	dataOrders(userdata);
	dataOrdersacc(userdata);
	dataBookings(userdata);
}


////////////////// Helper Functions ///////////////////////

function changePage(ref){
	// Show the new page, remove the old
	$('.tab-content ' + ref).show().siblings().hide();

	// Highlight the new page tab, remove highlight for the old tab
	var index = ref.replace('#tab','');
	$('.tab-links li').eq(index-1).addClass('active').siblings().removeClass('active');
}

function showData(userdata, search_name, searchOption){
	if(search_name !== 'undefined'){
		if(sessionStorage.ref == '#tab1'){showData_customer(userdata, search_name)};
		if(sessionStorage.ref == '#tab2'){showData_orders(userdata, search_name)};
		if(sessionStorage.ref == '#tab3'){showData_ordersacc(userdata, search_name)};	
		if(sessionStorage.ref == '#tab4'){showData_dresses(userdata, search_name, searchOption)};
		if(sessionStorage.ref == '#tab5'){showData_accessories(userdata, search_name, searchOption)};
		if(sessionStorage.ref == '#tab6'){showData_bookings(userdata, search_name)};
	}else{
		if(sessionStorage.ref == '#tab1'){showData_customer(userdata)};
		if(sessionStorage.ref == '#tab2'){showData_orders(userdata)};	
		if(sessionStorage.ref == '#tab3'){showData_ordersacc(userdata)};	
		if(sessionStorage.ref == '#tab4'){showData_dresses(userdata)};	
		if(sessionStorage.ref == '#tab5'){showData_accessories(userdata)};
		if(sessionStorage.ref == '#tab6'){showData_bookings(userdata)};
	}
}

function getParameters(thisObj){
	var orderID = thisObj.attr("name");
	
	if(sessionStorage.ref == '#tab1'){
		var type = 'people';
		var typeRef = 'C';
		var names = ['first_name', 'last_name', 'wedding_dress1', 'wedding_dress2', 'wedding_dress3', 'Information', 'created'];	
	}else if(sessionStorage.ref == '#tab2'){
		var type = 'orders';
		var typeRef = 'O';
		var names = ['name','order_number','dress','import_price','sale_price','tracking','order_date','due_date','arrival_date'];
	}else if(sessionStorage.ref == '#tab3'){
		var type = 'ordersacc';
		var typeRef = 'OA';
		var names = ['name','accessory','import_price','sale_price','order_date'];
	}else if(sessionStorage.ref == '#tab4'){
		var type = 'dresses';
		var typeRef = 'D';
		var names = ['name','dress_code','purchase_price','sale_price'];
	}else if(sessionStorage.ref == '#tab5'){
		var type = 'accessories';
		var typeRef = 'A';
		var names = ['name','accessory_code','sale_price','purchase_price', 'stock'];
	}else if(sessionStorage.ref == '#tab6'){
		var type = 'bookings';
		var typeRef = 'B';
		var names = ['name','phone_number', 'email','information', 'wedding_date'];
	}

	var id = $('.field' + orderID + ' .data' + typeRef + '1').attr('name');

	var array = {
		id: id,
		type: type,
		typeRef: typeRef,
		names: names,
		orderID: orderID
	}

	return array;
}