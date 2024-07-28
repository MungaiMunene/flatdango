/**
 * @jest-environment jsdom
 */

const { loadMovies, loadFirstMovie, displayMovieDetails, buyTicket, updateSoldOutStatus } = require('../app');

document.body.innerHTML = `
    <div>
        <h1 id="title">Movie Title</h1>
        <img id="poster" src="" alt="Movie Poster">
        <div id="runtime">Runtime: <span></span></div>
        <div id="showtime">Showtime: <span></span></div>
        <div id="available-tickets">Available Tickets: <span></span></div>
        <button id="buy-ticket">Buy Ticket</button>
    </div>
    <ul id="films"></ul>
`;

const movie = {
    title: "Test Movie",
    poster: "test-poster.jpg",
    runtime: 120,
    showtime: "7:00 PM",
    capacity: 50,
    tickets_sold: 25
};

describe('Flatdango App', () => {
    test('displays movie details', () => {
        displayMovieDetails(movie);

        expect(document.getElementById('poster').src).toContain(movie.poster);
        expect(document.getElementById('title').textContent).toBe(movie.title);
        expect(document.getElementById('runtime').querySelector('span').textContent).toBe(`${movie.runtime} mins`);
        expect(document.getElementById('showtime').querySelector('span').textContent).toBe(movie.showtime);
        expect(document.getElementById('available-tickets').querySelector('span').textContent).toBe(String(movie.capacity - movie.tickets_sold));
    });

    test('updates the sold out status correctly', () => {
        const updatedMovie = { ...movie, tickets_sold: 50 };
        displayMovieDetails(updatedMovie);

        expect(document.getElementById('available-tickets').querySelector('span').textContent).toBe('Sold Out');
        expect(document.getElementById('buy-ticket').disabled).toBe(true);
    });

    test('decreases available tickets when a ticket is bought', () => {
        displayMovieDetails(movie);

        const buyButton = document.getElementById('buy-ticket');
        buyButton.click();

        expect(document.getElementById('available-tickets').querySelector('span').textContent).toBe(String(movie.capacity - movie.tickets_sold));
    });

    test('prevents ticket purchase when sold out', () => {
        const updatedMovie = { ...movie, tickets_sold: 50 };
        displayMovieDetails(updatedMovie);

        const buyButton = document.getElementById('buy-ticket');
        buyButton.click();

        expect(document.getElementById('available-tickets').querySelector('span').textContent).toBe('Sold Out');
        expect(buyButton.disabled).toBe(true);
    });
});