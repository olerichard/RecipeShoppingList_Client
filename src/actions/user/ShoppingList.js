import {Post} from "../../api/api"

export async function GetShoppingList(user) {
  const response = await Post('getShoppingList', {user})

  if (response.data.error != null)
    return response.data.error
  
  return response.data.success

}

export async function AddToShoppingList(listId, itemId) {
  const response =  await Post('addToShoppingList', { listId, itemId })

  if (response.data.error != null)
    return response.data.error
  
  return response.data.success

}

export async function RemoveFromShoppingList(listId, itemId) {
  const response = await Post('removeFromShoppingList', { listId, itemId })

  if (response.data.error != null)
    return response.data.error
  
  return response.data.success

}

