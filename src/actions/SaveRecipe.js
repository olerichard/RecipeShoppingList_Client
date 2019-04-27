import axios from "axios"

export default async function saveRecipe(name, ingredients) {
  const respons = await axios.post('http://localhost:3090/saveNewRecipe', { name, ingredients })
  console.table()

  return respons.data.success

}