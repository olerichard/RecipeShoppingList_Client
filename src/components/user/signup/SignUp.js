import React, { useState } from 'react';
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import { CreateUser } from '../../../actions/user/User'

export default function SignUp() {

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [PasswordReEntry, setPasswordReEntry] = useState("")
  const passwordPattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";

  async function onSubmit(e) {
    e.preventDefault()
    const response = await CreateUser({ name: Name.value, email: Email.value, password: Password.value, passwordreentry: PasswordReEntry.value });

    if (response === true) {
      // User created. Logged inn Moved to somewhere 
    } else {
      alert(response) // response is error message 
    }
  }

  function isFormValid() {
    return (Email.valid && Password.valid && PasswordReEntry.valid && Name.valid)
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
        <TextField id="name" label="Name"><Input id="nameInput" required type="text" value={Name.value} onChange={(e) => setName({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
        <TextField id="email" label="Email"><Input id="emailInput" required type="email" value={Email.value} onChange={(e) => setEmail({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
        <TextField id="password" label="Password"><Input id="passwordInput" required type="password" pattern={passwordPattern} value={Password.value} onChange={(e) => setPassword({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
        <TextField id="passwordReEntry" label="Retype Password"><Input id="passwordReEntryInput" required type="password" pattern={passwordPattern} value={PasswordReEntry.value} onChange={(e) => setPasswordReEntry({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
        <Button disabled={!isFormValid()} raised type="submit"> Sign Up </Button>
      </div>
    </form>
  )
}