import axios from "axios"

export async function GetRecipeAll() {

  const response = await axios.post('http://localhost:3090/getAllRecipes')
  return response.data.success

}

export async function GetAllRecipesShortInfo() {

  const response = await axios.post('http://localhost:3090/getAllRecipesShortInfo')
  return response.data.success

}


export async function GetRecipeById(id) {

  const response = await axios.post('http://localhost:3090/getRecipeById', { id })
  return response.data.success

}