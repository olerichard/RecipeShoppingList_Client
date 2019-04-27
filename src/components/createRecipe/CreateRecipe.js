import React, { useState } from 'react'
import SaveRecipe from '../../actions/SaveRecipe'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function CreateRecipe() {
  const [RecipeName, setRecipeName] = useState('');
  const [Ingredients, setIngredients] = useState([{ ingredient: "", unit: "", amount: "" }]);

  async function submitRecipe(e) {
    e.preventDefault()
    const result = await SaveRecipe(RecipeName, Ingredients);
    // DO som handling an clean up after recipe has been saved. 
    // Go to View Page perhaps ? 
  }

  function addEmptyIngredientLine(e) {
    return setIngredients([...Ingredients, { ingredient: "", unit: "", amount: "" }])
  }

  function removeIngridientLine(line) {
    if (Ingredients.length === 1) {
      setIngredients([{ ingredient: "", unit: "", amount: "" }])
      return
    }

    const newIngredients = [...Ingredients]
    newIngredients.splice(line, 1)
    setIngredients(newIngredients);
  }


  function updateIngedient(e) {
    const newIngredients = [...Ingredients];
    const field = e.target.id.split('-');
    newIngredients[field[1]][field[0]] = e.target.value;
    setIngredients(newIngredients);
  }

  return (
    <form onSubmit={submitRecipe}>
      <TextField id={"name"} name="name" label="Name" className="textField dense" margin="dense" value={RecipeName} onChange={(e) => setRecipeName(e.target.value)} />
      {Ingredients.map((ing, idx) => {
        return (<div key={idx}>
          <TextField id={"ingredient-" + idx} name="ingredient-" label="ingredient" value={ing.ingredient} className="textField dense" margin="dense" onChange={updateIngedient} />
          <TextField id={"amount-" + idx} label="amount" className="textField dense" value={ing.amount} margin="dense" onChange={updateIngedient} />
          <TextField id={"unit-" + idx} label="unit" className="textField dense" value={ing.unit} margin="dense" onChange={updateIngedient} />
          <IconButton id={"delete-" + idx} className="Delete" aria-label="Delete" onClick={removeIngridientLine.bind(null, idx)} ><DeleteIcon /></IconButton>
        </div>)
      })}
      <Button variant="contained" color="primary" onClick={addEmptyIngredientLine}>Add Ingredient</Button>
      <br />
      <Button type="submit" variant="contained" color="primary"> Submit </Button>
    </form>
  )
}



