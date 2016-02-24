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

	// Display all the components that would be used in this page

	// Try hidding components that is not used in this page
	this.myDinner_bar = container.find("#myDinner-bar");
	this.myDinner_bar.hide();
	//this.main_content.hide();
	this.selectDish_panel = container.find("#selectDish-panel");
	this.selectDish_panel.hide();
	this.dishInfo_panel = container.find("#dishInfo-panel");
	this.dishInfo_panel.hide();
	this.confirmDinner_page = container.find("#confirmDinner-page");
	this.confirmDinner_page.hide();
	this.printoutMenu_page = container.find("#printoutMenu-page");
	this.printoutMenu_page.hide();


	// Get all relavant elements of the view
	this.main_content = container.find("#main-content");
	this.main_content.addClass("row");
	// this.myDinner_bar = container.find("#myDinner-bar");
	// Hide MyDinnerBar in the index home page
	// this.myDinner_bar.hide();

	// Define the related layout of the start-wizard
	var wizard = document.createElement('div');
	$(wizard).attr("id", "start-wizard");
	$(wizard).addClass("col-xs-6");
	var wizard_header = document.createElement('h3');
	$(wizard_header).attr("id", "wizard-header");
	var wizard_description = document.createElement('p');
	$(wizard_description).attr("id", "wizard-description");
	var wizard_helper = document.createElement('p');
	$(wizard_helper).attr("id", "wizard-helper");
	var wizard_button = document.createElement('button');
	$(wizard_button).attr({"id": "start-button", "type": "button"});
	$(wizard_button).addClass("btn btn-primary");


	// Finish the definition about the layout, then continue do with the content filling

	$(wizard_header).html("A Home Dinner Service");
	$(wizard_description).html("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.");
	$(wizard_helper).text("quickly start");
	$(wizard_button).text("Create new dinner");
	$(wizard_button).click(quick_start);
	//$(wizard_button).bind("click", quick_start);
	//$(wizard_button).attr("onclick", '(function(){myDinnerBar = new MyDinnerBar($("#displayField")); $("#start-wizard").hide();})()');

	$(wizard).append(wizard_header);
	$(wizard).append(wizard_description);
	$(wizard).append(wizard_helper);
	$(wizard).append(wizard_button);

	this.main_content.prepend(wizard);

	// this.wizardDescription.html("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.");
}
