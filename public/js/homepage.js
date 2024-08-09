// Handles searching a game by name
const handleGameSearch = async (event) => {
    event.preventDefault();
    const titleSearch = document.querySelector('#title-search').value.trim();

    const response = await fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({ titleSearch }),
        header: { 'Content-Type': 'application/json' },
    });

    // Takes you to the game page of this specific game
    if (response.ok) {
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
    document.location.replace(`/api/games/genre/${genreSearch}`);
};

document.querySelector('.title-form').addEventListener('submit', handleGameSearch);
document.querySelector('.genre-form').addEventListener('submit', handleGenreSearch);