// Constructor of my dinner bar shown in the left side of the page
var MyDinnerBar = function(container) {
	// Get all relevant elements of the view
	this.main_content = container.find("#myDinner-bar");

	// Define the layout of myDinner Bar
	var title = document.createElement("h4");
	$(title).attr("id", "dinnerBar-title");
}