// Constructor of the page which shows the detailed menu information.
var PrintRecipe = function(container) {
	// Get all the relavant items that would be used in the view
	this.myDinner_bar = container.find("#myDinner-bar");
	this.selectDish_panel = container.find("#selectDish-panel");
	this.dishInfo_panel = container.find("#dishInfo-panel");
	this.confirmDinner_page = container.find("#confirmDinner-page");
	this.printoutMenu_page = container.find("#printoutMenu-page");

	this.myDinner_bar.hide();
	this.selectDish_panel.hide();
	this.dishInfo_panel.hide();
	this.confirmDinner_page.hide();
	this.printoutMenu_page.show();
	// this.printoutMenu_page.empty();

	this.goBack_editDinner2 = container.find("#goBack-editDinner2");

	this.numberofGuests3 = container.find("#numberofGuests3");
	this.numberofGuests3.text(model.numberOfGuests);

	this.printoutMenu_info = container.find("#printoutMenu-info");
	this.printoutMenu_info.empty();
	for(var key in model.menu){
		var dish_instance = document.createElement('div');
		$(dish_instance).attr({"class": "col-xs-12 printout-menu-example", "id": "printoutMenu-example"});
		var dish_instance_img_div = document.createElement('div');
		$(dish_instance_img_div).attr({"class": "col-xs-2"});
		var dish_instance_img = document.createElement('img');
		$(dish_instance_img).attr({"src": model.getDishFromMenu(model.menu[key])["image"]});
		$(dish_instance_img).attr({"class": "img-circle", "alt": "Dish-instance", "width": "100", "height": "100"});
		$(dish_instance_img_div).append(dish_instance_img);
		var dish_instance_desc_div = document.createElement('div');
		$(dish_instance_desc_div).attr({"id": "printoutDish-description", "class": "col-xs-2"});
		var dish_instance_desc_h4 = document.createElement('h4');
		$(dish_instance_desc_h4).text("LASAGNE");
		var dish_instance_desc_p = document.createElement('p');
		var temp_string = model.getDishFromMenu(model.menu[key])["description"];
		if(temp_string.length > 120){
			temp_string = temp_string.substring(0,60)+"...";
		}
		$(dish_instance_desc_p).text(temp_string);
		$(dish_instance_desc_div).append(dish_instance_desc_h4);
		$(dish_instance_desc_div).append(dish_instance_desc_p);
		var dish_instance_preparation_div = document.createElement('div');
		$(dish_instance_preparation_div).attr({"id": "printoutDish-preparation","class": "col-xs-5"});
		var dish_instance_preparation_h4 = document.createElement('h4');
		$(dish_instance_preparation_h4).text("PREPARATION");
		var dish_instance_preparation_p = document.createElement('p');
		$(dish_instance_preparation_p).text(model.getDishFromMenu(model.menu[key]).preparation);
		$(dish_instance_preparation_div).append(dish_instance_preparation_h4);
		$(dish_instance_preparation_div).append(dish_instance_preparation_p);

		$(dish_instance).append(dish_instance_img_div);
		$(dish_instance).append(dish_instance_desc_div);
		$(dish_instance).append(dish_instance_preparation_div);

		this.printoutMenu_info.append(dish_instance);

	}
}

var PrintRecipeController = function(view, model){
	view.goBack_editDinner2.click(function(){
		$("#myDinner-bar").show();
		$("#selectDish-panel").show();
		$("#printoutMenu-page").hide();
	});
}
