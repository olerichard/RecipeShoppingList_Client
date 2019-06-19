import React, { useState } from 'react';
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import { Link } from 'react-router-dom'
import { LogIn } from '../../../actions/user/User'

export default function Login() {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  async function onSubmit(e) {
    e.preventDefault()
    const response = await LogIn({ email: Email.value, password: Password.value })

    if (response === true) {
      // User created. Logged inn Moved to somewhere 
    } else {
      console.log(response)
      alert(response) // response is error message 
    }
  }

  function isFormValid() {
    return (Email.valid && Password.valid)
  }

  const style = {
    Grid: {
      display: "grid",
      gridTemplateColumns: "1fr"

    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={style.Grid}>
        <TextField id="email" label="Email"><Input id="emailInput" required type="email" value={Email.value} onChange={(e) => setEmail({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
        <TextField id="password" label="Password"><Input id="passwordInput" required type="password" value={Password.value} onChange={(e) => setPassword({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
        <Button disabled={!isFormValid()} raised type="submit"> Sign In </Button>
        <Button > <Link style={style.Link} to="/Signup">Dont got an account ? sign up here </Link> </Button>
      </div>
    </form>
  )
}