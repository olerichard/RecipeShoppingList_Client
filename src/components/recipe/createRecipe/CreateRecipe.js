import React, { useState, useEffect } from 'react'
import CloneDeep from 'lodash/cloneDeep'
import { SaveNewRecipe, SaveEditRecipe } from '../../../actions/Recipe/SaveRecipe'
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import Button from '@material/react-button'
import '@material/react-button/dist/button.css';
import MaterialIcon from '@material/react-material-icon';
import Select, { Option } from '@material/react-select';
import '@material/react-select/dist/select.css';
import Dialog, { DialogTitle, DialogFooter, DialogButton } from '@material/react-dialog';
import "@material/react-dialog/dist/dialog.css";
import IconButton from '@material/react-icon-button';
import '@material/react-icon-button/dist/icon-button.css';
import Card, { CardMedia } from "@material/react-card";
import '@material/react-card/dist/card.css';
import { UseUser } from '../../../context/user-context';
import { Redirect, withRouter } from 'react-router-dom';


function CreateRecipe({ recipe, history }) {
  const emptyIngredient = { ingredient: { name: "", valid: false }, unit: { name: "", valid: true }, amount: { name: "", valid: true } }
  const [RecipeInformation, setRecipeInformation] = useState({});
  const [Ingredients, setIngredients] = useState([]);
  const [CookingSteps, setCookingSteps] = useState([]);
  const [SaveDialog, setSaveDialog] = useState(false);
  const [newRecipe, setNewRecipe] = useState(true);
  const user = UseUser().User;


  const Units = [
    { unit: null, name: null },
    { unit: "KG", name: "Kilo" },
    { unit: "L", name: "Liter" },
    { unit: "DL", name: "DL" },
    { unit: "ML", name: "ML" },
    { unit: "GR", name: "Gram" },
    { unit: "PCS", name: "Pieces" }
  ]

  useEffect(() => {
    if (recipe !== undefined && recipe.hasOwnProperty("_id")) {
      setRecipeInformation({ _id: recipe._id, name: recipe.name, tags: recipe.tags, valid: true, picture: { ...recipe.picture, use: true } });
      setIngredients(MapIngredients(recipe.ingredients));
      setCookingSteps([...recipe.cookingSteps]);
      setNewRecipe(false);
    } else {
      setRecipeInformation({ name: '', valid: false })
      setIngredients([CloneDeep(emptyIngredient)])
      setCookingSteps([""])
    }
  }, [])

  function MapIngredients(ingredients) {
    return ingredients.map((i) => {
      const newIngredient = CloneDeep(emptyIngredient);
      newIngredient.ingredient = { name: i.name, valid: true }
      newIngredient.amount = { name: i.amount, valid: true }
      newIngredient.unit = { name: i.unit, valid: true }
      return newIngredient
    })


  }

  async function submitRecipe(action) {
    if (action === "dismiss") return setSaveDialog(false)

    const result = newRecipe
      ? await SaveNewRecipe(RecipeInformation.name, RecipeInformation.pictureLocal.file, Ingredients, CookingSteps)
      : await SaveEditRecipe(RecipeInformation, Ingredients, CookingSteps);

    if (result.id !== undefined)
      history.push("/recipe?id=" + result.id)

    setSaveDialog(false);
  }

  function close() {
    recipe.hasOwnProperty("_id") ?
      history.push("/recipe?id=" + recipe._id) :
      history.push("/")

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
      return setIngredients([CloneDeep(emptyIngredient)])

    const newIngredients = [...Ingredients]
    newIngredients.splice(e.currentTarget.id, 1)
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

  function handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setRecipeInformation({
        ...RecipeInformation,
        pictureLocal: {
          file: file,
          picture: reader.result,
          use: true
        },
        picture: { ...RecipeInformation.picture, use: false }
      });
    }

    reader.readAsDataURL(file)

  }

  function getPicture() {
    if (RecipeInformation.picture !== undefined && RecipeInformation.picture.use) {
      return `data:${RecipeInformation.picture.contentType};base64,${new Buffer(RecipeInformation.picture.data.data).toString('base64')}`;
    } else if (RecipeInformation.pictureLocal !== undefined && RecipeInformation.pictureLocal.use) {
      return RecipeInformation.pictureLocal.picture;
    }

    return ""
  }


  const style = {
    Form: {
      display: "grid",
      gridRowGap: "0.5em",
      margin: "1em"
    },
    Card: {
      margin: "1em"
    },
    FormCard: {
      margin: "1em",
      display: "grid",
      gridRowGap: "0.5em",
      gridTemplateColumns: "minmax(25%, 50em)",
      justifyContent: "center",
    },
    Ingredients: {
      display: "grid",
      gridRowGap: "0.5em",
      justifyContent: "center",
    },
    IngredientRow: {
      display: "grid",
      gridTemplateColumns: "3fr 1fr 2fr 0.25fr",
      gridColumnGap: "0.5em",
    },
    Step: {
      display: "grid",
    },
    Steps: {
      display: "grid",
      gridRowGap: "0.5em",
      gridTemplateColumns: "1fr",
      marginTop: "1em",
    },
    Margins: {
      margins: "0"
    },
    Button: {
      width: "20em"
    },
    GridCenter: {
      padding: "1em",
      display: "grid",
      justifyContent: "center"
    },
    GridBottom: {
      padding: "1em",
      display: "grid",
      justifyItems: "end"
    },
    PictureInput: {
      width: "0.1px",
      height: "0.1px",
      opacity: "0",
      overflow: "hidden",
      position: "absolute",
      zIndex: "-1"
    },
    PictureLabel: {
      padding: "1em",
      height: "92%",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",

    }
  }


  return (
    <React.Fragment>
      {user.loggedIn ?
        (<div style={style.FormCard}>
          <div>
          <Card style={style.Card}>
            <CardMedia style={style.GridBottom} wide imageUrl={getPicture()}>
              <Input style={style.PictureInput} type="file" name="file" id="file" accept="image/gif,image/png,image/jpeg" onChange={(e) => handleImageChange(e)} />
              <div style={style.PictureLabel}>
                <label className="mdc-button mdc-ripple-upgraded mdc-button--raised" htmlFor="file">Choose a picture</label>
              </div>
            </CardMedia>
            <div>
              <form style={style.Form} onSubmit={openSaveDialog} autoComplete="off">
                <h1 style={style.Margins}>Recipe Name:</h1>
                <TextField ><Input isValid={RecipeInformation.valid} value={RecipeInformation.name} onChange={(e) => setRecipeInformation({ ...RecipeInformation, name: e.target.value, valid: e.target.value.length >= 1 })} /></TextField>
                <div className="IngredientsBlock" style={style.Ingredients}>
                  <div style={style.IngredientRow}><h2 style={style.Margins} >Ingredient</h2> <h2 style={style.Margins}>Amount</h2><h2 style={style.Margins}>Unit</h2></div>
                  {
                    Ingredients.map((ing, idx) => {
                      return (<div style={style.IngredientRow} key={idx}>
                        <TextField id={"textField-ingredient-" + idx} trailingIcon={null}><Input isValid={ing.ingredient.valid} id={"ingredient-" + idx} value={ing.ingredient.name} onChange={updateIngedient} /></TextField>
                        <TextField ><Input isValid={ing.amount.valid} type="number" id={"amount-" + idx} value={ing.amount.name} onChange={updateIngedient} /></TextField>
                        <Select id={"unit-" + idx} value={ing.unit.name} onChange={updateIngedient}>
                          {
                            Units.map((unit) => {
                              return (
                                <Option key={unit.unit} value={unit.unit}>{unit.name}</Option>
                              )
                            })
                          }
                        </Select>
                        {<IconButton id={idx} onClick={(e) => removeIngridient(e)}><MaterialIcon icon='delete' /></IconButton>}
                      </div>)
                    })
                  }
                  <div style={style.GridCenter}><Button style={style.Button} raised onClick={addEmptyIngredient}>Add Ingredient</Button></div>
                </div>

                <div className="StepsBlock" >
                  <div className="Steps" style={style.Steps}>{
                    CookingSteps.map((step, idx) => {
                      return (<div key={idx} >
                        <TextField id={idx} style={{ width: "100%" }} trailingIcon={<MaterialIcon role="button" icon="delete" />} onTrailingIconSelect={removeCookingStep.bind(null, idx)} label={"Step " + (idx + 1)} textarea ><Input style={{ resize: "none", width: "100%" }} id={idx} value={step} onChange={updateCookingStep} /></TextField>
                      </div>)
                    }
                    )
                  }
                  </div>
                  <div style={style.GridCenter}><Button style={style.Button} raised onClick={addEmptyCookingtStep}>Add Step</Button></div>
                </div>
                <br />
                <Button raised disabled={!isRecipeValid()} type="submit"> Save Recipe </Button>
                <Dialog
                  onClose={(action) => submitRecipe(action)}
                  open={SaveDialog}>
                  <DialogTitle>Save {RecipeInformation.name} ?</DialogTitle>
                  <DialogFooter>
                    <DialogButton action='dismiss'>No</DialogButton>
                    <DialogButton action='confirm' isDefault>Yes</DialogButton>
                  </DialogFooter>
                </Dialog>
                <Button raised onClick={close}>Close Edit Mode</Button>
              </form >
            </div>
          </Card>
          </div>
        </div >) : (<Redirect to="/" />)}
    </React.Fragment>);
}

export default withRouter(CreateRecipe);