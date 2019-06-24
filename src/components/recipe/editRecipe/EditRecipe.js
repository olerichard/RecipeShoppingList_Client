import React, { useState, useEffect } from 'react';
import { GetRecipeById } from '../../../actions/Recipe/GetRecipe'
import CreateRecipe from '../createRecipe/CreateRecipe';
import { Redirect } from 'react-router-dom';


export default function EditRecipe({ match }) {
  const [Recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeFound, setRecipeFound] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true)
      const recipe = await GetRecipeById(match.params.id)
      if (recipe === null)
        setRecipeFound(false);

      setRecipe(recipe);
      setIsLoading(false)
    };
    if (match.params.id === undefined) {
      setRecipeFound(false);
    } else {
      getRecipe();
    }

  }, [])

  const style = {
    Recipe: {
    }
  }
  return (
    <div style={style.Recipe}>
      {isLoading ? (<div>LOADING</div>) : (RecipeFound ? (<CreateRecipe recipe={Recipe} />) : <Redirect to="/" />)}
    </div>
  );
}
