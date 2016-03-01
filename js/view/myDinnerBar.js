// Constructor of my dinner bar shown in the left side of the page
var MyDinnerBar = function(container) {
	// Get all relevant elements of the view
	// this.main_content = container.find("#myDinner-bar");
	this.myDinner_bar = container.find("#myDinner-bar");
	this.myDinner_bar.show();
	this.selectDish_panel = container.find("#selectDish-panel");
	this.selectDish_panel.show();
	this.myMenu_totalprice = container.find("#detailed-price");

	// Define the layout of myDinner Bar

	// try hidding components that is not used in this page
	//this.mydinner_bar.hide();
	//this.main_content.hide();
	// this.selectdish_panel.hide();
	this.dishinfo_panel = container.find("#dishInfo-panel");
	this.dishinfo_panel.hide();
	this.confirmdinner_page = container.find("#confirmDinner-page");
	this.confirmdinner_page.hide();
	this.printoutmenu_page = container.find("#printoutMenu-page");
	this.printoutmenu_page.hide();

	// Functions to be handled in this page
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.show();
	this.numberOfGuests.text(model.numberOfGuests);

	// alert(model.getDish(1));
	// alert(model.getDish(model.dishes[9].id)["image"]);

	// Filter the contents and then list all available dishes
	this.dishesList = container.find("#dishesList");
	// this.dishesList.empty();
	$(this.dishesList).empty();
	this.dishesList.show();

	this.menuDish_list = container.find("#menuDishes-list");
	this.menuDish_list.empty();

	this.plusGuest = container.find("#plusGuest");
	this.minusGuest = container.find("#minusGuest");

	this.search = container.find("#search");

	// // Insert data to my Menu
	// for(var menu_key in model.menu) {
	// 	var menudish_instance = document.createElement('tr');
	// 	var instance_name = document.createElement('td');
	// 	$(instance_name).text(model.getDish(model.menu[menu_key]).name);
	// 	var instance_cost = document.createElement('td');
	// 	$(instance_cost).text(model.getDishPrice(model.menu[menu_key]));

	// 	$(menudish_instance).append(instance_name);
	// 	$(menudish_instance).append(instance_cost);
	// 	this.menuDish_list.append(menudish_instance);

	// 	this.dishesList.append(dish_instance);
	// 	$(dish_instance).append(dish_instance_img);
	// 	$(dish_instance).append(dish_instance_name);
	// 	$(dish_instance).append(dish_instance_desc);

	// }

	// // Set total price of my Menu
	// this.myMenu_totalprice.text(model.getTotalMenuPrice());




	// this.dishesList.html('<div id="dish-example" class="col-xs-4" style="margin-top: 20px; text-align: center"><img src="images/bakedbrie.jpg" class="img-circle" alt="Dish-example, bakedbrie" width="100" height="100"><h2>Heading</h2><p>Brief description about the example dish.</p></div>');
	for(var key in model.dishes) {
		var dish_instance = document.createElement('div');
		$(dish_instance).attr({"class": "col-xs-4", "id": "dish-example"});
		$(dish_instance).attr({"style": "height: 250px; display: block; margin-top: 20px; text-align: center"});
		var dish_instance_img = document.createElement('img');
		$(dish_instance_img).attr({"src": model.dishes[key].image});
		$(dish_instance_img).attr({"class": "img-circle", "alt": "Dish-instance", "width": "100", "height": "100"});
		$(dish_instance_img).attr("key", model.dishes[key].id);
		/*$(dish_instance_img).click(function(){
      //var id = $(this).attr(width);
			alert(1);
  		//var detailedDish = new DetailedDish($("#displayField"), id);
  	});*/
		$(dish_instance_img).click(showDetail);
		//$(dish_instance_img).attr("onclick", '(function(){var id = this.attr("key");var detailedDish = new DetailedDish($("#displayField"), id);})()');
		//$(dish_instance_img).click((function(){var detailedDish = new DetailedDish($("#displayField"), 2))());
		var dish_instance_name = document.createElement('h3');
		$(dish_instance_name).text(model.dishes[key].name);
		var dish_instance_desc = document.createElement('p');
		$(dish_instance_desc).attr("style", "text-align: left");
		// $(dish_instance_desc).text(model.getDish(model.dishes[key].id)["description"]);
		var temp_string = model.dishes[key].description;
		if(temp_string.length > 120){
			temp_string = temp_string.substring(0,120)+"...";
		}
		$(dish_instance_desc).text(temp_string);

		this.dishesList.append(dish_instance);
		$(dish_instance).append(dish_instance_img);
		$(dish_instance).append(dish_instance_name);
		$(dish_instance).append(dish_instance_desc);

	}



	model.addObserver(this);

	this.update = function(argv){
		switch (argv) {
			case "changeNumberofGuests":
				this.numberOfGuests.text(model.numberOfGuests);
				// Insert data to my Menu
				this.menuDish_list.empty();
				for(var menu_key in model.menu) {
					var dish_id = model.getDish(model.menu[menu_key]).id;
					var menudish_instance = document.createElement('tr');
					var instance_name = document.createElement('td');
					$(instance_name).text(model.getDish(model.menu[menu_key]).name);
					var instance_cost = document.createElement('td');
					$(instance_cost).text(model.getDishPrice(model.menu[menu_key]));
					var td_remove_button = document.createElement('td');
					var remove_button = document.createElement('button');
					$(remove_button).attr({"class": "btn btn-default btn-sm r_button"})
					$(remove_button).click(removeDish);
					var button_content = document.createElement('span');
					$(button_content).attr({"class": "glyphicon glyphicon-remove"});
					$(remove_button).attr("key", dish_id);
					$(remove_button).append(button_content);
					$(td_remove_button).append(remove_button);

					$(menudish_instance).append(instance_name);
					$(menudish_instance).append(instance_cost);
					$(menudish_instance).append(td_remove_button);
					this.menuDish_list.append(menudish_instance);


				}
				// Set total price of my Menu
				// this.myMenu_totalprice.text(model.getTotalMenuPrice());
				break;
			case "updateMyMenu":
				// Insert data to my Menu
				this.menuDish_list.empty();
				for(var menu_key in model.menu) {
					var dish_id = model.getDish(model.menu[menu_key]).id;
					var menudish_instance = document.createElement('tr');
					var instance_name = document.createElement('td');
					$(instance_name).text(model.getDish(model.menu[menu_key]).name);
					var instance_cost = document.createElement('td');
					$(instance_cost).text(model.getDishPrice(model.menu[menu_key]));
					var td_remove_button = document.createElement('td');
					var remove_button = document.createElement('button');
					$(remove_button).attr({"class": "btn btn-default btn-sm r_button"})
					$(remove_button).click(removeDish);
					var button_content = document.createElement('span');
					$(button_content).attr({"class": "glyphicon glyphicon-remove"});
					$(remove_button).attr("key", dish_id);
					$(remove_button).append(button_content);
					$(td_remove_button).append(remove_button);

					$(menudish_instance).append(instance_name);
					$(menudish_instance).append(instance_cost);
					$(menudish_instance).append(td_remove_button);
					this.menuDish_list.append(menudish_instance);


				}
				// Set total price of my Menu
				this.myMenu_totalprice.text(model.getTotalMenuPrice());
				break;
			default:

		}
	}

}

var UpdateMenuController = function(id, model){
	model.removeDishFromMenu(id);
	model.notifyObservers("updateMyMenu")
}

var MyDinnerBarController = function(view, model){
	view.plusGuest.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
		model.notifyObservers("changeNumberofGuests");
	});
	view.minusGuest.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
		model.notifyObservers("changeNumberofGuests");
	});

	view.search.click(function(){
		var filter = $("#dish-keyword").val();
		//alert(filter);
		var type = $("#dish-type").val();
		var dishesFiltered = model.getAllDishes(type, filter);
		$("#dishesList").empty();
		$("#dishesList").show();

		for(var key_new = 0; key_new < dishesFiltered.length; key_new ++) {
			var dish_instance = document.createElement('div');
			$(dish_instance).attr({"class": "col-xs-4", "id": "dish-example"});
			$(dish_instance).attr({"style": "height: 250px; display: block; margin-top: 20px; text-align: center"});
			var dish_instance_img = document.createElement('img');
			$(dish_instance_img).attr({"src": "images/"+dishesFiltered[key_new]["image"]});
			$(dish_instance_img).attr({"class": "img-circle", "alt": "Dish-instance", "width": "100", "height": "100"});
			$(dish_instance_img).attr("key", dishesFiltered[key_new].id);
			/*$(dish_instance_img).click(function(){
	      //var id = $(this).attr(width);
				alert(1);
	  		//var detailedDish = new DetailedDish($("#displayField"), id);
	  	});*/
			$(dish_instance_img).click(showDetail);
			//$(dish_instance_img).attr("onclick", '(function(){var id = this.attr("key");var detailedDish = new DetailedDish($("#displayField"), id);})()');
			//$(dish_instance_img).click((function(){var detailedDish = new DetailedDish($("#displayField"), 2))());
			var dish_instance_name = document.createElement('h3');
			$(dish_instance_name).text(dishesFiltered[key_new]["name"]);
			var dish_instance_desc = document.createElement('p');
			$(dish_instance_desc).attr("style", "text-align: left");
			// $(dish_instance_desc).text(model.getDish(model.dishes[key].id)["description"]);
			var temp_string = dishesFiltered[key_new]["description"];
			if(temp_string.length > 120){
				temp_string = temp_string.substring(0,120)+"...";
			}
			$(dish_instance_desc).text(temp_string);

			$("#dishesList").append(dish_instance);
			$(dish_instance).append(dish_instance_img);
			$(dish_instance).append(dish_instance_name);
			$(dish_instance).append(dish_instance_desc);
		}
	});
}
