import React, { Component } from 'react';
import './App.css';
import CreateRecipe from './components/createRecipe/CreateRecipe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateRecipe />
      </div>
    );
  }
}

export default App;
