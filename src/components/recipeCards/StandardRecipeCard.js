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

  const style = {
    linkStyle: {
      textDecoration: "none",
      color: "black"
    }
  }

  return (
    <Card>
      <Link style={style.linkStyle} to={`/Recipe/${recipe._id}`}>
        <CardPrimaryContent>
          <CardMedia wide imageUrl={require('../../pictures/' + recipe.picture)} />
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