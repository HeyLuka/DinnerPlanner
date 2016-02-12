// navigationBar Object constructor
var NavigationBar = function(container) {
	// Get all relavant elements of the view
	this.mainHeader = container.find("#main-header");
	this.subHeader = container.find("#sub-header");

	// Define the layout of the navigation bar and set the hyperlink which is linked back to home page
	var link_to_home = document.createElement("a");
	$(link_to_home).attr("href", "./index.html");

	// Fill the content in the navigation Bar
	$(link_to_home).text("HOMELETTE");
	this.mainHeader.append(link_to_home);
	// this.mainHeader.html("HOMELETTE");
	this.subHeader.html("From the best chefs in the world directly into your kitchen");
}