import React, { useState, useEffect, useContext, createContext } from 'react'
import { GetShoppingList } from '../actions/user/ShoppingList'

const ShoppingList = createContext()

export function ShoppingListProvider({ children }) {
  const [ShoppingList, SetShoppingList] = useState("")

  useEffect(() => {
    const awaitShoppingList = async () => {
      const shoppingList = await GetShoppingList();
      SetShoppingList({ ...shoppingList });
    };
    awaitShoppingList();
  }, [])

  return (<ShoppingList.Provider value={ShoppingList}> {children} </ShoppingList.Provider>)
}

export function useShoppingList() {
  const context = useContext(ShoppingList)
  if (context === undefined) {
    throw new Error(`useShoppingList must be used within a UserProvider`)
  }
  return context
}


