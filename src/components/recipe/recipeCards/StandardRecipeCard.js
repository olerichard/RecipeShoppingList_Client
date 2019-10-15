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
import {AddToShoppingList, RemoveFromShoppingList} from '../../../actions/user/ShoppingList'
import { UseShoppingList } from '../../../context/shoppingList-context';

export default function StandardRecipeCard({ recipe, listId }) {

  const picture = new Buffer(recipe.picture.data.data).toString('base64')

  const style = {
    linkStyle: {
      textDecoration: "none",
      color: "black"
    }
  }
  const shoppingListContext = UseShoppingList();
  const shoppingList = shoppingListContext.ShoppingList;
  const showAddToShoppingList = (listId === undefined || listId === "" || shoppingList === undefined || shoppingList === "No User" || shoppingList.recipes.some(r=> r._id === recipe._id)) ? false : true;  

  async function  addToShoppingList(list,id){
    await AddToShoppingList(list,id);
    shoppingListContext.UpdateShoppingList();
  }

  async function  removeFromShoppingList(list,id){
    await RemoveFromShoppingList(list,id);
    shoppingListContext.UpdateShoppingList();
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
          <Link style={style.linkStyle} to={`/recipe?id=${recipe._id}`}>
            <Button>Open Recipe</Button>
          </Link>
        </CardActionButtons>
        {
           showAddToShoppingList ?   
          <CardActionButtons>
            <Button onClick={() => addToShoppingList(listId,recipe._id)}   >Add to ShoppingList</Button>
          </CardActionButtons>
          :<CardActionButtons>
            <Button onClick={() => removeFromShoppingList(listId,recipe._id)}   >Remove From ShoppingList</Button>
          </CardActionButtons>
        }
      </CardActions>
    </Card >
  );
}