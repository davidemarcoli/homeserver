import * as cheerio from 'cheerio';
import fs from "fs";
import {RATING_THRESHOLD} from "./constants.ts";

const BASE_URL = 'https://torrentfreak.com/most-pirated-movies-of-2024-weekly-archive/';
const IMDB_RATING_THRESHOLD = RATING_THRESHOLD ?? 7.2;

const fetchWeeklyMostPiratedMovies = async () => {
    const content = await fetch(BASE_URL).then(res => res.text());
    const $ = cheerio.load(content);
    const table = $('table').last();
    const rows = table.find('tbody > tr');
    const movies = rows.map((i, el) => {
        const a = $(el).find('a').first();
        const imdbRating = parseFloat(a.text());
        const td = $(el).find('td').get(2)!;
        const text = $(td).text();
        return {text, imdbRating};
    }).get();

    const filteredMovies = movies.filter(movie => {
        return movie.imdbRating >= IMDB_RATING_THRESHOLD;
    });

    console.log(filteredMovies);

    const title = $('h2').last().text();

    const output = {
        title,
        movies: filteredMovies
    }

    fs.writeFileSync(import.meta.dir + '/../out/weekly-most-pirated-movies.json', JSON.stringify(output, null, 2));
}

fetchWeeklyMostPiratedMovies();

