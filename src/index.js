import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';

import App from './App';
import RecipeOverview from './components/recipeOverview/RecipeOverview';
import CreateRecipe from './components/createRecipe/CreateRecipe';
import ViewRecipe from './components/viewRecipe/ViewRecipe';


ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={RecipeOverview} />
      <Route path="/createRecipe" exact component={CreateRecipe} />
      <Route path="/recipe/:id" exact component={ViewRecipe} />
    </App>
  </BrowserRouter>,
  document.getElementById('root')
)

