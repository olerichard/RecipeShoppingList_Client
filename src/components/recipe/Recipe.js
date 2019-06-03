import React, { useState, useEffect } from 'react';
import { GetRecipeById } from '../../actions/GetRecipe'
import CreateRecipe from '../createRecipe/CreateRecipe';
import ViewRecipe from '../viewRecipe/ViewRecipe';


export default function Recipe({ match }) {
  const [Recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true)
      setRecipe(await GetRecipeById(match.params.id));
      setIsLoading(false)
    };
    if (match.params.id === undefined) {
      setIsEditMode(true)
      setIsLoading(false)
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
      {isLoading ? (<div>LOADING</div>) : (
        isEditMode ? (<CreateRecipe recipe={Recipe} setIsEditMode={setIsEditMode} />) :
          (<ViewRecipe recipe={Recipe} setIsEditMode={setIsEditMode} />))
      }
    </div>
  );
}
