import {fectchDetailsById} from './ExternalServices.mjs';


// shortcout for query selector 

export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// function to load the template from the partials 

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

// function to render templates 

export async function renderTemplate(
    template,
    parentElement,
    data,
    callback
    ) {
        parentElement.insertAdjacentHTML('afterbegin', template);

        if(callback) {
            callback(data);
        }
    }


// function to dinamically render the footer and header 
export async function loadHeaderFooter () {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    const headerElement = qs('header');
    const footerElement = qs('footer');

    renderTemplate(header, headerElement);
    renderTemplate(footer, footerElement);
}

// function to add the event listener to the card elements

export function addCardEventListeners(data, cards, callback) {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const recipeId = card.dataset.id;
        
            if(recipeId){
                const recipeData = data.find(recipe => recipe.id == recipeId); // filter the data of the recipe that was clicked

                if(!recipeData.extendedIngredients){
                    fectchDetailsById(recipeId)
                    .then(recipeExtendedData => {
                        callback(recipeExtendedData);
                    })
                    .catch(error => console.error("Error fetching recipe details:", error));
                } else {
                    callback(recipeData);
                }
            } else {
                const recipeName = card.dataset.name
                const recipeData = data.find(recipe => recipe.recipe_name == recipeName)
                callback(recipeData)
            }

            
        })
    });

}
// function to select all the cards available in the page

export function selectAllCards() {
    return document.querySelectorAll('.explore-card');
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : []; 
  }
// save data to local storage
  
export function setLocalStorage(key, data) {
    let myRecipies = getLocalStorage(key);

    if (!Array.isArray(myRecipies)) {
        myRecipies = [];
    }
    myRecipies.push(data);
    localStorage.setItem(key, JSON.stringify(myRecipies));
}