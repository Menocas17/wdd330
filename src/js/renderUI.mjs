import { qs } from './utils.mjs';

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
        `
    } else {
        instructions = `
            <p class = "intructions">${data.instructions}</p>
        `
    }

    modal.innerHTML = `

    <h3>${data.title}</h3>
    <button id="closeModal">X</button>

    <img src="${data.image}" class="box-shadow" loading="lazy" width="350" height="350">

    <div class="container modal-container">
        <h4>Ingredients</h4>
        <ul class="ul-li-styled">
            ${ingredientsList}
        </ul>
        <h4>Instructions</h4>
        ${instructions}
    </div>
    `;

    modal.showModal();
    qs('#closeModal').addEventListener('click', () => {
        modal.close();
    });
}