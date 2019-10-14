import React,{useState}  from 'react'
import StandardRecipeCard from '../recipe/recipeCards/StandardRecipeCard';
import ShoppingListIngredients from '../../components/shoppinglist/ShoppingListIngredients'
import { UseShoppingList } from '../../context/shoppingList-context';
import { UseSettings } from '../../context/settings-context';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import '@material/react-tab-bar/dist/tab-bar.css';
import '@material/react-tab-scroller/dist/tab-scroller.css';
import '@material/react-tab/dist/tab.css';
import '@material/react-tab-indicator/dist/tab-indicator.css';

 export default function ShoppingList() {
  
  const shoppingList = UseShoppingList().ShoppingList;
  const settings = UseSettings().Settings.ShoppingList;
  const renderList = (settings.showList && shoppingList.recipes !== undefined && shoppingList.recipes !== null && shoppingList.recipes !== "" && shoppingList.recipes.length > 0 );
  
  const [ActiveIndex,SetActiveIndex] = useState(settings.showRecipes ? 0:1);

  const style = {
    ShoppingList: {
      width: "100%",
      display: "flex",
      flexDirection:"column",
    },
    Card:{
      marginTop:"1em",
      marginRight:"1em",
    }
  }

  return (
    <React.Fragment>{
      renderList ?(
        <div style={style.ShoppingList} >  
          <TabBar  activeIndex={ActiveIndex} handleActiveIndexUpdate={(activeIndex => SetActiveIndex(activeIndex))}>
            <Tab><span className='mdc-tab__text-label'>Recipes</span></Tab>
            <Tab><span className='mdc-tab__text-label'>Ingredients</span></Tab>
          </TabBar>
          { ActiveIndex === 0 ?
            shoppingList.recipes.map((item) => {
              return (
                <div key={item._id} style={style.Card}>
                  <StandardRecipeCard key={item._id} recipe={item} listId={shoppingList._id} />
                </div>
              )
            }) : <ShoppingListIngredients recipes={shoppingList.recipes}/>
          }
        </ div>
      ) 
      : null
    }</React.Fragment> 
  )
}
