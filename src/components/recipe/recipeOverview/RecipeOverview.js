import React, { useState, useEffect } from 'react';
import { GetAllRecipesShortInfo } from '../../../actions/Recipe/GetRecipe'
import StandardRecipeCard from '../recipeCards/StandardRecipeCard';
import Fab from '@material/react-fab'
import '@material/react-fab/dist/fab.css';
import { withRouter } from 'react-router-dom';
import { UseUser } from '../../../context/user-context';
import MaterialIcon from '@material/react-material-icon';
import { UseShoppingList } from '../../../context/shoppingList-context';
import {useTrail,animated} from 'react-spring'


function RecipeOverview({ history }) {
  const [Recipes, setRecipes] = useState([]);
  const user = UseUser().User;
  const shoppingList = UseShoppingList(user).ShoppingList;

  useEffect(() => {
    const getRecipes = async () => {
      let arr = await GetAllRecipesShortInfo()
      setRecipes([...arr]);
    };
    getRecipes();
  }, [])

  const style = {
    CardContainer: {
      margin: "1em",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(25em, 1fr))",
      columnGap: "1em",
      rowGap: "1em"
    },
    Fab: {
      position: "fixed",
      right: "2em",
      bottom: "2em",
      width: "5em",
      height: "5em",
      zIndex: "10",
    }
  }

  const animateOverview = useTrail(Recipes.length,{
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    from: { opacity: 0 ,transform: 'translate3d(0,-70px,0)' },
    config : { duration:500 }
  });

  return (
    <div>
      <div style={style.CardContainer}> 

          {animateOverview.map((props,i) => {
            return(
              <animated.div key={Recipes[i]._id} style={props}>
               <div> <StandardRecipeCard key={Recipes[i]._id} recipe={Recipes[i]} listId ={shoppingList._id} /></div>
              </animated.div>
            )
          })}
      </div>
      {user.loggedIn ?
        <Fab style={style.Fab} icon={<MaterialIcon icon="add" />} onClick={() => history.push("/recipe/createRecipe")} /> : null}
    </div>
  );
}

export default withRouter(RecipeOverview)