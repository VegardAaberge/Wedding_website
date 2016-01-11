function dataDresses(userdata){
	showData_dresses(userdata); // Initialize table

	///////////// Edit Event ///////////////
	
	$(document).on('click', '.edit_button_dresses', function(){ 
		var orderID = $(this).attr("name");

		$('.field' + orderID +' .dataD2').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataD2').text()) +'" style="width:100px;">');	
		$('.field' + orderID +' .dataD3').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataD3').text()) +'" style="width:100px;">');	
		$('.field' + orderID +' .dataD4').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataD4').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataD5').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataD5').text()) +'" style="width:100px;">');
		
		$('.field' + orderID +' .dataD_sav').html('<input type="submit" name="' + orderID + '" value="Save" class="save_button">');
	});	

};


function showData_dresses(userdata, search_name, searchOption){
	var type = 'dresses';

	if(sessionStorage.getItem("order_name4") === null){
		var order_name = 'id';
	}else{
		var order_name = sessionStorage.order_name4;
	}
	
	$.ajax({
		type: "POST",
		url: 'php/data.php',
		data: {userdata: userdata, type: type, search_name: search_name, searchOption: searchOption, order_name:order_name},
		
		success: function (data) {
			var Data = JSON.parse(data);			
			$('#DataTable4 tbody').html(' ');
			var value = Data.length;
			for(i=0 ; i< Data.length ; i++){
				$('#DataTable4 tbody').append(
				'<tr class="field' + value + '">' +
				'<td name= "'+ Data[i][0] +'" class="dataD1"> '+  value      +'</td>' +
				'<td class="dataD2"> '+ Data[i][1]  +' </td>' +
				'<td class="dataD3"> '+ Data[i][2]  +' </td>' +
				'<td class="dataD4"> '+ Data[i][3]  +' </td>' +
				'<td class="dataD5"> '+ Data[i][4]  +' </td>' +
				'<td class="dataD_del"> <input type="submit" name="' + value + '" value="Delete" class="delete_button"> </td>' +
				'<td class="dataD_sav"> <input type="submit" name="' + value + '" value="Edit" class="edit_button_dresses"> </td>' +
				'</tr>'    
				); 
				value--;
			}
		},
		cache: false
	});
	
}