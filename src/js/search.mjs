import {loadHeaderFooter, qs, selectAllCards, addCardEventListeners} from './utils.mjs';
import {fetchSearchRecipes} from './ExternalServices.mjs';
import {displayRecipeDetails, renderRecipeCards} from './renderUI.mjs';

loadHeaderFooter();
export const searchRecipe = async () => { // this function will get the search query from the input, fetch the data from the api, and display the results
    const recipiesContainer = qs('#recipies-container');
    const searchMain = qs('#search-main'); 

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if(query) {
        const recipes = await fetchSearchRecipes(query);    // fetching the recipes from the API
        renderRecipeCards(recipes, recipiesContainer);
        const cards = selectAllCards();
        addCardEventListeners(recipes, cards, displayRecipeDetails)
    }
}

searchRecipe(); // runs the function to display the search results