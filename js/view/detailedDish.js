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

	var dish_desc_title = document.createElement('h3');
	var dish_id = id;
	$(dish_desc_title).text(model.getDish(dish_id).name);
	var dish_desc_image = document.createElement('img');
	$(dish_desc_image).attr({"src": "./images/"+model.getDish(dish_id).image});
	var dish_desc_words = document.createElement('p');
	$(dish_desc_words).text(model.getDish(dish_id).description);

	this.dish_description.append(dish_desc_title);
	this.dish_description.append(dish_desc_image);
	this.dish_description.append(dish_desc_words);

	// show ingredients list related with this dish
	for(index in model.getDish(dish_id).ingredients){
		var dish_inge_instance = document.createElement('tr');


		var instance_name = document.createElement('td');
		$(instance_name).text(model.getDish(dish_id).ingredients[index].name);
		var instance_amount = document.createElement('td');
		$(instance_amount).attr("class", "instance_amount");
		$(instance_amount).html(model.getDish(dish_id).ingredients[index].quantity*model.numberOfGuests/4.0 + " " + model.getDish(dish_id).ingredients[index].unit);
		var instance_currency = document.createElement('td');
		$(instance_currency).html('<td>SEK</td>');
		var instance_price = document.createElement('td');
		$(instance_price).attr("class", "instance_price");
	 	$(instance_price).html(model.getDish(dish_id).ingredients[index].price*model.numberOfGuests/4.0);

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
	$(total_price).append(total_price_amount);
	$(total_price).append(total_price_unit);
	this.dish_ingredient_table_tbody.append(total_price);

	this.pending_price.html(model.getDishPrice(dish_id));
	this.pending_row.addClass("info");

	this.detailed_price.html(model.getDishPrice(dish_id) + model.getTotalMenuPrice());


	model.addObserver(this);

	this.update = function(argv){
		switch (argv) {
			case "changeNumberofGuests":
				for(var key=0; key<$(".instance_amount").length; key++){
					// $(".instance_amount")[key].html(instance_amount)*model.numberOfGuests/4.0;
					$(".instance_amount")[key].innerHTML = model.getDish(dish_id).ingredients[key].quantity*model.numberOfGuests/4.0 + " " + model.getDish(dish_id).ingredients[key].unit;
					$(".instance_price")[key].innerHTML = model.getDish(dish_id).ingredients[key].price*model.numberOfGuests/4.0;
				}	
				$(".instance_total_price")[0].innerHTML = model.getDishPrice(dish_id);
				var current_pending_price = $("#pending-menu-price").html();
				if (current_pending_price!=0){
					$("#pending-menu-price").html(model.getDishPrice(dish_id));
					$("#detailed-price").html(model.getDishPrice(dish_id) + model.getTotalMenuPrice());
				}
				else{
					$("#detailed-price").html(model.getTotalMenuPrice());
				}
			}

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
