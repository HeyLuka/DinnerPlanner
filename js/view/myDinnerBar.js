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

	// Functions to be handled in this page
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.text(model.numberOfGuests);

	// Filter the contents and then list all available dishes
	this.dishesList = container.find("#dishesList");
	this.dishesList.html('<div id="dish-example" class="col-xs-4" style="margin-top: 20px; text-align: center"><img src="images/bakedbrie.jpg" class="img-circle" alt="Dish-example, bakedbrie" width="100" height="100"><h2>Heading</h2><p>Brief description about the example dish.</p></div>');

}