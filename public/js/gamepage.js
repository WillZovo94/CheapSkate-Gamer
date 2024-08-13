// handles submitting a new review form
document.getElementById('new-review-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('testing');
  
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();
    const rating = document.getElementById('rating').value;
  
    if (title && body && rating) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          rating,
          
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