function dataAccessories(userdata){
	showData_accessories(userdata); // Initialize table

	///////////// Edit Event ///////////////
	
	$(document).on('click', '.edit_button_accessories', function(){ 
		var orderID = $(this).attr("name");
		
		$('.field' + orderID +' .dataA2').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataA2').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataA3').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataA3').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataA4').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataA4').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataA5').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataA5').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataA6').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataA6').text()) +'" style="width:100px;">');
		
		$('.field' + orderID +' .dataA_sav').html('<input type="submit" name="' + orderID + '" value="Save" class="save_button">');
	});	

};

function showData_accessories(userdata, search_name, searchOption){
	var type = 'accessories';

	if(sessionStorage.getItem("order_name5") === null){
		var order_name = 'id';
	}else{
		var order_name = sessionStorage.order_name5;
	}
	
	$.ajax({
		type: "POST",
		url: 'php/data.php',
		data: {userdata: userdata, type: type, search_name: search_name, searchOption: searchOption, order_name:order_name},
		
		success: function (data) {
			var Data = JSON.parse(data);			
			$('#DataTable5 tbody').html(' ');
			var value = Data.length;
			for(i=0 ; i< Data.length ; i++){
				$('#DataTable5 tbody').append(
				'<tr class="field' + value + '">' +
				'<td name= "'+ Data[i][0] +'" class="dataA1"> '+  value      +'</td>' +
				'<td class="dataA2"> '+ Data[i][1]  +' </td>' +
				'<td class="dataA3"> '+ Data[i][2]  +' </td>' +
				'<td class="dataA4"> '+ Data[i][3]  +' </td>' +
				'<td class="dataA5"> '+ Data[i][4]  +' </td>' +
				'<td class="dataA6"> '+ Data[i][5]  +' </td>' +
				'<td class="dataA_del"> <input type="submit" name="' + value + '" value="Delete" class="delete_button"> </td>' +
				'<td class="dataA_sav"> <input type="submit" name="' + value + '" value="Edit" class="edit_button_accessories"> </td>' +
				'</tr>'    
				); 
				value--;
			}
		},
		cache: false
	});
	
}