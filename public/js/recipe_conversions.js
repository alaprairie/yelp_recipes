// Get items
const changeBtnGoblin = document.getElementById("change_units_goblin");
const changeBtnMetric = document.getElementById("change_units_metric");
const changeBtnImperial = document.getElementById("change_units_imperial");
const ingredientRows = document.getElementsByClassName("ingredients");
// let system = "imperial"

// Convert Function
const convertUnits = (inputAmount, inputUnit, outputSystem) => {
  	//====================
	// IMPERIAL
	//====================
	
	// Cups
	if (inputUnit === 'c') {
    	if (outputSystem === "goblin") {
    		//1 cup = 2 steins
    		return {
    			amount: (parseFloat(inputAmount * 2)).toFixed(2),
        		unit: "stein"
        	}
    	} else if (outputSystem === "metric") {
        	// 1 c = 237 ml
        	return {
          		amount: (parseFloat(inputAmount * 237)).toFixed(2),
          		unit: "ml"
        	}
      	}
	}

    // Ounces
	else if (inputUnit === 'oz') {
		if (outputSystem === "goblin") {
    		//1 oz = 1.2 spoonfulls
  			return {
        		amount: (parseFloat(inputAmount * 1.2)).toFixed(2),
        		unit: "spoonfull"
        	}
    	} else if (outputSystem === "metric") {
        	// 1 oz = 28.3495 g
        	return {
          		amount: (parseFloat(inputAmount * 28.3495)).toFixed(2),
    			unit: "g"
       		}
      	}
    }
	
	// Pounds
	else if (inputUnit === 'lb') {
		if (outputSystem === "goblin") {
			// 1 lb = 4 handfulls
			return {
				amount: (parseFloat(inputAmount * 4)).toFixed(2),
				unit: "handfull"
			}
		} else if (outputSystem === "metric") {
			// 1 lb = 0.453592 kg
			return {
				amount: (parseFloat(inputAmount * 0.4536)).toFixed(2),
				unit: "kg"
			}
		}
	}
	
	// Tablespoons
	else if (inputUnit === 'tbsp') {
		if (outputSystem === "goblin") {
			// 1 tbsp = 1 big spoon
			return {
			  amount: (parseFloat(inputAmount)).toFixed(2),
			  unit: "big spoonfull"
			}
		} else if (outputSystem === "metric") {
			// 1 tbsp = 15 ml
			return {
				amount: (parseFloat(inputAmount * 15)).toFixed(2),
				unit: "ml"
			}
		}
	}
	
	// Teaspoons
	else if (inputUnit === 'tsp') {
		if (outputSystem === "goblin") {
			// 1 tsp = 1 small spoon
			return {
				amount: (parseFloat(inputAmount)).toFixed(2),
				unit: "small spoonfull"
			}
		} else if (outputSystem === "metric") {
			// 1 tsp = 5 ml
			return {
				amount: (parseFloat(inputAmount * 5)).toFixed(2),
				unit: "ml"
			}
		}
	}
	
	//=====================
	// METRIC
	//=====================
	
	// Milileters
	else if (inputUnit === 'ml') {
    	if (outputSystem === "goblin") {
        	// 1 stein = 118.5 ml
        	return {
    			amount: (parseFloat(inputAmount / 118.5)).toFixed(2),
          		unit: "stein"
        	}
    	} else if (outputSystem === "imperial") {
			// 1 ml = 0.00422675 c
        	return {
          		amount: (parseFloat(inputAmount * .0042)).toFixed(2),
          		unit: "c"
        	}
      	}
    }
	
	// Grams
	else if (inputUnit === 'g') {
		if (outputSystem === "goblin") {
			// 23.6246grams = 1 spoonfull
			return {
         		amount: (parseFloat(inputAmount / 23.6246)).toFixed(2),
    			unit: "spoonfull"
       	 	}
	} else if (outputSystem === "imperial") {
			// 28.3495 grams = 1 oz
			return {
				amount: (parseFloat(inputAmount / 28.3495)).toFixed(2),
				unit: "oz"
			}
		}
	}
	
	// Kilograms	
	else if (inputUnit === 'kg') {
		if (outputSystem === "goblin") {
			// 0.1135 kg = 1 handfull
			return {
				amount: (parseFloat(inputAmount / 0.1135)).toFixed(2),
				unit: "handfull"
			}
		} else if (outputSystem === "metric") {
			// 1kg = 2.2046lb
			return {
				amount: (parseFloat(inputAmount * 2.2046)).toFixed(2),
				units: "lb"
			}
		}
	}
	
	//=====================
	// GOBLIN
	//=====================

	// Steins
	else if (inputUnit === 'stein') {
		if (outputSystem === "imperial") {
			// 2 stein = 1 cup
			return {
				amount: (parseFloat(inputAmount / 2)).toFixed(2),
				unit: 'cup'
			}
		} else if (outputSystem === "metric") {
			// 1 stein = 118.5 ml
			return {
				amount: (parseFloat(inputAmount * 118.5)).toFixed(2),
				unit: 'ml'
			}
		}
	}
	
	// Spoonfulls
	else if (inputUnit === 'spoonfull') {
		if (outputSystem === "imperial") {
			// 1.2 spoonfulls = 1 oz
			return {
				amount: (parseFloat(inputAmount / 1.2)).toFixed(2),
				unit: 'oz'
			}
		} else if (outputSystem === "metric") {
			// 1 spoonfull = 23.6246 g
			return {
				amount: (parseFloat(inputAmount * 23.6246)).toFixed(2),
				unit: 'g'
			}
		}
	}
	
	// Handfulls
	else if (inputUnit === 'handfull') {
		if (outputSystem === 'imperial') {
			// 4 handfulls = 1 lb
			return {
				amount: (parseFloat(inputAmount / 4)).toFixed(2),
				unit: 'lb'
			}
		} else if (outputSystem === 'metric') {
			// 1 handfull = 0.1134 kg
			return {
				amount: (parseFloat(inputAmount * 0.1134)).toFixed(2),
				unit: 'kg'
			}
		}
	}
	
	// Big Spoonfulls
	else if (inputUnit === 'big spoonfull') {
		if (outputSystem === 'imperial') {
			// 1 big spoonfull = 1 tbsp
			return {
				amount: (parseFloat(inputAmount)).toFixed(2),
				unit: 'tbsp'
			}
		} else if (outputSystem === 'imperial') {
			// 1 big spoonfull = 15 ml
			return {
				amount: (parseFloat(inputAmount * 15)).toFixed(2),
				unit: "ml"
			}
		}
	}
	
	// Small Spoonfulls
	else if (inputUnit === 'small spoonfull') {
		if (outputSystem === 'imperial') {
			// 1 small spoonfull = 1 tsp
			return {
				amount: (parseFloat(inputAmount)).toFixed(2),
				unit: 'tsp'
			}
		} else if (outputSystem === 'metric') {
			// 1 small spoonfull = 5 ml
			return {
				amount: (parseFloat(inputAmount * 5)).toFixed(2),
				unit: "ml"
			}
		}
	}
	
  // Each - Don't have to change anything, but still need to return, so we can call it on all items without errors
	else if (inputUnit === "each") {
		return {
      		amount: inputAmount,
			unit: "each"
    	}
  	}

  // Errors
	else {
		return {
      		amount: "Error",
      		unit: "Error"
    	}
  	}
}


// On Click Function
const onGoblinBtnClick = () => {
	for (let i = 0; i < ingredientRows.length - 2; i += 3) {
    	// Get converted units
  		const converted = convertUnits(
  			ingredientRows[i+1].innerText,
  			ingredientRows[i+2].innerText,
  			"goblin"
  		);

  	// Update values in table
  		ingredientRows[i+1].innerText = converted.amount;
  		ingredientRows[i+2].innerText = converted.unit;
  	}
}

// On Click Function
const onMetricBtnClick = () => {
  	for (let i = 0; i < ingredientRows.length - 2; i += 3) {
    	// Get converted units
  		const converted = convertUnits(
  			ingredientRows[i+1].innerText,
  			ingredientRows[i+2].innerText,
  			"metric"
  		);

  	// Update values in table
  		ingredientRows[i+1].innerText = converted.amount;
  		ingredientRows[i+2].innerText = converted.unit;
  	}
}

// On Click Function
const onImperialBtnClick = () => {
  for (let i = 0; i < ingredientRows.length - 2; i += 3) {
    	// Get converted units
  		const converted = convertUnits(
  			ingredientRows[i+1].innerText,
  			ingredientRows[i+2].innerText,
  			"imperial"
  		);

  	// Update values in table
  		ingredientRows[i+1].innerText = converted.amount;
  		ingredientRows[i+2].innerText = converted.unit;
  	}
}

changeBtnGoblin.addEventListener("click", onGoblinBtnClick);
changeBtnMetric.addEventListener("click", onMetricBtnClick);
changeBtnImperial.addEventListener("click", onImperialBtnClick);