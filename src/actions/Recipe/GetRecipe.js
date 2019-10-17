import {Get} from "../../api/api"

export async function GetRecipeAll() {
  const response =  await Get('getAllRecipes')

  if (response.data.error != null)
    return response.data.error

  return response.data.success


}

export async function GetAllRecipesShortInfo() {
  const response =  await Get("getAllRecipesShortInfo")

  if (response.data.error != null)
    return response.data.error

  return response.data.success
}


export async function GetRecipeById(id) {
  const response =  await Get("getRecipeById",id)

  if (response.data.error != null)
    return response.data.error

  return response.data.success
}