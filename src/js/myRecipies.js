import {loadHeaderFooter, qs, setLocalStorage, getLocalStorage, selectAllCards, addCardEventListeners} from './utils.mjs';
import { displayLocalRecipesDetails, renderLocalRecipeCards} from './renderUI.mjs';

const form = qs('#recipeForm');
const ingredientsList = qs('#listOfIngredients');
const ingredientInput = qs('#ingredient');
const addIngredientBtn = qs('#addIngredient');



const ingredientsArray = [];

if(localStorage.getItem('recipies') === null){
    localStorage.setItem('recipies', JSON.stringify([])); // creating the item in the local storage in case is not present 
}

const myRecipiesData = getLocalStorage('recipies');
const recipiesContainer = qs('#recipies-container');



if(myRecipiesData.length >= 0) {  // checking if there is any recipe in the local storage and if there are recipes the placeholder card is deleted 
    recipiesContainer.innerHTML = ''
}


addIngredientBtn.addEventListener('click', () => { // adding the functionalities to the add ingredient button
    const ingredient = ingredientInput.value
    if(ingredient) {
        ingredientsArray.push(ingredient);
        ingredientsList.value = ingredientsArray.join('\n');
        ingredientInput.value = '';
    }
})

form.addEventListener('submit', (event) => {  // adding the event listener to process the datat when the user sends the form 
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    formObject.ingredients = formObject.ingredients.split('\n') // converting the ingredient from plan text to an array
    
    setLocalStorage('recipies', formObject); //adding the recipe to the local storage'

    form.reset() // cleaning all the inputs in the form
    location.reload()
})


renderLocalRecipeCards(recipiesContainer);
const cards = selectAllCards();
addCardEventListeners(myRecipiesData, cards, displayLocalRecipesDetails)

loadHeaderFooter();