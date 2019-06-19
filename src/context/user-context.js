import React, { useState, useEffect, useContext, createContext } from 'react'
import { GetUser } from '../actions/user/User'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [User, setUser] = useState("")

  useEffect(() => {

    const awaitUser = async () => {
      const user = await GetUser();
      setUser({ ...user });
    };
    awaitUser();
  }, [])

  return (<UserContext.Provider value={User}> {children} </UserContext.Provider>)
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}
