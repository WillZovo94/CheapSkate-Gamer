// handles submitting a new review form
document.getElementById('new-review-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('review-title').value.trim();
    const body = document.getElementById('review-body').value.trim();
    const rating = document.getElementById('review-rating').value;
    const games_id = document.getElementById('game-id').value;
    const review =  JSON.stringify({
      title,
      body,
      rating,
      games_id
    })

    if (title && body && rating) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: review,
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create review');
      }
    }
  });