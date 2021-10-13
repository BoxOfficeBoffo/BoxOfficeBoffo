



import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';

const DisplayCatalogue = (props) => {
    const movies = props.theMovies;
    const year = props.year;

    // Firebase Auth
    const [signedIn, setSignedIn] = useState(false);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true)
            } else {
                setSignedIn(false)
            }
        });
    }, [])
    




    return (
        <div className="displayCatalogue wrapper">
            {
                signedIn ?
                    <>
                        {/* <Link to="/user/rankingList"> */}
                            <button onClick={(e) => props.handleSubmitMovieList(e)}>next page</button>
                        {/* </Link> */}

                        <h2>Here are the movies released in {year}</h2>
                        <ul>
                            {
                                movies.map((individualMovie) => {
                                    return (
                                        <li key={individualMovie.id} onClick={() => props.handleSelectMovie(individualMovie.id, individualMovie.title, individualMovie.poster_path)}>
                                            {
                                                props.selectedMovies.findIndex((item) => item.id == individualMovie.id) >= 0 ?
                                                    <div className="selected">selected test</div> :
                                                    <div className="notSelected"></div>
                                            }
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
                    </>
                    : null
            }

        </div>
    )
}

export default DisplayCatalogue

