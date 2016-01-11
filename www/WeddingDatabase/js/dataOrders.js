function dataOrders(userdata){
	showData_orders(userdata); // Initialize table

	///////////// Edit Event ///////////////
	
	$(document).on('click', '.edit_button_orders', function(){
		var orderID = $(this).attr("name");
		
		$('.field' + orderID +' .dataO2').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataO2').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataO3').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataO3').text()) +'" style="width:100px;">');
		var currentValue = $.trim($('.field' + orderID +' .dataO4').text());
		
		$.ajax({
			type: "POST",
			url: 'php/dataLoad.php',
			data: {userdata: userdata, dress: currentValue, type: 1},
			
			success: function (data) {
				var Dresses = JSON.parse(data);
				$('.field' + orderID +' .dataO4').html('<select id="select"></select>');
				for(i=0 ; i< Dresses[0].length ; i++){
					
					var newOption = $('<option>');
					newOption.attr('value', Dresses[0][i]).text(Dresses[1][i]);
					
					$('#select').append(newOption);   // append option to select list
				}
				
				$("#select > [value=" + (Dresses[2]) + "]").attr("selected", "true");  // Select option
			},
			cache: false
		});
	
		$('.field' + orderID +' .dataO5').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataO5').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataO6').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataO6').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataO7').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataO7').text()) +'" style="width:100px;">');
		
		$('.field' + orderID +' .dataO8').html('<input type="date" name="due_date" id="due_date" min="2000-01-01" value= "'+ $.trim($('.field' + orderID +' .dataO8').text()) +'" style="width:100px;"></input>')
		$('.field' + orderID +' .dataO9').html('<input type="date" name="due_date" id="due_date" min="2000-01-01" value= "'+ $.trim($('.field' + orderID +' .dataO9').text()) +'" style="width:100px;"></input>')
		$('.field' + orderID +' .dataO10').html('<input type="date" name="due_date" id="due_date" min="2000-01-01" value= "'+ $.trim($('.field' + orderID +' .dataO10').text()) +'" style="width:100px;"></input>')

		$('.field' + orderID +' .dataO_sav').html('<input type="submit" name="' + orderID + '" value="Save" class="save_button">');
	});
	

};


function showData_orders(userdata, search_name){
	var type = 'orders';

	if(sessionStorage.getItem("order_name2") === null){
		var order_name = 'id';
	}else{
		var order_name = sessionStorage.order_name2;
	}

	$.ajax({
		type: "POST",
		url: 'php/data.php',
		data: {userdata: userdata, type: type, search_name: search_name, order_name: order_name},
		
		success: function (data) {
			var Data = JSON.parse(data);			
			$('#DataTable2 tbody').html(' ');
			var value = Data.length;
			for(i=0 ; i< Data.length ; i++){
				$('#DataTable2 tbody').append(
				'<tr class="field' + value + '">' +
				'<td name= "'+ Data[i][0] +'" class="dataO1"> '+  value      +'</td>' +
				'<td class="dataO2"> '+ Data[i][1]  +' </td>' +
				'<td class="dataO3"> '+ Data[i][2]  +' </td>' +
				'<td class="dataO4"> '+ Data[i][3]  +' </td>' +
				'<td class="dataO5"> '+ Data[i][4] +' </td>' +
				'<td class="dataO6"> '+ Data[i][5] +' </td>' +
				'<td class="dataO7"> '+ Data[i][6]  +' </td>' +
				'<td class="dataO8"> '+ Data[i][7]  +' </td>' +
				'<td class="dataO9"> '+ Data[i][8]  +' </td>' +
				'<td class="dataO10"> '+ Data[i][9]  +' </td>' +
				'<td class="dataO_del"> <input type="submit" name="' + value+ '" value="Delete" class="delete_button"> </td>' +
				'<td class="dataO_sav"> <input type="submit" name="' + value + '" value="Edit" class="edit_button_orders"> </td>' +
				'</tr>'    
				); 
				value--;
			}
		},
		cache: false
	});
	
}