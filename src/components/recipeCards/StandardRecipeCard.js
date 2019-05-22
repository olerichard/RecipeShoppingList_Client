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
  return (
    <Card className='mdc-card mcd-basic-with-text-over-media'>
      <Link to={`/Recipe/${recipe._id}`}>
        <CardPrimaryContent className='mcd-card__primary-action'>
          <CardMedia className='mcd-card__media' contentClassName='mcd-card__media-content' wide imageUrl={require('../../pictures/' + recipe.picture)} />
          <h2 className='mdc-card__title'>{recipe.name}</h2>
        </CardPrimaryContent>
      </Link>
      <CardActions>
        <CardActionButtons>
          <Button>Open Recipe</Button>
        </CardActionButtons>
      </CardActions>
    </Card>
  );
}