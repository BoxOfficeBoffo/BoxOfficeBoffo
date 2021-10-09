// import { useState } from "react"

const DisplayCatalogue = (props) => {
    
    console.log(props.movies);
    const movies = props.movies;

    return (
        <div className="displayCatalogue">
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

