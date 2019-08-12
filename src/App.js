import React from 'react';
import TopBar from './components/topBar/TopBar';
import ShoppingList from './components/shoppinglist/ShoppingList'
import { UserProvider } from './context/user-context'

export default ({ children }) => {

  const style = {
    Grid: {
      display: "Grid",
      gridTemplateAreas: `'TopBar   TopBar'
        'main shoppinglist'`,
      gridTemplateColumns: "4fr 1fr"
    }
  }

  return (
    <div style={style.Grid}>
      <UserProvider>
        <TopBar />
        <ShoppingList />
        {children}
      </UserProvider>
    </div>
  )
}

