function dataBookings(userdata) {
	showData_bookings(userdata); // Initialize table

	///////////// Edit Event ///////////////
	
	$(document).on('click', '.edit_button_bookings', function(){ 
		var orderID = $(this).attr("name");
		
		$('.field' + orderID +' .dataB2').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataB2').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataB3').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataB3').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataB4').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataB4').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataB5').html('<textarea rows="4" style="width:280px;">'+ $.trim($('.field' + orderID +' .dataB5').text()) +'</textarea>');
		
		$('.field' + orderID +' .dataB6').html('<input type="date" value= "'+ $.trim($('.field' + orderID +' .dataB6').text()) +'" style="width:100px;"></input>');
		
		$('.field' + orderID +' .dataB_sav').html('<input type="submit" name="' + orderID + '" value="Save" class="save_button">');
		
	});	

};


function showData_bookings(userdata, search_name){
	var type = 'bookings';

	if(sessionStorage.getItem("order_name6") === null){
		var order_name = 'id';
	}else{
		var order_name = sessionStorage.order_name6;
	}
	
	$.ajax({
		type: "POST",
		url: 'php/data.php',
		data: {userdata: userdata, type: type, search_name: search_name, order_name:order_name},
		
		success: function (data) {
			var Data = JSON.parse(data);	
			$('#DataTable6 tbody').html(' ');
			var value = Data.length;
			for(i=0 ; i< Data.length ; i++){
				$('#DataTable6 tbody').append(
				'<tr class="field' + value + '">' +
				'<td name= "'+ Data[i][0] +'" class="dataB1"> '+  value      +'</td>' +
				'<td class="dataB2"> '+ Data[i][1]  +' </td>' +
				'<td class="dataB3"> '+ Data[i][2]  +' </td>' +
				'<td class="dataB4"> '+ Data[i][3]  +' </td>' +
				'<td class="dataB5"> <div style="width: 300px"> '+ Data[i][4]  +' </div> </td>' +
				'<td class="dataB6"> '+ Data[i][5]  +' </td>' +
				'<td class="dataB7"> '+ Data[i][6]  +' </td>' +
				'<td class="dataB_del"> <input type="submit" name="' + value + '" value="Delete" class="delete_button"> </td>' +
				'<td class="dataB_sav"> <input type="submit" name="' + value + '" value="Edit" class="edit_button_bookings"> </td>' +
				'</tr>'    
				); 
				value--;
			}
		},
		cache: false
	});
	
}