import axios from "axios"

export async function GetUnitAll() {
  const response = await axios.get('http://localhost:3090/getUnitAll')
  return response.data.success
}

export async function GetUnitById(id) {
  const response = await axios.get('http://localhost:3090/getUnitById?id=' + id)
  console.log(response.data)
  return response.data.success
}