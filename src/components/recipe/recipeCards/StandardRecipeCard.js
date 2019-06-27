import React from 'react';
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
} from "@material/react-card";
import '@material/react-card/dist/card.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import { Link } from 'react-router-dom'

export default function StandardRecipeCard({ recipe }) {

  const picture = new Buffer(recipe.picture.data.data).toString('base64')

  const style = {
    linkStyle: {
      textDecoration: "none",
      color: "black"
    }
  }

  return (
    <Card>
      <Link style={style.linkStyle} to={`/recipe?id=${recipe._id}`}>
        <CardPrimaryContent>
          <CardMedia wide imageUrl={`data:${recipe.picture.contentType};base64,${picture}`} />
          <h2 >{recipe.name}</h2>
        </CardPrimaryContent>
      </Link>
      <CardActions>
        <CardActionButtons>
          <Button>Open Recipe</Button>
        </CardActionButtons>
      </CardActions>
    </Card >
  );
}