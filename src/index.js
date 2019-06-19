import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';

import App from './App';
import RecipeOverview from './components/recipeOverview/RecipeOverview';
import Recipe from './components/recipe/Recipe';
import Login from './components/user/login/Login';
import SignUp from './components/user/signup/SignUp';

ReactDOM.render(

  <BrowserRouter>
    <App>
      <Route path="/" exact component={RecipeOverview} />
      <Route path="/recipe" exact component={Recipe} />
      <Route path="/recipe/:id" exact component={Recipe} />
      <Route path="/recipe/:id/edit" exact component={Recipe} />
      <Route path="/recipe/createRecipe" exact component={Recipe} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
    </App>
  </BrowserRouter>,
  document.getElementById('root')
)

