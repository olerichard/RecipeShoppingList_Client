import axios from "axios"

export async function GetRecipeAll() {

  const response = await axios.get('http://localhost:3090/getAllRecipes')
  return response.data.success

}

export async function GetAllRecipesShortInfo() {

  const response = await axios.get('http://localhost:3090/getAllRecipesShortInfo')
  return response.data.success

}


export async function GetRecipeById(id) {

  const response = await axios.get('http://localhost:3090/getRecipeById?id=' + id)
  console.log(response.data)
  return response.data.success
}