import { getLocalStorage, qs, setLocalStorage} from './utils.mjs';

// function to displau the recipe details in a modal 

export const displayRecipeDetails = async (data) => {
    const modal = qs('#meal-details-modal');

    

    const ingredientsList = data.extendedIngredients.map(ingredient => { // the api delivers the data of the ingredients in a array of objects, so we need to map through it to get the name of the ingredients
        return `<li>${ingredient.original}</li>`;
    }).join('');

    let instructions;

    if(data.instructions.trim().startsWith('<')) { // Sometimes the api delivers the instructions in a html format, so we need to check if the instructions start with a '<' to know if we need to render it inside a div or a p tag
        instructions = `
            <div class="intructions-list">
                ${data.instructions}
            </div>
        `;
    } else {
        instructions = `
            <p class = "intructions">${data.instructions}</p>
        `;
    }

    modal.innerHTML = `

    <h3>${data.title}</h3>
    <button id="closeModal">X</button>

    <img src="${data.image}" class="box-shadow" loading="lazy" width="350" height="350">

    <div class="container modal-container">
        <h4>Ingredients</h4>
        <ul class="ul-normalize">
            ${ingredientsList}
        </ul>
        <h4>Instructions</h4>
        <div class="instructions">
            ${instructions}
        </div>
        
    </div>
    `;

    modal.showModal();
    qs('#closeModal').addEventListener('click', () => {
        modal.close();
    });
};

// function to displat the local recipe details in a modal

export const displayLocalRecipesDetails = async (recipe) => {
    const modal = qs('#meal-details-modal');
    const ingredientsList = recipe.ingredients.map(ingredient => {
        return `<li>${ingredient}</li>`;
    }).join('');
    const  instructions = `
    <p class="intructions-p">
        ${recipe.instructions}
    </p>
`;

    modal.innerHTML = `

    <h3>${recipe.recipe_name}</h3>
    <button id="closeModal">X</button>


    <div class="container modal-container">
        <h4>Ingredients</h4>
        <ul class="ul-normalize">
            ${ingredientsList}
        </ul>
        <h4>Instructions</h4>
        ${instructions}

        <button id="deleteRecipe" class="btn delete-button">Delete Recipe</button>
    </div>
    `;

    modal.showModal();
    qs('#closeModal').addEventListener('click', () => {
        modal.close();
    });


    const delteRecipeBtn = qs('#deleteRecipe');
    delteRecipeBtn.addEventListener('click', ()=> { // adding the functionality to delete to the button 
        let recipies = getLocalStorage('recipies');
        const index = recipies.findIndex(item => item.recipe_name == recipe.recipe_name); // finding the recipe index by looking for the recipe name

        if (index !== -1) {
            recipies.splice(index, 1);
        }

        localStorage.clear();
        setLocalStorage('recipies', recipies); // sacwe the recipe again the local storage
        location.reload(); // reload the page
    });

};

// function to render local recipes cards

export const renderLocalRecipeCards = async (parenElement) => {
    const recipes = getLocalStorage('recipies');
    recipes.forEach(recipe => { 
        const card = `
            <article class="explore-card myrecipies-card" data-name="${recipe.recipe_name}">
            <h2 class="explore-card-content">${recipe.recipe_name}</h2>
            </article>
        `;
        parenElement.insertAdjacentHTML('beforeend', card);
    });
};

// function to render the cards with the recipes 

export const renderRecipeCards = (recipes, parentElement) => {
    recipes.forEach(recipe => { 
        const card = `
            <article class="explore-card" data-id="${recipe.id}" style="--bg-image: url(${recipe.image});">
            <h2 class="explore-card-content">${recipe.title}</h2>
            </article>
        `;
        parentElement.insertAdjacentHTML('beforeend', card);
    });
};