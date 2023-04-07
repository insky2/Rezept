// Get the filename from the URL
const url = new URL(window.location.href);
const filename = url.pathname.split('/').pop().replace('.html', '');

// Fetch the recipe data from the JSON file
fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    // Find the recipe in the JSON data that matches the filename
    const recipe = data.recipes.find(recipe => recipe.name.toLowerCase().replace(/\s+/g, '-') === filename);
    
    // Set the values of the HTML elements using the recipe data
    document.getElementById('recipe-name').textContent = recipe.name;
    document.getElementById('recipe-tags').textContent = recipe.tags.join(', ');
    document.getElementById('recipe-created').textContent = recipe.created;
    document.getElementById('recipe-lastModified').textContent = recipe.lastModified;
    document.getElementById('recipe-author').textContent = recipe.author;
    document.getElementById('recipe-cookingtime').textContent = recipe.cookingtime;
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
  })
  .catch(error => console.error(error));
