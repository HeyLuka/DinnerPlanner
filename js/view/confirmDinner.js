// Constructor of the page where users would confirm their dinner menus.
var ConfirmDinner = function(container) {
	// Get all the relavant items that would be used in this view.
	this.myDinner_bar = container.find("#myDinner-bar");
	this.selectDish_panel = container.find("#selectDish-panel");
	this.dishInfo_panel = container.find("#dishInfo-panel");
	this.printoutMenu_page = container.find('#printoutMenu-page');

	this.myDinner_bar.hide();
	this.selectDish_panel.hide();
	this.dishInfo_panel.hide();
	this.printoutMenu_page.hide();

	this.myMenu_detail = container.find("#myMenu-detail");

	for(key in model.dishes) {
		var dish_instance = document.createElement('div');
		$(dish_instance).attr({"class": "col-xs-4", "id": "dish-example"});
		$(dish_instance).attr({"style": "height: 250px; display: block; margin-top: 20px; text-align: center"});
		var dish_instance_img = document.createElement('img');
		$(dish_instance_img).attr({"src": "images/"+model.getDish(model.dishes[key].id)["image"]});
		$(dish_instance_img).attr({"class": "img-circle", "alt": "Dish-instance", "width": "100", "height": "100"});
		var dish_instance_name = document.createElement('h3');
		$(dish_instance_name).text(model.getDish(model.dishes[key].id)["name"]);
		var dish_instance_desc = document.createElement('p');
		$(dish_instance_desc).attr("style", "text-align: left")
		// $(dish_instance_desc).text(model.getDish(model.dishes[key].id)["description"]);
		var temp_string = model.getDish(model.dishes[key].id)["description"];
		if(temp_string.length > 120){
			temp_string = temp_string.substring(0,120)+"...";
		}
		$(dish_instance_desc).text(temp_string);

		this.myMenu_detail.append(dish_instance);
		$(dish_instance).append(dish_instance_img);
		$(dish_instance).append(dish_instance_name);
		$(dish_instance).append(dish_instance_desc);

	}
}
