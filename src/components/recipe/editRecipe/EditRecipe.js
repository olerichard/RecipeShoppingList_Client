import React, { useState, useEffect } from 'react';
import { GetRecipeById } from '../../../actions/Recipe/GetRecipe'
import CreateRecipe from '../createRecipe/CreateRecipe';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string'


export default function EditRecipe({ location }) {
  const [Recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeFound, setRecipeFound] = useState(true);

  useEffect(() => {
    const getRecipe = async (id) => {
      setIsLoading(true)
      const fetchedRecipe = await GetRecipeById(id)
      if (fetchedRecipe === null)
        setRecipeFound(false);

      setRecipe({ ...fetchedRecipe });
      setIsLoading(false)
    };
    const values = queryString.parse(location.search)

    if (values.id === undefined) {
      setRecipeFound(false);
      setIsLoading(false);
    } else {
      getRecipe(values.id);
    }
  }, [location])

  return (
    <React.Fragment>
      {isLoading ? (<div>LOADING</div>) : (RecipeFound ? (<CreateRecipe recipe={Recipe} />) : <Redirect to="/" />)}
      </React.Fragment>
  );
}
