import fs from 'fs';
import Movie from './movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWIwMjdmNDU3NDY0NDcwMzg4MmQyODc4ZjllYWM4NSIsInN1YiI6IjY1OTA3ZTE0MDI4ZjE0MjRjZGM1NGJjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PhVtCDsxtVhvVnkuyiLxaJd3izjA8OcE_b0E0fwhx1E' // read-only access token
    }
};

fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then((response: any) => {
        const movies: Movie[] = response.results;
        fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));

        const titles = movies.map(movie => movie.title);
        fs.writeFileSync('movies-titles.json', JSON.stringify(titles, null, 2));
    })
    .catch(err => console.error(err));