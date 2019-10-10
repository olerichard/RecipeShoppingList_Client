import React, { useState, useEffect } from 'react';
import { GetAllRecipesShortInfo } from '../../../actions/Recipe/GetRecipe'
import StandardRecipeCard from '../recipeCards/StandardRecipeCard';
import Fab from '@material/react-fab'
import '@material/react-fab/dist/fab.css';
import { withRouter } from 'react-router-dom';
import { UseUser } from '../../../context/user-context';
import MaterialIcon from '@material/react-material-icon';
import { UseShoppingList } from '../../../context/shoppingList-context';


function RecipeOverview({ history }) {
  const [Recipes, setRecipes] = useState([]);
  const user = UseUser();
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
    }
  }

  return (
    <div style={{ gridArea: "main" }}>
      <div style={style.CardContainer}>
        {
          Recipes.map((Recipe) => {
            return (
              <StandardRecipeCard key={Recipe._id} recipe={Recipe} listId ={shoppingList._id} />
            )
          })
        }

      </div>
      {user.loggedIn ?
        <Fab style={style.Fab} icon={<MaterialIcon icon="add" />} onClick={() => history.push("/recipe/createRecipe")} /> : ""}
    </div>
  );
}

export default withRouter(RecipeOverview)