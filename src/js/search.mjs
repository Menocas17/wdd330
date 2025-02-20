import {loadHeaderFooter, qs, selectAllCards, addCardEventListeners} from './utils.mjs';
import {fetchSearchRecipes} from './ExternalServices.mjs';
import {displayRecipeDetails, renderRecipeCards} from './renderUI.mjs';

loadHeaderFooter();
const searchRecipe = async () => { // this function will get the search query from the input, fetch the data from the api, and display the results
    const recipiesContainer = qs('#recipies-container');

    const urlParams = new URLSearchParams(window.location.search); // getting the search query from the url
    const query = urlParams.get('query');

    if(query) {
        const recipes = await fetchSearchRecipes(query);    // fetching the recipes from the API
        renderRecipeCards(recipes, recipiesContainer);
        const cards = selectAllCards();
        addCardEventListeners(recipes, cards, displayRecipeDetails) // adding the event listener to the cards to display the recipe details when clicked
    }
}

searchRecipe(); // runs the function to display the search results