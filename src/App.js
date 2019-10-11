import React from 'react';
import TopBar from './components/topBar/TopBar';
import ShoppingList from './components/shoppinglist/ShoppingList'
import { UserProvider } from './context/user-context'
import { ShoppingListProvider } from './context/shoppingList-context'
import { SettingsProvider } from './context/settings-context'

export default ({ children }) => {

  const style = {
    OverViewWithShoppingList: {
      display: "Grid",
      gridTemplateAreas: `
        'TopBar TopBar'
        'main   shoppinglist'`,
      gridTemplateColumns: "4fr 1fr"
    },
    OverViewNoShoppingList: {
      display: "Grid",
      gridTemplateAreas: `
        'TopBar'
        'main '`,
      gridTemplateColumns: "1fr"
    },
  }

  return (
    <div style={style.OverViewWithShoppingList}>
      <UserProvider>
        <ShoppingListProvider>
          <SettingsProvider>
            <TopBar />
            <ShoppingList />
            {children}  
          </SettingsProvider>
        </ShoppingListProvider>
      </UserProvider>
    </div>
  )
}

