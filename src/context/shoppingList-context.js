import React, { useState, useEffect, useContext, createContext } from 'react'
import { GetShoppingList } from '../actions/user/ShoppingList'
import { UseUser } from '../context/user-context';

const ShoppingListContext = createContext()

export  function ShoppingListProvider({ children }) {
  const [ShoppingList, SetShoppingList] = useState("")
  const user = UseUser().User
  const state = {ShoppingList,UpdateShoppingList};

  function UpdateShoppingList(){
    const awaitShoppingList = async () => {
      const fetchedShoppingList = await GetShoppingList(user._id);
      SetShoppingList( fetchedShoppingList ?  { ...fetchedShoppingList } : false);
    };
    awaitShoppingList();
  }

  useEffect(() => {
    const awaitShoppingList = async () => {
      const fetchedShoppingList = await GetShoppingList(user._id);
      SetShoppingList( fetchedShoppingList ?  { ...fetchedShoppingList } : false);
    };
    
    awaitShoppingList();
  },[user])
  
  return (<ShoppingListContext.Provider value={state}> {children} </ShoppingListContext.Provider>)
}

export function UseShoppingList() {
  const context = useContext(ShoppingListContext)
  if (context === undefined) {
    throw new Error(`useShoppingList must be used within a ShoppingListProvider`)
  }
  return context
}


