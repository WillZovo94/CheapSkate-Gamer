// Handles searching a game by name
const handleGameSearch = async (event) => {
    event.preventDefault();
    const titleSearch = document.querySelector('#title-search').value.trim();
    console.log(titleSearch, 'titleSearch')
    const test = JSON.stringify({
        title: titleSearch
      })
      console.log(test, ' test json obj')

    const response = await fetch('/api/game', {
        method: 'POST',
        body: JSON.stringify({ titleSearch }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response, 'response')

    // Takes you to the game page of this specific game
    if (response.ok) {
        console.log(response, 'response is okay')
        document.location.replace(`/game/${response.id}`);
    } else {
        alert(response.statusText);
    }
};

// Handles finding games based on genre
const handleGenreSearch = async (event) => {
    event.preventDefault();
    const genreSearch = document.querySelector('#genre-search').value;

    // takes you to a page that shows multiple games of this genre
    document.location.replace(`/game/${genreSearch}`);
};

document.querySelector('.title-form').addEventListener('submit', handleGameSearch);
document.querySelector('.genre-form').addEventListener('submit', handleGenreSearch);