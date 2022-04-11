async function handleAddFavorite(recipe_id) {
    const response = await fetch(`/api/favorites/recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({recipe_id})
    });
    if (response.ok) {
      document.getElementById('add-favorite-btn').classList.add("d-none");
      document.getElementById('remove-favorite-btn').classList.remove("d-none");
    } else {
      alert(response.statusText);
    }
  }