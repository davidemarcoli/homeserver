const myHeaders = new Headers();
myHeaders.append("Content-type", "application/json");
myHeaders.append("trakt-api-key", "[API_KEY]");
myHeaders.append("trakt-api-version", "2");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const fetchTopImdbMoviesOverTrakt = async () => {
    const listItems = await fetch("https://api.trakt.tv/users/justin/lists/imdb-popular-movies/items", requestOptions).then(res => res.json());
    const movies = (listItems as []).map((item: any) => {
        return item.movie
    });

    // const filteredMovies = movies.filter(movie => {
    //     return movie.movie.rating >= 7.2;
    // });

    // limit to 10 movies
    const filteredMovies = movies.slice(0, 10);

    const readableMovies = filteredMovies.map(movie => {
        return movie.title;
    });

    console.log(readableMovies);

    // fs.writeFileSync('out/top-tmdb-movies.json', JSON.stringify(readableMovies, null, 2));

}

fetchTopImdbMoviesOverTrakt();

// fetch("https://api.trakt.tv/users/justin/lists/imdb-popular-movies/items", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));