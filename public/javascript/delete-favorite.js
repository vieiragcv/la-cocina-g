async function handleRemoveFavorite(recipe_id) {
    const response = await fetch(`/api/favorites`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({recipe_id})
    });
    if (response.ok) {
      document.getElementById('add-favorite-btn').classList.remove("d-none");
      document.getElementById('remove-favorite-btn').classList.add("d-none");
    } else {
      alert(response.statusText);
    }
  }