const DisplayTopMovies = (apiData) => {
    // console.log(apiData.theMovieList)
    const topMovies = apiData.theMovieList;

    return(
        <div>
            <ul>
                {
                    topMovies.map((individualMovie) => {
                        return (
                            <li key={individualMovie.id}>
                                {
                                    individualMovie.poster_path
                                        ? <img src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`} alt={`Poster for ${individualMovie.title}`} />
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

export default DisplayTopMovies;