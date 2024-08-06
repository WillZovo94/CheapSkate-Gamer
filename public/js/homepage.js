const handleGameSearch = async (event) => {
    event.preventDefault();
    const titleSearch = document.querySelector('#title-search').value.trim();
    const genreSearch = document.querySelector('#genre-search').value;

    if (titleSearch && !genreSearch) {
        const response = await fetch('/api/game', {
            method: 'POST',
            body: JSON.stringify({ titleSearch }),
            header: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/game/${response.id}`); // Takes you to the profile of this one game
        } else {
            alert(response.statusText);
        }
    };

    if (genreSearch && !titleSearch) {

        if (response.ok) {
            document.location.replace(`/game/${genreSearch}`); // takes you to a page that shows multiple games of this genre
        } else {
            alert(response.statusText);
        }
    };

};

document.querySelector('.search-form').addEventListener('submit', handleGameSearch);