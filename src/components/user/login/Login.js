import React, { useState } from 'react';
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import { Link, Redirect } from 'react-router-dom'
import { LogIn } from '../../../actions/user/User'
import { UseUser } from '../../../context/user-context';

export default function Login() {

  const [Email, setEmail] = useState({ value: "Test@test.no", valid: true })
  const [Password, setPassword] = useState({ value: "Ab123456", valid: true })
  const [LoggedIn, setLoggedIn] = useState(false)
  const user = UseUser();

  async function onSubmit(e) {
    e.preventDefault()
    const response = await LogIn({ email: Email.value, password: Password.value })

    console.log("Response:")
    console.log(response)

    if (response === true) {
      console.log("set Logged in true")
      setLoggedIn(true);
      user.LogIn();
    } else {
      setPassword({ value: "", valid: false })
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
    <React.Fragment>
      {LoggedIn ? (<Redirect to="/" />) :
        (<form onSubmit={onSubmit}>
          <div style={style.Grid}>
            <TextField id="email" label="Email"><Input id="emailInput" required type="email" value={Email.value} onChange={(e) => setEmail({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
            <TextField id="password" label="Password"><Input id="passwordInput" required type="password" value={Password.value} onChange={(e) => setPassword({ value: e.target.value, valid: e.target.validity.valid })} /></TextField>
            <Button disabled={!isFormValid()} raised type="submit"> Sign In </Button>
            <Button > <Link style={style.Link} to="/Signup">Dont got an account ? sign up here </Link> </Button>
          </div>
        </form>)
      }
    </React.Fragment>
  )
}