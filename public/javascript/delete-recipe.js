async function handleDeleteRecipe(id) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
