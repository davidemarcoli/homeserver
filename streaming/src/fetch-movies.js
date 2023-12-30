import fs from 'fs';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWIwMjdmNDU3NDY0NDcwMzg4MmQyODc4ZjllYWM4NSIsInN1YiI6IjY1OTA3ZTE0MDI4ZjE0MjRjZGM1NGJjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PhVtCDsxtVhvVnkuyiLxaJd3izjA8OcE_b0E0fwhx1E'
    }
};

fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        fs.writeFileSync('movies.json', JSON.stringify(response.results, null, 2));
        const titles = response.results.map(movie => movie.title);
        fs.writeFileSync('movies-titles.json', JSON.stringify(titles, null, 2));
        console.log(response)
    })
    .catch(err => console.error(err));