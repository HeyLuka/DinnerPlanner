//DinnerModel Object constructor
var DinnerModel = function() {
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner this.menu
	this.observer = [];

	this.menu = [];
	this.menu_dishes = [];

  	//this.numberOfGuests = 6;
	this.numberOfGuests = 1;

	this.addObserver = function(observer){
		for(var key in this.observer){
			if(this.observer[key] == observer){
				return;
			}
		}
		this.observer.push(observer);
	}

	this.notifyObservers = function(argv){
		for(var key in this.observer){
			this.observer[key].update(argv);
		}
	}

	this.setNumberOfGuests = function(num) {
		//TODO Lab 2
    if(num > 0) {
      this.numberOfGuests = num;
    }

	}

	// should return
	this.getNumberOfGuests = function() {
		//TODO Lab 2
		return this.numberOfGuests;
	}

	//Returns the dish that is on the this.menu for selected type
	this.getSelectedDish = function(type) {
		//TODO Lab 2
    var selectDishMenu = [];
    for(var key in this.menu){
      if(this.dishes[this.menu[key]].Category == type){
        selectDishMenu.push(this.getDish(this.menu[key]));
      }
    }
    return selectDishMenu;
	}

	//Returns all the this.dishes on the this.menu.
	this.getFullMenu = function() {
		//TODO Lab 2
    var menuDishes = [];
    for(var key in this.menu){
      menuDishes.push(this.getDish(this.menu[key]));
    }
    return menuDishes;
	}

	//Returns all ingredients for all the this.dishes on the this.menu.
	this.getAllIngredients = function() {
		//TODO Lab 2
    var allIngredients = [];
    for(var key in this.menu){
      allIngredients = allIngredients.concat(this.getDish(this.menu[key]).ingredients);
    }
    return allIngredients;
	}

	//Returns the total price of the this.menu (all the ingredients multiplied by number of guests).
	this.getDishPrice = function(id){
		var dishPrice = 0;
		var ingredients = this.getDish(id).ingredients;
		for(var key in ingredients){
			dishPrice += ingredients[key].Quantity;
		}
		dishPrice = dishPrice*this.numberOfGuests;
		return fixNumber(dishPrice);

	}

	var th = this;
	/*this.recipe = null;
	this.getRecipe = function(id){
		var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
		var recipeID = id;
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
		$.ajax({
			type: "GET",
			dataType: 'json',
			cache: false,
			url: url,
			success: function (response) {
				th.recipe = response;
				//recipe = 2;
			//console.log(data);
			}
		});
	}*/

	/*this.getDishPrice = function(id){
		var dishPrice = 0;
		//this.getRecipe(id);
		var apiKey = "1hg3g4Dkwr6pSt22n00EfS01rz568IR6";
		var recipeID = id;
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
		$.ajax({
			type: "GET",
			dataType: 'json',
			cache: false,
			url: url,
			success: function (response) {
				//var recipe = response;
				for(var key in response.Ingredients){
					dishPrice += response.Ingredients[key].Quantity;

				}
				alert(dishPrice);
				//recipe = 2;
			//console.log(data);
			}
		});

		return dishPrice*this.numberOfGuests;
	}*/

	// Returns the price of this certain dish in the menu
	this.getDishPriceFromMenu = function(id){
		var dPrice = 0;
		var ingredients_list = this.getDishFromMenu(id).ingredients;
		for(var key in ingredients_list){
			dPrice += ingredients_list[key].Quantity;
		}
		dPrice = dPrice*this.numberOfGuests;

		return fixNumber(dPrice);
	};

	this.getTotalMenuPrice = function() {
		var totalMenuPrice = 0;
		for(var key in this.menu){
			totalMenuPrice += this.getDishPriceFromMenu(this.menu[key]);
		}

    return fixNumber(totalMenuPrice);
	}

	// get the total price including the pending dish(after replacing the one with the same type)
	// including a argument which represents the pending dish id
	/*this.getTempMenuPrice = function(id){
		var tempMenuPrice = 0;
		for(var temp_key in this.pending_menu){
			tempMenuPrice += this.getDishPrice(this.pending_menu[temp_key]);
		}
		return tempMenuPrice;
	}*/

	//Adds the passed dish to the this.menu. If the dish of that type already exists on the this.menu
	//it is removed from the this.menu and the new one added.
	this.addDishToMenu = function(id) {
		//TODO Lab 2
    for(var key in this.menu){
      if(this.menu[key] == id){
        return;
      }
    }

		for(var key in this.menu){
			if(this.getDishFromMenu(this.menu[key]).type == this.getDish(id).type){
				this.removeDishFromMenu(this.menu[key]);
				this.removeDishFromMenuDishes(this.menu[key]);
				break;
			}
		}

    this.menu.push(id);
		this.menu_dishes.push(this.getDish(id));
	}

	// virtually adds pending dish to pending menu
	/*this.addDishToPendingMenu = function(id){
		this.pending_menu = this.menu;
		for(var key in this.pending_menu){
			if(this.getDish(this.menu[key]).type == this.getDish(id).type){
				this.removeDishFromMenu(this.menu[key]);
				break;
			}
		}
	}*/

	//Removes dish from this.menu
	this.removeDishFromMenu = function(id) {

	  for(var key in this.menu){
      if(this.menu[key] == id){
        this.menu.splice(key,1);
        //window.alert("item deleted successfully!")
        break;
      }
    }
	}

	this.removeDishFromMenuDishes = function(id){
		for(var key in this.menu_dishes){
			if(this.menu_dishes[key].id == id){
				this.menu.splice(key,1);
				break;
			}
		}
	}

	//function that returns all this.dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the this.dishes will be returned
	this.apiKey = "18f3cT02U9f6yRl3OKDpP8NA537kxYKu";
	th.count = 0;
	this.getAllDishes = function (type, filter) {
	    var any_kw = filter;
		var include_primarycat = type;
		if(any_kw){
			th.data.any_kw = any_kw;
		}
		if(include_primarycat){
			th.data.include_primarycat = include_primarycat;
		}

		$.get("http://api.bigoven.com/recipes", th.data, function (response) {
			//th.dishes = response.Results;
			th.dishes = response.Results;
			th.notifyObservers("filterDishList");
			/*for(var key in th.dishes){
				(function(key){
					var url = "http://api.bigoven.com/recipe/" + th.dishes[key].RecipeID
                  + "?api_key="+th.apiKey;
	        $.ajax({
	            type: "GET",
	            dataType: 'json',
	            cache: false,
	            url: url,
	            success: function (response) {
								th.dishes[key].ingredients = response.Ingredients;
								th.dishes[key].description = response.Description;
								th.dishes[key].preparation = response.Instructions;
								th.dishes[key].id = th.dishes[key].RecipeID;
								th.dishes[key].name = th.dishes[key].Title;
								th.dishes[key].type = th.dishes[key].Category;
								th.dishes[key].image = th.dishes[key].ImageURL120;
	                //console.log(data);
								th.count++;
								//alert(th.count);
								if(th.count == th.dishes.length){
									th.notifyObservers("filterDishList");
									alert("notify")
								}
	            }
	        });
				})(key);
			}*/

				//console.log(data);
		}, "json");
    /*$.ajax({
        type: "GET",
				// ContentType: "application/json",
				dataType: 'json',
        // Content-Type: 'application/json',
        cache: false,
        url: url,
        success: function (data) {
					//th.dishes = response.Results;
					th.dishes = data;
					var count = 0;
					for(var key in th.dishes){
						(function(key){
							$.get("http://api.bigoven.com/recipe/"+th.dishes[key].RecipeID, {api_key: th.apiKey}, function(response){
								th.dishes[key].ingredients = response.Ingredients;
								th.dishes[key].description = response.Description;
								th.dishes[key].preparation = response.Instructions;
								th.dishes[key].id = th.dishes[key].RecipeID;
								th.dishes[key].name = th.dishes[key].Title;
								th.dishes[key].type = th.dishes[key].Category;
								th.dishes[key].image = th.dishes[key].ImageURL120;
								count++;
								if(count == th.dishes.length-1){
									th.notifyObservers("filterDishList");
								}

							}, "json");
						})(key);

					}
            //console.log(data);
        }
    });*/

	  /*return $(this.dishes).filter(function(index,dish) {
		var found = true;
		// if any valid filter parameter is passed, the following operation would be processed.
		if(filter){
			found = false;
			$.each(dish.ingredients,function(index,ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
					// it means there is at least one dish containing this ingredients.
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return (type == "all" || dish.type == type) && found;
	  });*/
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(var key in this.dishes){
			if(this.dishes[key].id == id) {
				return this.dishes[key];
			}
		}
	}

	//function that returns a dish from the existing menu
	this.getDishFromMenu = function(id){
		for (var key in this.menu_dishes){
			if(this.menu_dishes[key].id == id){
				return this.menu_dishes[key];
			}
		}
	};


	// the this.dishes variable contains an array of all the
	// this.dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name,
	// quantity (a number), price (a number) and unit (string
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	this.dishes = [];

	this.data = {api_key: this.apiKey, pg: 1, rpp: 12};
	$.get("http://api.bigoven.com/recipes", this.data, function(response){
		th.dishes = response.Results;
		// th.notifyObservers("gotDishesInfo");
		for(var key in th.dishes){
			(function(key){
				$.get("http://api.bigoven.com/recipe/"+th.dishes[key].RecipeID, {api_key: th.apiKey}, function(response){
					th.dishes[key].ingredients = response.Ingredients;
					//alert(key)
					th.dishes[key].description = response.Description;
					th.dishes[key].preparation = response.Instructions;
					th.dishes[key].id = th.dishes[key].RecipeID;
					th.dishes[key].name = th.dishes[key].Title;
					th.dishes[key].type = th.dishes[key].Category;
					th.dishes[key].image = th.dishes[key].ImageURL120;
				}, "json");
			})(key);

		}
	}, "json");


		//delete this.dishes[key].RecipeID;
		//delete this.dishes[key].Title;
		//delete this.dishes[key].Category;
		//delete this.dishes[key].ImageURL;

	/*this.dishes = [{
		'id':1,
		'name':'French toast',
		'preparation': 'one word',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];*/

	/*this.menu_dishes = [{
		'id':1,
		'name':'French toast',
		'preparation': 'one word',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];*/
}
