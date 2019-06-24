import React, { useState, useEffect } from 'react';
import '@material/react-button/dist/button.css';
import Card, {
  CardMedia
} from "@material/react-card";
import '@material/react-card/dist/card.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import { useUser } from '../../../context/user-context';
import { GetRecipeById } from '../../../actions/Recipe/GetRecipe'
import { Redirect, Link } from 'react-router-dom';


export default function ViewRecipe({ match }) {
  const [Recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeFound, setRecipeFound] = useState(true);
  const [Picture, setPicture] = useState("");
  const user = useUser();



  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true)
      const recipe = await GetRecipeById(match.params.id)
      console.log(recipe);
      if (recipe === null) {
        setRecipeFound(false);
      } else {
        setRecipe(recipe);
        setPicture(new Buffer(recipe.picture.data.data).toString('base64'))
      }
      setIsLoading(false)
    };
    if (match.params.id === undefined) {
      setRecipeFound(false);
      setIsLoading(false);
    } else {
      getRecipe();
    }

  }, [])



  const style = {
    ViewRecipe: {
      margin: "1em",
      display: "grid",
      gridRowGap: "0.5em",
      gridTemplateColumns: "minmax(25%, 50em)",
      justifyContent: "center"
    },
    Card: {
      margin: "1em"
    },
    Content: {
      display: "grid",
      gridRowGap: "0.5em",
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
      padding: "1em",
      display: "grid",
      justifyItems: "end"
    },
    EditRecipeLink: {
      display: "grid",
      textDecoration: "none",
      width: "100%"
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (<div>"loading"</div>) : (
        RecipeFound ?
          <div style={style.ViewRecipe}>
            <Card style={style.Card}>
              <CardMedia style={style.Picture} wide imageUrl={`data:${Recipe.picture.contentType};base64,${Picture}`}><div style={style.Name}><h1 style={style.NameText}>{Recipe.name}</h1></div></CardMedia>
              <div style={style.Content}>
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
                {user.loggedIn ? (<Link style={style.EditRecipeLink} to={{ pathname: '/recipe/edit/' + Recipe._id, state: { recipe: Recipe } }}><Button raised>Edit Recipe</Button></Link>) : null}

              </div>
            </Card>
          </div>
          : <Redirect to="/" />
      )}
    </React.Fragment>);
}

