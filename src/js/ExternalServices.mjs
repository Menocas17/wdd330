const apiKey = '7fcf5e52a4604859bf42a2986fec3965';

// creating the function to get the recipes for the explore page 

export const fetchRandomRecipes = async () => {

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=30&apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data.recipes;
    }
    catch (error) {
        console.log(error);
    }
}

// function to fecth the search paramerters from the API

export const fetchSearchRecipes = async (searchQuery) => {

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&addRecipeInformation=true&apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.log(error);
    }
}

// function to fect the details of a recipe by ID

export const fectchDetailsById = async (id) => {

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

