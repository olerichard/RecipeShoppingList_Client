import React, { useState } from 'react'
import CloneDeep from 'lodash/cloneDeep'
import SaveRecipe from '../../actions/SaveRecipe'
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import MaterialIcon from '@material/react-material-icon';
import Select, { Option } from '@material/react-select';
import '@material/react-select/dist/select.css';
import Dialog, { DialogTitle, DialogFooter, DialogButton } from '@material/react-dialog';
import "@material/react-dialog/dist/dialog.css";


export default function CreateRecipe() {
  const emptyIngredient = { ingredient: { name: "", valid: false }, unit: { name: "", valid: false }, amount: { name: "", valid: false } }
  const [RecipeInformation, setRecipeInformation] = useState({ name: '', valid: false });
  const [Ingredients, setIngredients] = useState([CloneDeep(emptyIngredient)]);
  const [CookingSteps, setCookingSteps] = useState([""]);
  const [SaveDialog, setSaveDialog] = useState(false);


  const Units = [
    { unit: null, name: null },
    { unit: "KG", name: "Kilo" },
    { unit: "L", name: "Liter" },
    { unit: "DL", name: "DL" },
    { unit: "ML", name: "ML" },
    { unit: "GR", name: "Gram" },
    { unit: "PCS", name: "Pieces" }
  ]

  async function submitRecipe(action) {

    if (action === "dismiss") return setSaveDialog(false)

    const result = await SaveRecipe(RecipeInformation, Ingredients, CookingSteps);
    console.log(result)
    // DO som handling an clean up after recipe has been saved. 
    // Go to View Page perhaps ? 
    setSaveDialog(false)

  }

  function isRecipeValid() {

    const RecipyNameValid = RecipeInformation.valid
    const IngredientsValid = Ingredients.filter((i) => i.ingredient.valid && i.unit.valid && i.amount.valid).length === Ingredients.length
    const CookingStepsValid = CookingSteps.filter((s) => s.length >= 1).length === CookingSteps.length

    return RecipyNameValid && IngredientsValid && CookingStepsValid
  }


  function addEmptyIngredient(e) {
    e.preventDefault()
    return setIngredients([...Ingredients, CloneDeep(emptyIngredient)])
  }

  function updateIngedient(e) {
    e.preventDefault()
    const newIngredients = [...Ingredients];
    const [field, id] = e.target.id.split('-');

    if (field === "amount" && e.target.value < 0)
      e.target.value = 0

    newIngredients[id][field].name = e.target.value;
    newIngredients[id][field].valid = e.target.value.length >= 1
    setIngredients(newIngredients);
  }

  function removeIngridient(e) {
    e.preventDefault()
    if (Ingredients.length === 1)
      return setIngredients([{ ingredient: "", unit: "", amount: "" }])

    const newIngredients = [...Ingredients]
    newIngredients.splice(e.target.id, 1)
    setIngredients(newIngredients);
  }

  function addEmptyCookingtStep(e) {
    e.preventDefault();
    return setCookingSteps([...CookingSteps, ""])
  }

  function updateCookingStep(e) {
    e.preventDefault()
    const Steps = [...CookingSteps];
    Steps[e.target.id] = e.target.value;
    setCookingSteps(Steps);
  }

  function removeCookingStep(e) {

    if (CookingSteps.length === 1)
      return setCookingSteps([""])

    const newCookingSteps = [...CookingSteps]
    newCookingSteps.splice(e, 1)
    setCookingSteps(newCookingSteps);
  }

  function openSaveDialog(e) {
    e.preventDefault()
    setSaveDialog(true)
  }

  const style = {
    Form: {
      display: "grid",
      gridRowGap: "0.5em",
    },
    Ingredients: {
      display: "grid",
      gridRowGap: "0.5em",
    },
    IngredientRow: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 2fr",
      gridColumnGap: "8px",

    },
    Step: {
      display: "grid",

    },
    Steps: {
      display: "grid",
      gridRowGap: "0.5em",
    }
  }


  return (
    <div>
      <form style={style.Form} onSubmit={openSaveDialog} autoComplete="off">
        <TextField label="Recipe name"><Input isValid={RecipeInformation.valid} value={RecipeInformation.name} onChange={(e) => setRecipeInformation({ name: e.target.value, valid: e.target.value.length >= 1 })} /></TextField>
        <div className="IngredientsBlock" style={style.Ingredients}>
          {
            Ingredients.map((ing, idx) => {
              return (<div style={style.IngredientRow} key={idx}>
                <TextField label="Ingredient" id={"textField-ingredient-" + idx} trailingIcon={null}><Input isValid={ing.ingredient.valid} id={"ingredient-" + idx} value={ing.ingredient.name} onChange={updateIngedient} /></TextField>
                <TextField label="Amount"><Input isValid={ing.amount.valid} type="number" id={"amount-" + idx} value={ing.amount.name} onChange={updateIngedient} /></TextField>
                <Select label="Unit" id={"unit-" + idx} value={ing.unit.name} onChange={updateIngedient}>
                  {
                    Units.map((unit) => {
                      return (
                        <Option key={unit.unit} value={unit.unit}>{unit.name}</Option>
                      )
                    })
                  }
                </Select>
                {/*<IconButton id={idx} onClick={removeIngridient}><MaterialIcon icon='delete_outlined' /></IconButton>*/}
              </div>)
            })
          }
        </div>
        <Button raised onClick={addEmptyIngredient}>Add Ingredient</Button>
        <div className="StepsBlock" style={style.Steps}>
          {
            CookingSteps.map((step, idx) => {
              return (<div key={idx} style={style.Step}>
                <TextField trailingIcon={<MaterialIcon role="button" icon="delete" />} onTrailingIconSelect={removeCookingStep.bind(idx)} label={"Step " + (idx + 1)} textarea ><Input style={{ resize: "none" }} id={idx} value={step} onChange={updateCookingStep} /></TextField>
                {/*<IconButton id={idx} onClick={removeCookingStep}><MaterialIcon icon='delete_outlined' /></IconButton>*/}
              </div>)
            }
            )
          }
        </div>
        <Button raised onClick={addEmptyCookingtStep}>Add Step</Button>
        <br />
        <Button raised disabled={!isRecipeValid()} type="submit"> Submit </Button>
        <Dialog
          onClose={(action) => submitRecipe(action)}
          open={SaveDialog}>
          <DialogTitle>Save {RecipeInformation.name} ?</DialogTitle>
          <DialogFooter>
            <DialogButton action='dismiss'>No</DialogButton>
            <DialogButton action='confirm' isDefault>Yes</DialogButton>
          </DialogFooter>
        </Dialog>
      </form >
    </div>
  )
}



