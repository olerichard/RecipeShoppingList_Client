import axios from "axios"

export default async function saveRecipe({ name, file }, ingredients, cookingSteps) {
  const cleanIngredientsList = ingredients.map((ing) => { return { name: ing.ingredient.name.toString(), amount: ing.amount.name, unit: ing.unit.name } });

  const recipeData = new FormData();
  recipeData.append("image", file);
  recipeData.append("name", name);
  recipeData.append("cookingSteps", cookingSteps);
  recipeData.append("ingredients", JSON.stringify(cleanIngredientsList));
  // recipeData.append("user", JSON.stringify(user));

  const axiosData = {
    method: 'post',
    url: 'http://localhost:3090/saveNewRecipe',
    data: recipeData
  }

  const respons = await axios(axiosData);
  return respons.data.success
}