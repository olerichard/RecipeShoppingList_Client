import React, { useEffect,useState } from 'react';
import TopBar from './components/topBar/TopBar';
import ShoppingList from './components/shoppinglist/ShoppingList'
import { UseShoppingList } from '../src/context/shoppingList-context';


export default ({ children }) => {
  const shoppingList = UseShoppingList().ShoppingList.recipes;
  const [ShowShoppingList,setShowShoppingList] = useState(false)

  useEffect(() => {
   setShowShoppingList(shoppingList != undefined && shoppingList.length > 0)
  },[shoppingList])

  const style = {
    recipesAndShoppingList:{
      display:"Grid",
      gridTemplateColumns: "5fr 1fr", 
    },
    recipes:{
      display:"Grid",
      gridTemplateColumns: "auto", 
    } 
  }

  return (
    <React.Fragment>
      <TopBar />
      <div style={ShowShoppingList ? style.recipesAndShoppingList : style.recipes}>
        {children}  
        <ShoppingList />
      </div>
    </React.Fragment>  
  )
}

