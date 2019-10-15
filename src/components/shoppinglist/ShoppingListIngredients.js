import React  from 'react'
import {ReduceShoppingListToIngredients} from '../../actions/ShoppingList/ShoppingListActions'
import List, {ListItem, ListItemText} from '@material/react-list';
import '@material/react-list/dist/list.css';
import {useTrail,animated} from 'react-spring'


export default function ShoppingListIngredients(recipes) {

    const ingredientsList = ReduceShoppingListToIngredients(recipes);
    
    const animateList= useTrail(ingredientsList.length,{
        opacity: 1,
        transform: 'translate3d(0,0,0)',
        from: { opacity: 0 ,transform: 'translate3d(0,-70px,0)' },
        config : { duration:500 }
    });

    return (
        <List twoLine>
        {animateList.map((props,i) => {
            return( 
                <animated.div key={ingredientsList[i].name} style={props}>
                    <ListItem key={ingredientsList[i].name}>
                        <ListItemText
                            primaryText={ingredientsList[i].name}
                            secondaryText= {ingredientsList[i].amount.toString() + " " +  ingredientsList[i].unit}  
                        />
                    </ListItem>
                </animated.div>
           )
        })} 
        </List>
    )
}