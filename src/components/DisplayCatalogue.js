
const DisplayCatalogue = (props) => {
    
    console.log(props);
    const movies = props;

    return (
        <div className="displayCatalogue wrapper">
            <ul>
                {
                movies.map( (individualMovie) => {                  
                    return(
                        <li key={individualMovie.id}>
                            {
                                individualMovie.poster_path 
                                ? <img src={`https://image.tmdb.org/t/p/w500/${individualMovie.poster_path}`} alt={`Poster for ${individualMovie.title}`} /> 
                                : <div className="emptyPoster"></div>
                            }
                            <h2>{individualMovie.title}</h2>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default DisplayCatalogue

