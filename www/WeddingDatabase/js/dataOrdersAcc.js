function dataOrdersacc(userdata){
	showData_ordersacc(userdata); // Initialize table	

	$(document).on('click', '.edit_button_ordersAcc', function(){
		var orderID = $(this).attr("name");
		
		$('.field' + orderID +' .dataOA2').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataOA2').text()) +'" style="width:100px;">');
		var currentValue = $.trim($('.field' + orderID +' .dataOA3').text());
		
		$.ajax({
			type: "POST",
			url: 'php/dataLoad.php',
			data: {userdata: userdata, dress: currentValue, type: 3},
			
			success: function (data) {
				var Accessories = JSON.parse(data);
				$('.field' + orderID +' .dataOA3').html('<select id="select"></select>');
				for(i=0 ; i< Accessories[0].length ; i++){
					
					var newOption = $('<option>');
					newOption.attr('value', Accessories[0][i]).text(Accessories[1][i]);
					
					$('#select').append(newOption);   // append option to select list
				}
				
				$("#select > [value=" + (Accessories[2]) + "]").attr("selected", "true");  // Select option
			},
			cache: false
		});

		$('.field' + orderID +' .dataOA4').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataOA4').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataOA5').html('<input type="number" value="'+ $.trim($('.field' + orderID +' .dataOA5').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataOA6').html('<input type="date" value="'+ $.trim($('.field' + orderID +' .dataOA6').text()) +'" style="width:100px;">');
		
		$('.field' + orderID +' .dataOA_sav').html('<input type="submit" name="' + orderID + '" value="Save" class="save_button">');
	});

};


function showData_ordersacc(userdata, search_name){
	var type = 'ordersacc';

	if(sessionStorage.getItem("order_name3") === null){
		var order_name = 'id';
	}else{
		var order_name = sessionStorage.order_name3;
	}

	$.ajax({
		type: "POST",
		url: 'php/data.php',
		data: {userdata: userdata, type: type, search_name: search_name, order_name:order_name},
		
		success: function (data) {
			var Data = JSON.parse(data);			
			$('#DataTable3 tbody').html(' ');
			var value = Data.length;
			for(i=0 ; i< Data.length ; i++){
				$('#DataTable3 tbody').append(
				'<tr class="field' + value + '">' +
				'<td name= "'+ Data[i][0] +'" class="dataOA1"> '+  value      +'</td>' +
				'<td class="dataOA2"> '+ Data[i][1]  +' </td>' +
				'<td class="dataOA3"> '+ Data[i][2]  +' </td>' +
				'<td class="dataOA4"> '+ Data[i][3]  +' </td>' +
				'<td class="dataOA5"> '+ Data[i][4] +' </td>' +
				'<td class="dataOA6"> '+ Data[i][5] +' </td>' +
				'<td class="dataOA_del"> <input type="submit" name="' + value+ '" value="Delete" class="delete_button"> </td>' +
				'<td class="dataOA_sav"> <input type="submit" name="' + value + '" value="Edit" class="edit_button_ordersAcc"> </td>' +
				'</tr>'    
				); 
				value--;
			}
		},
		cache: false
	});
	
}