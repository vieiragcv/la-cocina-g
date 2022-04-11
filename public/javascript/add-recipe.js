document.getElementById('addRecipeForm').addEventListener('submit', recipeFormHandler)

async function recipeFormHandler(event) {
  event.preventDefault();

  const recipe_name = document.querySelector('input[name="recipe-name"]').value;
  const description = document.querySelector('textarea[name="recipe-description"]').value;
  const steps = document.querySelector('textarea[name="recipe-steps"]').value;
  const ingredients = document.querySelector('textarea[name="recipe-ingredients"]').value;
  const time = document.querySelector('input[name="recipe-cook-time"]').value;
  const servings = document.querySelector('input[name="recipe-servings"]').value;
  const image = document.querySelector('input[name="recipe-image"]').value;

  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify({
      recipe_name,
      description,
      steps,
      ingredients,
      time,
      servings,
      image
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.reload();
  } 
  else {
    alert(response.statusText);
  }
}