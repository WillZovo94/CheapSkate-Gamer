// Handles searching a game by name
const handleGameSearch = async (event) => {
    event.preventDefault();
    const titleSearch = document.querySelector('#title-search').value.trim();

    const response = await fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({ titleSearch }),
        headers: { 'Content-Type': 'application/json' },
    });

    // Takes you to the game page of this specific game
    if (response.ok) {
        const data = await response.json();

        const gameId = data.id;

        document.location.replace(`/game/${gameId}`);
    } else {
        alert(response.statusText);
    }
};

// Handles finding games based on genre
const handleGenreSearch = async (event) => {
    event.preventDefault();
    const genreSearch = document.querySelector('#genre-search').value.trim();
    // takes you to a page that shows multiple games of this genre
    document.location.replace(`/genre/${genreSearch}`);
};

document.querySelector('.title-form').addEventListener('submit', handleGameSearch);
document.querySelector('.genre-form').addEventListener('submit', handleGenreSearch);