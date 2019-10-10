import React  from 'react'
import StandardRecipeCard from '../recipe/recipeCards/StandardRecipeCard';
import { UseShoppingList } from '../../context/shoppingList-context';

export function ShoppingList() {
  const style = {
    main: {
      gridArea: "shoppinglist",
      width: "100%",
      height: "2000px"
    }
  }

  const shoppingList = UseShoppingList().ShoppingList;
  const renderList = (shoppingList.recipes === undefined || shoppingList.recipes === "" || shoppingList.recipes.length <= 0) ? false:true;
  console.log("RenderList:" + renderList)

  return (
    <React.Fragment>
    {renderList ?
    <div style={style.main} >
      {
        shoppingList.recipes.map((item) => {
          return (
            <StandardRecipeCard key={item._id} recipe={item} listId={shoppingList._id} />
          )
        })
      }
    </ div> : null
    }
    </React.Fragment>
  )
}

export default ShoppingList