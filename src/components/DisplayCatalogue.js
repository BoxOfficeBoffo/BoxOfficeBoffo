
const DisplayCatalogue = (apiData) => {

    console.log(apiData.theMovies);
    const movies = apiData.theMovies;
    const year = apiData.year;
    
    return (
        <div className="displayCatalogue wrapper">
            <h2>Here are the movies released in {year}</h2>
            <ul>
                {
                    movies.map((individualMovie) => {
                        return (
                            <li key={individualMovie.id}>
                                {
                                    individualMovie.poster_path
                                        ? <img src={`https://image.tmdb.org/t/p/w500/${individualMovie.poster_path}`} alt={`Poster for ${individualMovie.title}`} />
                                        : <div className="emptyPoster"></div>
                                }
                                <h3>{individualMovie.title}</h3>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DisplayCatalogue

