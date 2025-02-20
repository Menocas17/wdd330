import {loadHeaderFooter, qs, selectAllCards, addCardEventListeners} from './utils.mjs';
import {fetchMealPlan, fetchBulkInfo} from './ExternalServices.mjs';
import {displayRecipeDetails, renderRecipeCards} from './renderUI.mjs';


loadHeaderFooter();

const displayMealPlan = async () => {
    const recipiesContainer = qs('#recipies-container');
    
    const urlParams = new URLSearchParams(window.location.search);
    const calories = urlParams.get('targetCalories'); // getting the calories from the url

    if(calories) {      
        const data = await fetchMealPlan(calories);
        const ids = data.meals.map(meal => meal.id); // getting the ids of the meals from the meal plan
        const mealPlan = await fetchBulkInfo(ids); // fetching the detailed data of the meals from the meal plan
        console.log(mealPlan); // fetching the meal plan from the API
        renderRecipeCards(mealPlan, recipiesContainer);
        const cards = selectAllCards();
        addCardEventListeners(mealPlan, cards, displayRecipeDetails); // adding the event listener to the cards to display the recipe details when clicked
    }
};
displayMealPlan(); // runs the function to display the meal plan\ // initializes the google maps API


