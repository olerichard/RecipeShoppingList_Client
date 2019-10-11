
export function ReduceShoppingListToIngredients(recipes){

    const breakDownRecipesToIngredients = function(list,recipe){
        const ingredients = recipe.ingredients;
        
        ingredients.forEach(ingredient => {
            list.hasOwnProperty(ingredient.name) 
                ? list[ingredient.name].amount += parseFloat(ingredient.amount)
                : list[ingredient.name] = {name:ingredient.name,amount:parseFloat(ingredient.amount),unit:ingredient.unit}
        });
        return list;
    }

    let ingredientsList = {};
    recipes.recipes.forEach(recipe => { ingredientsList = breakDownRecipesToIngredients(ingredientsList,recipe)})
    return ingredientsList

}