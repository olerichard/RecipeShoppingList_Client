import axios from "axios"

export async function SaveNewRecipe({ name, file }, ingredients, cookingSteps) {
  const recipeData = new FormData();
  recipeData.append("image", file);
  recipeData.append("name", name);
  recipeData.append("cookingSteps", cookingSteps);
  recipeData.append("ingredients", JSON.stringify(cleanIngredientsList(ingredients)));

  const response = await SendRecipe(recipeData, "saveNewRecipe")

  return response.data
}

export async function SaveEditRecipe(information, ingredients, cookingSteps) {

  const recipeData = new FormData();
  if (information.pictureLocal !== undefined && information.pictureLocal.use)
    recipeData.append("image", information.pictureLocal.file);

  recipeData.append("id", information._id);
  recipeData.append("name", information.name);
  recipeData.append("cookingSteps", JSON.stringify(cookingSteps));
  recipeData.append("ingredients", JSON.stringify(cleanIngredientsList(ingredients)));

  const response = await SendRecipe(recipeData, "saveUpdatedRecipe")

  return response.data

}

async function SendRecipe(data, endpoint) {
  const axiosData = {
    method: 'post',
    url: 'http://localhost:3090/' + endpoint,
    data: data
  }

  return await axios(axiosData);
}


function cleanIngredientsList(ingredients) { return ingredients.map((ing) => { return { name: ing.ingredient.name.toString(), amount: ing.amount.name, unit: ing.unit.name } }) };

