import React from 'react';
import '@material/react-button/dist/button.css';
import Card, {
  CardMedia
} from "@material/react-card";
import '@material/react-card/dist/card.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';


export default function ViewRecipe({ recipe, setIsEditMode }) {
  const Recipe = { ...recipe };


  const style = {
    ViewRecipe: {
      margin: "1em",
      display: "grid",
      gridTemplateColumns: "minmax(25%, 50em)",
      justifyContent: "center",
    },
    Card: {
      margin: "1em"
    },
    Ingredients: {
      display: "grid",
      gridRowGap: "0.5em",
    },
    IngredientRow: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 2fr 0.25fr",
      gridColumnGap: "8px",

    },
    Step: {
      display: "grid",

    },
    Steps: {
      display: "grid",
      gridRowGap: "0.5em",
    },
    Name: {
      display: "grid",
      height: "100%",
      width: "100%",
      fontSize: "2em",
      alignItems: "end"
    },
    NameText: {
      margin: "0",
      padding: "0",
      paddingLeft: "0.25em",
      background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      color: "white",
      textShadow: "1px 1px  rgba(0,0,0,0.5)"
    },
    Picture: {
      display: "grid",
    }
  }

  return (
    <div style={style.ViewRecipe}>
      <Card style={style.Card}>
        <CardMedia style={style.Picture} wide imageUrl={require('../../pictures/' + Recipe.picture)}><div style={style.Name}><h1 style={style.NameText}>{Recipe.name}</h1></div></CardMedia>

        <ul>  <h2>Ingredients:</h2>
          {Recipe.ingredients.map((ing, idx) => {
            return (
              <ul style={style.IngredientRow} key={`ing${idx}`}>
                <li> {ing.amount} {ing.unit} off {ing.name}</li>
              </ul>
            )
          })}
        </ul>
        <ul> <h2>Steps:</h2>
          {Recipe.cookingSteps.map((step, idx) => {
            return (
              <li key={`step${idx}`}>
                {step}
              </li>
            )
          })}
        </ul>
        <Button raised onClick={() => setIsEditMode(true)}>Edit Recipe</Button>
      </Card>
    </div>
  );
}

