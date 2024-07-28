document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    loadFirstMovie();
});

async function loadMovies() {
    try {
        const response = await fetch('http://localhost:3000/films');
        const movies = await response.json();
        const filmsList = document.getElementById('films');
        
        if (filmsList) {
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.addEventListener('click', () => displayMovieDetails(movie));
                filmsList.appendChild(li);
            });
        } else {
            console.error("Films list element not found in the DOM.");
        }
    } catch (error) {
        console.error('Error loading all movies:', error);
    }
}

async function loadFirstMovie() {
    try {
        const response = await fetch('http://localhost:3000/films');
        const movies = await response.json();
        if (movies.length > 0) {
            displayMovieDetails(movies[0]);
        }
    } catch (error) {
        console.error('Error loading the first movie:', error);
    }
}

function displayMovieDetails(movie) {
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtimeSpan = document.getElementById("runtime").querySelector("span");
    const showtimeSpan = document.getElementById("showtime").querySelector("span");
    const availableTicketsSpan = document.getElementById("available-tickets").querySelector("span");
    const buyButton = document.getElementById("buy-ticket");

    if (poster && title && runtimeSpan && showtimeSpan && availableTicketsSpan && buyButton) {
        poster.src = movie.poster;
        title.textContent = movie.title;
        runtimeSpan.textContent = `${movie.runtime} mins`;
        showtimeSpan.textContent = movie.showtime;
        availableTicketsSpan.textContent = movie.capacity - movie.tickets_sold;

        updateSoldOutStatus(movie);

        buyButton.onclick = () => buyTicket(movie);
    }
}

function buyTicket(movie) {
    const availableTicketsSpan = document.getElementById("available-tickets").querySelector("span");
    if (movie.tickets_sold < movie.capacity) {
        movie.tickets_sold += 1;
        availableTicketsSpan.textContent = movie.capacity - movie.tickets_sold;
        updateSoldOutStatus(movie);
    }
}

function updateSoldOutStatus(movie) {
    const availableTicketsSpan = document.getElementById("available-tickets").querySelector("span");
    const buyButton = document.getElementById("buy-ticket");

    if (movie.tickets_sold >= movie.capacity) {
        availableTicketsSpan.textContent = 'Sold Out';
        buyButton.disabled = true;
    } else {
        buyButton.disabled = false;
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadMovies,
        loadFirstMovie,
        displayMovieDetails,
        buyTicket,
        updateSoldOutStatus
    };
}