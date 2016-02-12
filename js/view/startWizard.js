// startWizard Object constructor
var StartWizard = function (container) {

	// Get all relavant elements of the view
	/*
	this.wizardHeader = container.find("#wizard-header");
	this.wizardDescription = container.find("#wizard-description");
	this.initializeButton = container.find("initialize-button");

	var title = $('<p></p>').text("Hello world");
	title.attr({"id": "Google"});
	this.wizardHeader.append(title);
	*/

	//this.wizardHeader.html('<a href="www.google.com">A Home Dinner Service</a>');
	// this.wizardDescription.attr("href", "http://www.google.com");
	/*
	this.wizardDescription.click(function() {
		$(this).attr({
			"href": "http://www.google.com",
			"title": "Google"
		});
	});
	*/

	// Get all relavant elements of the view
	this.main_content = container.find("#main-content");
	this.main_content.addClass("row");
	// Define the related layout of the start-wizard
	var wizard = document.createElement('div');
	$(wizard).attr("id", "start-wizard");
	$(wizard).addClass("col-xs-6");
	var wizard_header = document.createElement('h3');
	$(wizard_header).attr("id", "wizard-header");
	var wizard_description = document.createElement('p');
	$(wizard_description).attr("id", "wizard-description");
	var wizard_button = document.createElement('button');
	$(wizard_button).attr({"id": "start-button", "type": "button"});
	$(wizard_button).addClass("btn btn-primary");

	this.main_content.append(wizard);
	$(wizard).append(wizard_header);
	$(wizard).append(wizard_description);
	$(wizard).append(wizard_button);
	// Finish the definition about the layout, then continue do with the content filling

	$(wizard_header).html("A Home Dinner Service");
	$(wizard_description).html("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.");
	$(wizard_button).text("Create new dinner");



	// this.wizardDescription.html("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.");
}