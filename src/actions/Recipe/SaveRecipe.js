import {Data} from "../../api/api"

export async function SaveNewRecipe( name, file , ingredients, cookingSteps,tags) {
  const recipeData = new FormData();
  recipeData.append("image", file);
  recipeData.append("name", name);
  recipeData.append("cookingSteps", cookingSteps);
  recipeData.append("ingredients", JSON.stringify(cleanIngredientsList(ingredients)));
  recipeData.append("tags", tags);

  const response = await Data( "saveNewRecipe",recipeData)

  console.log(response)

  return response.data
}

export async function SaveEditRecipe(information, ingredients, cookingSteps,tags) {

  const recipeData = new FormData();
  if (information.pictureLocal !== undefined && information.pictureLocal.use)
    recipeData.append("image", information.pictureLocal.file);

  recipeData.append("id", information._id);
  recipeData.append("name", information.name);
  recipeData.append("cookingSteps", JSON.stringify(cookingSteps));
  recipeData.append("ingredients", JSON.stringify(cleanIngredientsList(ingredients)));
  recipeData.append("tags", JSON.stringify(tags));
  
  const response = await Data("saveUpdatedRecipe",recipeData)

  return response.data

}

function cleanIngredientsList(ingredients) { return ingredients.map((ing) => { return { name: ing.ingredient.name.toString(), amount: ing.amount.name, unit: ing.unit.name } }) };

