import React, { useState, useEffect } from 'react';
import { GetRecipeById } from '../../actions/GetRecipe'


export default function ViewRecipe({ match }) {
  const [Recipe, setRecipes] = useState({});
  const [isLoading, setIsLoading] = useState("false");

  useEffect(() => {

    const getRecipe = async () => {
      setIsLoading(true)
      setRecipes(await GetRecipeById(match.params.id));
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
      {isLoading ? (<div>LOADING </div>) :
        (<div>
          <div style={{ backgroundImage: `url(${require("../../pictures/" + Recipe.picture)})`, height: "500px", width: "500px" }}></div>
          <h1>{Recipe.name}</h1>
          <ul> Ingredients:
            {Recipe.ingredients.map((ing, idx) => {
            return (
              <ul key={`ing${idx}`}>
                <li>Name :{ing.name}</li>
                <li>Amount:{ing.amount}</li>
                <li>Unit:{ing.unit}</li>
              </ul>
            )
          })}
          </ul>
          <ul> Steps:
            {Recipe.cookingSteps.map((step, idx) => {
            return (
              <li key={`step${idx}`}>
                {step}
              </li>
            )
          })}
          </ul>
        </div>
        )
      }
    </div >
  );
}
