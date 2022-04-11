async function handleDeleteComment(id) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
