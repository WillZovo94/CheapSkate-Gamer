// handles submitting a new review form
document.getElementById('new-review-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const rating = document.getElementById('rating').value;
    const games_id = document.querySelector('input').value;
  
    if (title && body && rating) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          rating,
          games_id
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create review');
      }
    }
  });