// Constructor of the page which shows the detailed menu information.
var PrintRecipe = function(container) {
	// Get all the relavant items that would be used in the view
	this.myDinner_bar = container.find("#myDinner-bar");
	this.selectDish_panel = container.find("#selectDish-panel");
	this.dishInfo_panel = container.find("#dishInfo-panel");
	this.confirmDinner_page = container.find("#confirmDinner-page");

	this.myDinner_bar.hide();
	this.selectDish_panel.hide();
	this.dishInfo_panel.hide();
	this.confirmDinner_page.hide();
}