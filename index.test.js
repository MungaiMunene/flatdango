document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = document.getElementById('movie-details');
    const filmsList = document.getElementById('films');
    const buyButton = document.getElementById('buy-ticket');
    let currentMovie = null;

    function loadMovies() {
        return fetch('http://localhost:3000/films')
            .then(response => response.json())
            .then(movies => {
                movies.forEach(movie => {
                    const li = document.createElement('li');
                    li.textContent = movie.title;
                    li.addEventListener('click', () => displayMovieDetails(movie));
                    filmsList.appendChild(li);
                });
                if (movies.length > 0) {
                    displayMovieDetails(movies[0]);
                }
            });
    }

    function displayMovieDetails(movie) {
        currentMovie = movie;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').querySelector('span').textContent = `${movie.runtime} mins`;
        document.getElementById('showtime').querySelector('span').textContent = movie.showtime;
        document.getElementById('available-tickets').querySelector('span').textContent = movie.capacity - movie.tickets_sold;

        updateBuyButton();
    }

    function updateBuyButton() {
        if (currentMovie.capacity - currentMovie.tickets_sold > 0) {
            buyButton.textContent = 'Buy Ticket';
            buyButton.disabled = false;
        } else {
            buyButton.textContent = 'Sold Out';
            buyButton.disabled = true;
        }
    }

    buyButton.addEventListener('click', () => {
        if (currentMovie.capacity - currentMovie.tickets_sold > 0) {
            currentMovie.tickets_sold++;
            document.getElementById('available-tickets').querySelector('span').textContent = currentMovie.capacity - currentMovie.tickets_sold;
            updateBuyButton();
        }
    });

    loadMovies().then(() => {
        console.log("Movies loaded successfully.");
    }).catch(error => {
        console.error("Error loading movies:", error);
    });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadMovies,
        displayMovieDetails,
        updateBuyButton
    };
}