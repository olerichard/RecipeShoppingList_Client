import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';

import App from './App';

import Login from './components/user/login/Login';
import Logout from './components/user/logout/Logout';
import SignUp from './components/user/signup/SignUp';

import { UserProvider } from './context/user-context'
import { ShoppingListProvider } from './context/shoppingList-context'
import { SettingsProvider } from './context/settings-context'

import RecipeOverview from './components/recipe/recipeOverview/RecipeOverview';
import EditRecipe from './components/recipe/editRecipe/EditRecipe';
import ViewRecipe from './components/recipe/viewRecipe/ViewRecipe';
import CreateRecipe from './components/recipe/createRecipe/CreateRecipe';


ReactDOM.render(
  <BrowserRouter>
   <UserProvider>
      <ShoppingListProvider>
        <SettingsProvider>
          <App >
            <Route path="/" exact component={RecipeOverview} />
            <Route path="/recipe/" exact component={ViewRecipe} />
            <Route path="/recipe/edit" exact component={EditRecipe} />
            <Route path="/recipe/createRecipe" exact component={CreateRecipe} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/signup" exact component={SignUp} />
          </App>
        </SettingsProvider>
      </ShoppingListProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

