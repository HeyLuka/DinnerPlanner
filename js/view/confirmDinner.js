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
}
