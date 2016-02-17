/*
$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"));

	var hey = "hey";

});
*/

//var model;



$(document).ready(function() {
	var model = new DinnerModel();

	// exampleView = new ExampleView($("#exampleView"));


	startWizard = new StartWizard($("#displayField"));
	// myDinnerBar = new MyDinnerBar($("#displayField"));
	// detailedDish = new DetailedDish($("#displayField"));
	// confirmDinner = new ConfirmDinner($("#displayField"));
	// printRecipe = new PrintRecipe($("#displayField"));
	// $("#main-content").hide();
})
