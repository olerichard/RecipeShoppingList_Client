import axios from "axios"
import decodeJWT from "jwt-decode";

const localStorageKey = "__RecipeShoppingListToken__"
//const localStorageKey = "RecipeShoppingListToken2"

export async function CreateUser(user) {

  const response = await axios.post('http://localhost:3090/createUser', user)
  console.log(user)
  if (response.data.error != null)
    return response.data.error

  localStorage.setItem(localStorageKey, response.data.token);

  return response.data.user

}

export async function LogIn(user) {

  const response = await axios.post('http://localhost:3090/logIn', user)
  console.log(response)
  if (response.data.error != null)
    return response.data.error

  localStorage.setItem(localStorageKey, response.data.token);
  return response.data.user

}

export async function LogOut() {

  localStorage.removeItem(localStorageKey);
  return true
}

export async function GetUser() {
  const token = GetToken();

  if (token === null)
    return { loggedIn: false };

  const decoded = decodeJWT(token);

  if (decoded.sub === undefined)
    return { loggedIn: false }

  var user = await FetchUserInfo(decoded.sub)
  if (user === null)
    return { loggedIn: false }

  user.loggedIn = true

  return user
}

async function FetchUserInfo(id) {
  console.log("fetchuser:" + id)
  const response = await axios.post('http://localhost:3090/getUserById', { id })
  console.log(response)
  return response.data.user;
}

export function GetToken() {
  return localStorage.getItem(localStorageKey)
}