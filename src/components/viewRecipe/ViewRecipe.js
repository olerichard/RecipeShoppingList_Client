import React, { useState, useEffect } from 'react';
import { GetRecipeById } from '../../actions/GetRecipe'
import CreateRecipe from '../createRecipe/CreateRecipe';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';


export default function ViewRecipe({ recipe }) {
  const [Recipe, setRecipes] = useState({ ...recipe });

  const style = {
    ViewRecipe: {
    }
  }

  return (
    <div style={style.ViewRecipe}>
      <div>
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
    </div>
  );
}
