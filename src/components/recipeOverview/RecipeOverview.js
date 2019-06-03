import React, { useState, useEffect } from 'react';
import { GetAllRecipesShortInfo } from '../../actions/GetRecipe'
import StandardRecipeCard from '../recipeCards/StandardRecipeCard';

export default function RecipeOverview() {
  const [Recipes, setRecipes] = useState([]);

  useEffect(() => {

    const getRecipes = async () => {
      let arr = []
      for (let i = 0; i < 20; i++) {
        const recipes = await GetAllRecipesShortInfo();
        arr = [...arr, ...recipes]
      }

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