// Get the title and transform it into a slug
const title = document.querySelector('title').textContent.toLowerCase().replace(/[^\w]+/g, '-');

// Check if the recipe data is already stored in Local Storage
let recipeData = localStorage.getItem('recipeData');

if (recipeData) {
  // If the recipe data is already in Local Storage, parse it into a JavaScript object
  recipeData = JSON.parse(recipeData);
  // Find the recipe in the parsed data that matches the title
  const recipe = recipeData.find(recipe => recipe.slug === title);
  // Use the recipe data to populate the recipe page
  populateRecipePage(recipe);
} else {
  // If the recipe data is not already in Local Storage, fetch it from the remote JSON file
  fetch('https://raw.githubusercontent.com/insky2/Rezept/master/recipes.json')
    .then(response => response.json())
    .then(data => {
      // Store the recipe data in Local Storage
      localStorage.setItem('recipeData', JSON.stringify(data));
      // Find the recipe in the JSON data that matches the title
      const recipe = data.find(recipe => recipe.slug === title);
      // Use the recipe data to populate the recipe page
      populateRecipePage(recipe);
    })
    .catch(error => console.error(error));
}

function populateRecipePage(recipe) {
  // Set the values of the HTML elements using the recipe data
  document.getElementById('recipe-name').textContent = recipe.name;
  document.getElementById('recipe-tags').textContent = recipe.tags.join(', ');
  document.getElementById('recipe-created').textContent = recipe.created;
  document.getElementById('recipe-lastModified').textContent = recipe.lastModified;
  document.getElementById('recipe-author').textContent = recipe.author;
  document.getElementById('recipe-cookingtime').textContent = recipe.cookingtime;
  document.getElementById('recipe-servings').textContent = recipe.servings;
  document.getElementById('recipe-quelle').textContent = recipe.quelle;
  document.getElementById('recipe-headerimage').src = recipe.headerimage;
  document.getElementById('recipe-headerimage').alt = recipe.name;
  document.getElementById('recipe-description').textContent = recipe.description;
  document.getElementById('recipe-instructions').textContent = recipe.instructions;
  document.getElementById('recipe-notes').textContent = recipe.notes;

  // Loop through the ingredients array and create a list item element for each ingredient
  const ingredientsList = document.getElementById('recipe-ingredients');
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });
}


