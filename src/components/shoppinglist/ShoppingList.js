import React, { useState, useEffect } from 'react'
import { GetShoppingList } from '../../actions/user/ShoppingList'
import StandardRecipeCard from '../recipe/recipeCards/StandardRecipeCard';
import { useUser } from '../../context/user-context';
import { useShoppingList } from '../../context/currentShoppingList';

function ShoppingList() {
  const style = {
    main: {
      gridArea: "shoppinglist",
      backgroundColor: "red",
      width: "100%",
      height: "2000px"
    }
  }

  const [ListItems, setListItems] = useState([]);
  const user = useUser();
  const ShoppingList = useShoppingList(user)

  return (
    <div style={style.main} >
      {
        ListItems.map((item) => {
          return (
            <StandardRecipeCard key={item._id} recipe={item} />
          )
        })
      }
    </ div>
  )
}

export default ShoppingList