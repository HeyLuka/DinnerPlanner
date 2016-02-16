// Constructor of my dinner bar shown in the left side of the page
var MyDinnerBar = function(container) {
	// Get all relevant elements of the view
	// this.main_content = container.find("#myDinner-bar");
	this.myDinner_bar = container.find("#myDinner-bar");
	this.selectDish_panel = container.find("#selectDish-panel");

	// Define the layout of myDinner Bar

	// Try hidding components that is not used in this page
	//this.myDinner_bar.hide();
	//this.main_content.hide();
	// this.selectDish_panel.hide();
	this.dishInfo_panel = container.find("#dishInfo-panel");
	this.dishInfo_panel.hide();
	this.confirmDinner_page = container.find("#confirmDinner-page");
	this.confirmDinner_page.hide();
	this.printoutMenu_page = container.find("#printoutMenu-page");
	this.printoutMenu_page.hide();

	alert(model.getAllDishes());

	// Functions to be handled in this page
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.text(model.numberOfGuests);

	// Filter the contents and then list all available dishes
	this.dishesList = container.find("#dishesList");
	// this.dishesList.html('<div id="dish-example" class="col-xs-4" style="margin-top: 20px; text-align: center"><img src="images/bakedbrie.jpg" class="img-circle" alt="Dish-example, bakedbrie" width="100" height="100"><h2>Heading</h2><p>Brief description about the example dish.</p></div>');
	for(key in model.getAllDishes()) {
		var dish_instance = document.createElement('div');
		$(dish_instance).attr({"class": "col-xs-4", "id": "dish-example"});
		$(dish_instance).attr({"style": "margin-top: 20px; text-align: center"});
		var dish_instance_img = document.createElement('img');
		$(dish_instance_img).attr({"src": "images/"+model.getDish(key)["img"]});
		$(dish_instance_img).attr({"class": "img-circle", "alt": "Dish-instance", "width": "100", "height": "100"});
		var dish_instance_name = document.createElement('h2');
		$(dish_instance_name).text(model.getDish(key)["name"]);
		var dish_instance_desc = document.createElement('p');	
		$(dish_instance_desc).text(model.getDish(key)["description"]);

		this.dishesList.append(dish_instance);
		$(dish_instance).append(dish_instance_img);
		$(dish_instance).append(dish_instance_name);
		$(dish_instance).append(dish_instance_desc);

	}	

}