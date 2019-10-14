import React from 'react';
import TopBar from './components/topBar/TopBar';
import ShoppingList from './components/shoppinglist/ShoppingList'
import { UserProvider } from './context/user-context'
import { ShoppingListProvider } from './context/shoppingList-context'
import { SettingsProvider } from './context/settings-context'

export default ({ children }) => {

  const style = {
    recipes:{
      display:"Grid",
      gridTemplateColumns: "3fr auto",
    }
  }

  return (
      <UserProvider>
        <ShoppingListProvider>
          <SettingsProvider>
            <TopBar />
            <div style={style.recipes}>
              {children}  
              <ShoppingList />
            </div>
          </SettingsProvider>
        </ShoppingListProvider>
      </UserProvider>
    
  )
}

