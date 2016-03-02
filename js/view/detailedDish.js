// Constructor of the page which returns users the detailed information about a single dish.
var DetailedDish = function(container, id) {
	// Get all relavant elements of the view
	this.main_content = container.find("#main-content");
	this.selectDish_panel = container.find("#selectDish-panel");
	this.selectDish_panel.hide();

	this.confirm_dish = container.find("#confirm-dish");

	// try hidding components that is not used in this page
	//this.mydinner_bar.hide();
	//this.main_content.hide();
	// this.selectdish_panel.hide();
	// this.dishInfo_panel.hide();
	this.confirmDinner_page = container.find("#confirmDinner-page");
	this.confirmDinner_page.hide();
	this.printoutMenu_page = container.find("#printoutMenu-page");
	this.printoutMenu_page.hide();

	// Show the essential components in this page
	this.dishInfo_panel = container.find("#dishInfo-panel");
	this.dishInfo_panel.show();

	$(this.dishInfo_panel).attr("key", id);

	// Functions to be handled in this page
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.text(model.numberOfGuests);

	this.dish_description = container.find("#dish-description");
	this.dish_ingredient_table_tbody = container.find("#dish-ingredient-tbody");
	this.dish_ingredient_table_tfoot = container.find("#dish-ingredient-tfoot");
	this.dish_preparation = container.find("#dish-preparation");

	this.pending_price = container.find("#pending-menu-price");
	this.pending_row = container.find("#pending-menu-row");

	this.detailed_price = container.find("#detailed-price");


	this.dish_description.empty();
	this.dish_ingredient_table_tbody.empty();
	// this.dish_ingredient_table_tfoot.empty();

	this.people_num = container.find("#people-num");
	this.people_num.html(model.getNumberOfGuests());

	var dish_desc_title = document.createElement('h3');
	var dish_id = id;
	$(dish_desc_title).text(model.getDish(dish_id).name);
	var dish_desc_image = document.createElement('img');
	$(dish_desc_image).attr({"style": "width: 120px; height: 120px"});
	$(dish_desc_image).attr({"src": model.getDish(dish_id).image});
	var dish_desc_words = document.createElement('p');
	$(dish_desc_words).text(model.getDish(dish_id).description);

	this.dish_description.append(dish_desc_title);
	this.dish_description.append(dish_desc_image);
	this.dish_description.append(dish_desc_words);

	// show ingredients list related with this dish
	for(var index in model.getDish(dish_id).ingredients){
		var dish_inge_instance = document.createElement('tr');


		var instance_name = document.createElement('td');
		$(instance_name).text(model.getDish(dish_id).ingredients[index].Name);
		var instance_amount = document.createElement('td');
		$(instance_amount).attr("class", "instance_amount");

		var instance_currency = document.createElement('td');
		$(instance_currency).html('<td>SEK</td>');
		var instance_price = document.createElement('td');
		$(instance_price).attr("class", "instance_price");

		var ingredientsAmount = model.getDish(dish_id).ingredients[index].Quantity*model.numberOfGuests;

		$(instance_amount).html(fixNumber(ingredientsAmount)+" "+model.getDish(dish_id).ingredients[index].Unit);
		$(instance_price).html(fixNumber(ingredientsAmount));
		//$(instance_amount).html(model.getDish(dish_id).ingredients[index].quantity*model.numberOfGuests + " " + model.getDish(dish_id).ingredients[index].unit);



	 	//$(instance_price).html(model.getDish(dish_id).ingredients[index].Quantity*model.numberOfGuests);

		$(dish_inge_instance).append(instance_amount);
		$(dish_inge_instance).append(instance_name);
		$(dish_inge_instance).append(instance_currency);
		$(dish_inge_instance).append(instance_price);

		this.dish_ingredient_table_tbody.append(dish_inge_instance);
	}

	var total_price = document.createElement('tr');
	var total_price_title = document.createElement('td');
	$(total_price_title).html('<b>Total: </b>');
	$(total_price_title).attr("colspan", 2);
	var total_price_unit = document.createElement('td');
	$(total_price_unit).html("SEK");
	var total_price_amount = document.createElement('td');
	$(total_price_amount).attr("class", "instance_total_price");
	$(total_price_amount).html(model.getDishPrice(dish_id));
	$(total_price).append(total_price_title);
	$(total_price).append(total_price_unit);
	$(total_price).append(total_price_amount);

	this.dish_ingredient_table_tbody.append(total_price);



	// var temporary_price = model.getDishPriceFromMenu(dish_id);
	// var temporary_price_string = temporary_price.toString();
	// var decimalIndex=temporary_price_string.indexOf('.');
	// if((decimalIndex == '-1') || (temporary_price_string.substring(decimalIndex+1,temporary_price_string.length).length < 5)){
	// 	this.pending_price.html(temporary_price);
	// }else{
	// 	this.pending_price.html(temporary_price.toFixed(2));
	// }

	// setting the pending bar at the detailed dish information page
	this.pending_price.html(model.getDishPrice(dish_id));
	this.pending_row.addClass("info");

	// set the temporary total price shown in the left menu bar
	this.temporary_total_price = model.getDishPrice(dish_id) + model.getTotalMenuPrice();
	for(var key in model.menu){
		if(model.getDish(model.menu[key]).type == model.getDish(id).type){
			// this.removeDishFromMenu(this.menu[key]);
			this.temporary_total_price = model.getTotalMenuPrice() - model.getDishPriceFromMenu(model.menu[key]) + model.getDishPrice(id);
			break;
		}
	}
	// this.detailed_price.html(model.getDishPrice(dish_id) + model.getTotalMenuPrice());
	this.detailed_price.html(fixNumber(this.temporary_total_price));

	this.current_total_price = null;

	for(var key=0; key<$(".r_button").length; key++){
		if (model.getDish(model.menu[key]).type == model.getDish(id).type){
			$($(".r_button")[key]).parent().parent().addClass("warning");
		}
	}


	model.addObserver(this);

	this.update = function(argv){
		switch (argv) {
			case "changeNumberofGuests":
				for(var key=0; key<$(".instance_amount").length; key++){
					// $(".instance_amount")[key].html(instance_amount)*model.numberOfGuests;
					var ingredientsAmount = model.getDish(dish_id).ingredients[key].Quantity*model.numberOfGuests;
					$(".instance_amount")[key].innerHTML = fixNumber(ingredientsAmount) + " " + model.getDish(dish_id).ingredients[key].Unit;
					//$(".instance_amount")[key].innerHTML = (model.getDish(dish_id).ingredients[key].quantity*model.numberOfGuests).toFixed(2) + " " + model.getDish(dish_id).ingredients[key].unit;
					$(".instance_price")[key].innerHTML = fixNumber(ingredientsAmount);
				}
				$(".instance_total_price")[0].innerHTML = model.getDishPrice(dish_id);
				var current_pending_price = $("#pending-menu-price").html();
				if (current_pending_price!=0){
					$("#pending-menu-price").html(model.getDishPrice(dish_id));
					// var current_total_price;
					console.log("change current price.");
					this.current_total_price = model.getTotalMenuPrice() + model.getDishPrice(dish_id);
					for(var key=0; key<$(".r_button").length; key++){
						if (model.getDishFromMenu(model.menu[key]).type == model.getDish(dish_id).type){
							$($(".r_button")[key]).parent().parent().addClass("warning");
							this.current_total_price = model.getTotalMenuPrice() - model.getDishPriceFromMenu(model.menu[key]) + model.getDishPrice(dish_id);
						}
					}


					// for(var key in model.menu){
					// 	if(model.getDish(model.menu[key]).type == model.getDish(id).type){
					// 		// this.removeDishFromMenu(this.menu[key]);
					// 		this.current_total_price = model.getTotalMenuPrice() - model.getDishPrice(model.menu[key]) + model.getDishPrice(id);
					// 		// this.temporary_total_price = model.getTotalMenuPrice() - model.getDishPrice(model.menu[key]) + model.getDishPrice(id);
					// 	break;
					// 	}
					// }
					this.detailed_price.html(fixNumber(this.current_total_price));
					// $("#detailed-price").html(model.getDishPrice(dish_id) + model.getTotalMenuPrice());
				}
				else{
					$("#detailed-price").html(fixNumber(model.getTotalMenuPrice()));
				}
			}
			$("#people-num").html(model.getNumberOfGuests());

	}

	// show preparation steps related with this dish
}

var DetailedDishController = function(view, model){
	view.confirm_dish.click(function(){
		/*view.selectdish_panel.show();
		view.dishInfo_panel.hide();
		//alert(1);
		model.addDishToMenu(view.dishInfo_panel.key);
		model.notifyObservers("updateMyMenu");*/
		//alert("haha");
		$("#pending-menu-row").removeClass("info");
		$("#pending-menu-price").html(0.00);
		$("#selectDish-panel").show();
		model.addDishToMenu($("#dishInfo-panel").attr("key"))
		model.notifyObservers("updateMyMenu");
		$("#dishInfo-panel").hide();
	});


}
