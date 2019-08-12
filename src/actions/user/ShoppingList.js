import axios from "axios"

export async function GetShoppingList(user) {
  const response = await axios.post('http://localhost:3090/getShoppingList', user)

  if (response.data.error != null)
    return response.data.error

  return response.data.shoppingList

}

export async function AddToShoppingList(listId, itemId) {
  const response = await axios.post('http://localhost:3090/addToShoppingList', { listId, itemId })

  if (response.data.error != null)
    return response.data.payload

  return response.data.shoppingList
}

export async function RemoveFromShoppingList(listId, itemId) {
  const response = await axios.post('http://localhost:3090/removeFromShoppingList', { listId, itemId })

  if (response.data.error != null)
    return response.data.error

  return response.data.shoppingList
}

