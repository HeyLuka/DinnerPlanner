/*
$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"));

	var hey = "hey";

});
*/

var model;
//var dishes;

var detailedDish;
var fixNumber = function(number){
	var numberString = number.toString();
	var decimalIndex=numberString.indexOf('.');
	if((decimalIndex == '-1') || (numberString.substring(decimalIndex+1,numberString.length).length < 5)){
		return number;
	}else{
		return parseFloat(number.toFixed(2));
	}
}


$(document).ready(function() {
	model = new DinnerModel();
	//model.dishesNew = dishes;
	// exampleView = new ExampleView($("#exampleView"));


	startWizard = new StartWizard($("#displayField"));
	// myDinnerBar = new MyDinnerBar($("#displayField"));
	// detailedDish = new DetailedDish($("#displayField"));
	// confirmDinner = new ConfirmDinner($("#displayField"));
	// printRecipe = new PrintRecipe($("#displayField"));
	// $("#main-content").hide();
})
