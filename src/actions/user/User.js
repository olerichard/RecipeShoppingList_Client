import {Get,Post} from "../../api/api"

const localStorageKey = "__RecipeShoppingListToken__"

export async function CreateUser(user) {

  const response = await Post("createUser",user)
  if (response.data.error != null)
    return response.data.error

  localStorage.setItem(localStorageKey, response.data.token);

  return response.data.user

}

export async function LogIn(user) {
  const response = await Post("logIn",user)
  if (response.data.error != null)
    return false

  localStorage.setItem(localStorageKey, response.data.token);
  return true

}

export async function LogOut() {
  const gotUser = localStorage.getItem(localStorageKey)

  if (gotUser === null)
    return false

  localStorage.removeItem(localStorageKey);
  return true
}

export async function GetUser() {
  const token = localStorage.getItem(localStorageKey);

  if (token === null)
    return { loggedIn: false };

  const response = await Get("getUserById");
  console.log(response)

  if (response.data.error)
    return { loggedIn: false }

  return {...response.data.user,loggedIn : true}

}
