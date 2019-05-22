import axios from "axios"

export default async function saveRecipe({ name }, ingredients, cookingSteps) {

  const cleanIngredientsList = ingredients.map((ing) => { return { name: ing.ingredient.name, amount: ing.amount.name, unit: ing.unit.name } });
  const respons = await axios.post('http://localhost:3090/saveNewRecipe', { name, cleanIngredientsList, cookingSteps })
  return respons.data.success

}