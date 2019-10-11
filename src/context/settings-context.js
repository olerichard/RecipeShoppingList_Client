import React, { useState, useEffect, useContext, createContext } from 'react'
import { UseUser } from './user-context';

const SettingsContext = createContext()

export  function SettingsProvider({ children }) {
  const [Settings, SetSettings] = useState(DefaultSettings())
  const user = UseUser().User
  const state = {Settings,SetSettings};

  useEffect(() => {
   const UserSettings = DefaultSettings(user._id)
   SetSettings({...UserSettings});
  },[user])
  
  return (<SettingsContext.Provider value={state}> {children} </SettingsContext.Provider>)
}

export function UseSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`)
  }
  return context
}

function DefaultSettings(user){
    // If user get localstorage else return default.
    return {
        ShoppingList:{
            showList: true,
            showRecipes: true,
        }
    }
}

