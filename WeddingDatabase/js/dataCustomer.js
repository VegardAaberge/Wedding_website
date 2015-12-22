function dataCustomer(userdata){

	showData_customer(userdata); // Initialize table
	
	///////////// Edit Event ///////////////
	
	$(document).on('click', '.edit_button_customer', function(){ 
		var orderID = $(this).attr("name"); 
		$('.field' + orderID +' .dataC2').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataC2').text()) +'" style="width:100px;">');
		$('.field' + orderID +' .dataC3').html('<input type="text" value="'+ $.trim($('.field' + orderID +' .dataC3').text()) +'" style="width:100px;">');
		
		var currentDress = [$.trim($('.field' + orderID +' .dataC4').text()),
		$.trim($('.field' + orderID +' .dataC5').text()),
		$.trim($('.field' + orderID +' .dataC6').text())]

		$.ajax({
			type: "POST",
			url: 'php/dataLoad.php',
			data: {userdata: userdata, dress: currentDress, type: 2},
			
			success: function (data) {
				var Dresses = JSON.parse(data);
				
				for(j=4 ; j< 7 ; j++){
					$('.field' + orderID +' .dataC'+j).html('<select id="select' + j + '"></select>');
					for(i=0 ; i< Dresses[0].length ; i++){
						
						var newOption = $('<option>');
						newOption.attr('value', Dresses[0][i]).text(Dresses[1][i]);
						
						$('#select'+j).append(newOption);   // append option to select list
					}
					
				$("#select" + j + "> [value=" + (Dresses[2][j-4]) + "]").attr("selected", "true");  // Select option
				}

			},
			cache: false
		});

		$('.field' + orderID +' .dataC7').html('<textarea rows="3" style="width:250px;">'+ $.trim($('.field' + orderID +' .dataC7').text()) +'</textarea>');
		$('.field' + orderID +' .dataC8').html('<input style="width:130px;" type="date" name="due_date" id="due_date" min="2000-01-01" value= "'+ $.trim($('.field' + orderID +' .dataC8').text()) +'" style="width:100px;"></input>');
		$('.field' + orderID +' .dataC_sav').html('<input type="submit" name="' + orderID + '" value="Save" class="save_button">');
	});
};	

function showData_customer(userdata, search_name){
	var type = 'people';
	
	if(sessionStorage.getItem("order_name1") === null){
		var order_name = 'id';
	}else{
		var order_name = sessionStorage.order_name1;
	}

	$.ajax({
		type: "POST",
		url: 'php/data.php',
		data: {userdata: userdata, type: type, search_name: search_name, order_name: order_name},
		
		success: function (data) {
			var Data = JSON.parse(data);			
			$('#DataTable tbody').html(' ');
			var value = Data.length;
			for(i=0 ; i< Data.length ; i++){
				$('#DataTable tbody').append(
				'<tr class="field' + value + '">' +
				'<td name= "'+ Data[i][0] +'" class="dataC1"> '+  value      +'</td>' +
				'<td class="dataC2"> '+ Data[i][1]  +' </td>' +
				'<td class="dataC3"> '+ Data[i][2]  +' </td>' +
				'<td class="dataC4"> '+ Data[i][3]  +' </td>' +
				'<td class="dataC5"> '+ Data[i][4]  +' </td>' +
				'<td class="dataC6"> '+ Data[i][5]  +' </td>' +
				'<td class="dataC7"> <div style="width: 250px"> '+ Data[i][6] + '</div>  </td>' +
				'<td class="dataC8"> '+ Data[i][7]  +' </td>' +
				'<td class="dataC_del"> <input type="submit" name="' + value + '" value="Delete" class="delete_button"> </td>' +
				'<td class="dataC_sav"> <input type="submit" name="' + value + '" value="Edit" class="edit_button_customer"> </td>' +
				'</tr>'    
				); 
				value--;
			}
		},
		cache: false
	});
	
}