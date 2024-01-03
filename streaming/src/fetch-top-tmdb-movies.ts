import fs from 'fs';
import Movie from './types/movie.ts';
import {RATING_THRESHOLD} from "./constants.ts";

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_RATING_THRESHOLD = RATING_THRESHOLD ?? 7.2;

interface ApiResponse {
    results: Movie[];
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWIwMjdmNDU3NDY0NDcwMzg4MmQyODc4ZjllYWM4NSIsInN1YiI6IjY1OTA3ZTE0MDI4ZjE0MjRjZGM1NGJjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PhVtCDsxtVhvVnkuyiLxaJd3izjA8OcE_b0E0fwhx1E' // read-only access token
    }
};

const fetchTopTmdbMovies = async () => {
    const content = await fetch(BASE_URL + '/discover/movie?language=en-US&page=1&sort_by=popularity.desc', options).then(res => res.json()) as ApiResponse;
    const movies: Movie[] = content.results;

    const filteredMovies = movies.filter(movie => {
        return movie.vote_average >= TMDB_RATING_THRESHOLD;
    });

    const readableMovies = filteredMovies.map(movie => {
        return {
            title: movie.title,
            vote_average: movie.vote_average
        }
    });

    console.log(readableMovies);

    fs.writeFileSync('out/top-tmdb-movies.json', JSON.stringify(readableMovies, null, 2));
}

fetchTopTmdbMovies()

// dtwc fwzy xcln xipo