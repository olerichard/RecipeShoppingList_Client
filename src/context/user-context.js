import React, { useState, useEffect, useContext, createContext } from 'react'
import { GetUser } from '../actions/user/User'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [User, SetUser] = useState("")
  const state = {User,LogOut,LogIn}
  useEffect(() => {

    const awaitUser = async () => {
      const user = await GetUser();
      SetUser({ ...user });
    };
    awaitUser();
  }, [])

  function LogOut(){
    SetUser("");
  }

  function LogIn(){
    const awaitUser = async () => {
      const user = await GetUser();
      SetUser({ ...user });
    };
    awaitUser();
  }

  return (<UserContext.Provider value={state}> {children} </UserContext.Provider>)
}

export function UseUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}


