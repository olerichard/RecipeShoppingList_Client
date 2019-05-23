import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';

import App from './App';
import RecipeOverview from './components/recipeOverview/RecipeOverview';
import Recipe from './components/recipe/Recipe';


ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={RecipeOverview} />
      <Route path="/recipe" exact component={Recipe} />
      <Route path="/recipe/:id" exact component={Recipe} />
    </App>
  </BrowserRouter>,
  document.getElementById('root')
)

