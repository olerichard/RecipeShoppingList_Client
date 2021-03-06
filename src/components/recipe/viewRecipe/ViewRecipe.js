import React, { useState, useEffect } from 'react';
import '@material/react-button/dist/button.css';
import Card, {
  CardMedia
} from "@material/react-card";
import '@material/react-card/dist/card.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import { UseUser } from '../../../context/user-context';
import { GetRecipeById } from '../../../actions/Recipe/GetRecipe'
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string'
import {useSpring,animated} from 'react-spring'
import {standardSpringFadeIn} from '../../../animations/animations'
import {ChipSet, Chip} from '@material/react-chips';
import "@material/react-chips/dist/chips.css";


export default function ViewRecipe({ location }) {
  const [Recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [RecipeFound, setRecipeFound] = useState(true);
  const [Picture, setPicture] = useState("");
  const user = UseUser().User;

  useEffect(() => {
    const getRecipe = async (id) => {
      setIsLoading(true)

      const recipe = await GetRecipeById(id)
      console.log(recipe);
      if (recipe === null) {
        setRecipeFound(false);
      } else {
        setRecipe(recipe);
        setPicture(new Buffer(recipe.picture.data.data).toString('base64'))
      }
      setIsLoading(false)
    };

    const values = queryString.parse(location.search)
    if (values.id === undefined) {
      setRecipeFound(false);
      setIsLoading(false);
    } else {
      getRecipe(values.id);
    }

  },[location])

  const animateViewRecipe = useSpring({...standardSpringFadeIn})

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
    },
    MainList :{
      listStyleType: "none"
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (<div>"loading"</div>) : (
        RecipeFound ?
        <animated.div style={animateViewRecipe}>
          <div style={style.ViewRecipe}>
            <div>
            <Card style={style.Card}>
              <CardMedia style={style.Picture} wide imageUrl={`data:${Recipe.picture.contentType};base64,${Picture}`}><div style={style.Name}><h1 style={style.NameText}>{Recipe.name}</h1></div></CardMedia>
              <div style={style.Content}>
                <ul style={style.MainList} >
                  <li>  
                    <h2>Ingredients:</h2>
                    {Recipe.ingredients.map((ing, idx) => {
                      return (
                        <ul style={style.IngredientRow} key={`ing${idx}`}>
                          <li> {ing.amount} {ing.unit.name} off {ing.name}</li>
                        </ul>
                      )
                    })}
                  </li>
                  <li> 
                    <h2>Steps:</h2>
                    <ul>
                    {Recipe.cookingSteps.map((step, idx) => {
                      return (
                        <li key={`step${idx}`}>
                          {step}
                        </li>
                      )
                    })}
                    </ul>
                  </li>
                  <li>
                    <h2>Tags:</h2>
                    <ChipSet>
                      {Recipe.tags.map((t,i) => <Chip key={t+i} id={i} label={t} />)}
                    </ChipSet>
                  </li>
                </ul>
                {user.loggedIn ? (<Link style={style.EditRecipeLink} to={'/recipe/edit?id=' + Recipe._id}><Button raised>Edit Recipe</Button></Link>) : null}
              </div>
            </Card>
            </div>
          </div></animated.div>
          : <Redirect to="/" />
      )}
    </React.Fragment>);
}

