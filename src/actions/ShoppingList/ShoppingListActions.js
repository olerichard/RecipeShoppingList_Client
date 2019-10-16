
export function ReduceShoppingListToIngredients(recipes){
    const breakDownRecipesToIngredients = function(list,recipe){
        const ingredients = recipe.ingredients;
        
        ingredients.forEach(ingredient => {
            list.hasOwnProperty(ingredient.name) 
                ? list[ingredient.name].amount += parseFloat(ingredient.amount*ingredient.unit.baseUnitAmount)
                : list[ingredient.name] = {name:ingredient.name,amount:parseFloat(ingredient.amount*ingredient.unit.baseUnitAmount),unit:ingredient.unit.baseUnit.name}
        });
        return list;
    }

    let ingredientsList = {};
    recipes.recipes.forEach(recipe => { ingredientsList = breakDownRecipesToIngredients(ingredientsList,recipe)})
    
    const ingredientsListToArray = [] 
    
    for (let ing in ingredientsList){
        ingredientsListToArray.push(ingredientsList[ing])
    };
    
    return ingredientsListToArray

}