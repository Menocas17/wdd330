import {loadHeaderFooter, qs, addCardEventListeners, selectAllCards} from './utils.mjs';
import {fetchRandomRecipes} from './ExternalServices.mjs';
import {displayRecipeDetails, renderRecipeCards} from './renderUI.mjs';

loadHeaderFooter();

const displayExploreContent = async () => { // this function will display the content of the explore page
    const exploreSection = qs('#explore-content');
    const recipes = await fetchRandomRecipes(); // fetching the recipes from the API
    console.log(recipes);

    renderRecipeCards(recipes, exploreSection); // rendering the cards with the recipes

    const cards = selectAllCards(); // selecting all the cards available in the page
    addCardEventListeners(recipes, cards, displayRecipeDetails); // adding the event listener to the cards to display the recipe details when clicked
};
displayExploreContent(); // runs the functions to display the explore content





