import React, { useState, useEffect } from 'react';
import { GetRecipeById } from '../../actions/GetRecipe'
import CreateRecipe from '../createRecipe/CreateRecipe';
import ViewRecipe from '../viewRecipe/ViewRecipe';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';


export default function Recipe({ match }) {
  const [Recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true)
      setRecipe(await GetRecipeById(match.params.id));
      setIsLoading(false)
    };

    getRecipe();
  }, [])

  const style = {
    Recipe: {
    }
  }

  return (
    <div style={style.Recipe}>
      {isLoading ? (<div>LOADING</div>) : (
        isEditMode ? (<CreateRecipe recipe={Recipe} />) :
          (<ViewRecipe recipe={Recipe} />

          )
      )

      }
      <Button raised onClick={() => setIsEditMode(!isEditMode)}>{isEditMode? "Close Edit Mode" :"Edit Recipe"}</Button>
    </div>
  );
}
