import axios from "axios"

export default async function saveRecipe({ name }, ingredients, cookingSteps, pictureData) {

  const cleanIngredientsList = ingredients.map((ing) => { return { name: ing.ingredient.name, amount: ing.amount.name, unit: ing.unit.name } });
  console.log(pictureData)

  const respons = await axios.post('http://localhost:3090/saveNewRecipe', { name, cleanIngredientsList, cookingSteps, pictureData })
  return respons.data.success

}