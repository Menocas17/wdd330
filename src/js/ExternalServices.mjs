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

