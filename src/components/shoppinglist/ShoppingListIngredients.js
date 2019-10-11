import React  from 'react'
import {ReduceShoppingListToIngredients} from '../../actions/ShoppingList/ShoppingListActions'
import List, {ListItem, ListItemText} from '@material/react-list';
import '@material/react-list/dist/list.css';


export default function ShoppingListIngredients(recipes) {

    console.log("ShoppingListIngredients");
    console.log(recipes);
    const ingredientsList = ReduceShoppingListToIngredients(recipes);
    console.log(ingredientsList);

    return (
        <List twoLine>
        {
            Object.keys(ingredientsList).map(ing => 
                <ListItem key={ing}>
                <ListItemText
                    primaryText={ingredientsList[ing].name}
                    secondaryText= { "" + ingredientsList[ing].amount.toString() + " " +  ingredientsList[ing].unit}  />
                </ListItem>
            )
        }
        </List>
    )
}