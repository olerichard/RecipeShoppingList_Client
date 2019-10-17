import React from 'react'
import StandardRecipeCard from '../recipe/recipeCards/StandardRecipeCard';

import {useTrail,animated} from 'react-spring'
import {standardTrailFadeIn} from '../../animations/animations'

 export default function ShoppingListRecipes({shoppingList}) {
  
    const recipes = shoppingList.recipes;
  
  const animateList= useTrail(recipes.length,{...standardTrailFadeIn});

  const style = {
    Card:{
      marginTop:"1em",
      marginRight:"1em",
    }
  }

  return (
   <React.Fragment>
        {animateList.map((props,i) => {
            return(
              <animated.div key={recipes[i]._id} style={props}>
               <div key={recipes[i]._id} style={style.Card}>
                   <StandardRecipeCard key={recipes[i]._id} recipe={recipes[i]} listId={shoppingList._id} />
                </div>
              </animated.div>
            )
        })}   
    </React.Fragment>
  )
}
