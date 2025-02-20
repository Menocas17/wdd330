import {loadHeaderFooter, qs} from './utils.mjs';
import {fetchRandomRecipes} from './ExternalServices.mjs';

const displayExploreContent = async () => { // this function will display the content of the explore page
    const exploreSection = qs('#explore-content');
    const recipes = await fetchRandomRecipes(); // fetching the recipes from the API
    console.log(recipes);

    recipes.forEach(recipe => { 
        const card = `
            <article class="explore-card" data-name="${recipe.id}" style="--bg-image: url(${recipe.image});">
            <h2 class="explore-card-content">${recipe.title}</h2>
            </article>
        `;

        exploreSection.insertAdjacentHTML('beforeend', card);
    });
};

displayExploreContent();

loadHeaderFooter();

