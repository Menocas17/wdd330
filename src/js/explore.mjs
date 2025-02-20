import {loadHeaderFooter, qs} from './utils.mjs';
import {fetchRandomRecipes} from './ExternalServices.mjs';
import {displayRecipeDetails} from './renderUI.mjs';

loadHeaderFooter();

const displayExploreContent = async () => { // this function will display the content of the explore page
    const exploreSection = qs('#explore-content');
    const recipes = await fetchRandomRecipes(); // fetching the recipes from the API
    console.log(recipes);

    recipes.forEach(recipe => { 
        const card = `
            <article class="explore-card" data-id="${recipe.id}" style="--bg-image: url(${recipe.image});">
            <h2 class="explore-card-content">${recipe.title}</h2>
            </article>
        `;
        exploreSection.insertAdjacentHTML('beforeend', card);
    });

    const cards = document.querySelectorAll('.explore-card');
    console.log(cards);
    cards.forEach(card => {
    card.addEventListener('click', () => {
        const recipeId = card.dataset.id;
        const recipeData = recipes.find(recipe => recipe.id == recipeId); // filter the data of the recipe that was clicked
        console.log(recipeData);
        displayRecipeDetails(recipeData);
    })
});
};
displayExploreContent(); // runs the functions to display the explore content





