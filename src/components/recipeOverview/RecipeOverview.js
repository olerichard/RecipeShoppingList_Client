import React, { useState, useEffect } from 'react';
import { GetAllRecipesShortInfo } from '../../actions/GetRecipe'
import StandardRecipeCard from '../recipeCards/StandardRecipeCard';

export default function RecipeOverview() {
  const [Recipes, setRecipes] = useState([]);

  useEffect(() => {

    const getRecipes = async () => {
      const recipes = await GetAllRecipesShortInfo();

      setRecipes([...recipes]);
    };

    getRecipes();
  }, [])

  const style = {
    CardContainer: {
      display: "grid",
      gridTemplateColumns: " 1fr 1fr 1fr",
    }
  }


  return (
    <div style={style.CardContainer}>
      {
        Recipes.map((Recipe) => {
          return (
            <StandardRecipeCard key={Recipe._id} recipe={Recipe} />
          )
        })
      }
    </div>
  );
}


/*
        Recipes.map((Recipe) => {
          return (
            <StandardRecipeCard key={Recipe._id} recipe={Recipe} />
          )
        })
*/