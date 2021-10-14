import { ref, child, onValue, remove } from 'firebase/database';
import realtime from '../firebase.js';
import { useState, useEffect } from 'react';

const DisplayMovieInfo = (props) => {
    console.log(props);
    const dbRef = ref(realtime);
    const [movieList, setMovieList] = useState([]);
    // variable to check if the list has been deleted or not
    const [listNotDeleted, setListNotDeleted] = useState(true);
    // using the listName passed as props, create a reference path
    const userMovieListRef = child(dbRef, `${props.userName}/${props.year}/${props.listName}`);

    useEffect(() => {
        onValue(userMovieListRef, (snapshot) => {
            const allMovies = snapshot.val();
            const movieInfo = []
            // Get all the movie information needed to display them in the list
            for (let movieObjects in allMovies) {
                const movieInfoObject = {
                    key: allMovies[movieObjects].id,
                    title: allMovies[movieObjects].title,
                    poster: allMovies[movieObjects].poster_path,
                    rank: allMovies[movieObjects].rank
                }
                movieInfo.push(movieInfoObject);
            }
            setMovieList(movieInfo);
        })
    }, [userMovieListRef])

    const handleListDelete = () => {
        // reference path using the parameter passed
        const specificNodeRef = ref(realtime, `${props.userName}/${props.year}/${props.listName}`);
        remove(specificNodeRef);
        // set the listNotDeleted to false as a list has been deleted so that the state updates to reflect that
        setListNotDeleted(false);
    }

    return (
        <>
            {
                // only display list if the list hasn't been deleted
                listNotDeleted ?
                    (<>
                        <h5>{props.listName} (Year: {props.year})</h5>
                        <ul className="theMovies">
                            {
                                movieList.map((individualMovie) => {
                                    return (
                                        <li key={individualMovie.key} className="individualMovies">
                                            <p>{individualMovie.rank}</p>
                                            <p>{individualMovie.title}</p>
                                            {
                                                individualMovie.poster
                                                    ? <img src={`https://image.tmdb.org/t/p/w500/${individualMovie.poster}`} alt={`Poster for ${individualMovie.title}`} />
                                                    : <div className="emptyPoster"></div>
                                            }
                                        </li>

                                    )
                                })
                            }
                        </ul>
                        {/* onClick, send the listName to handleListDelete so that a reference path can be created */}
                        <button onClick={handleListDelete}>Delete</button>
                    </>)
                    : null
            }
        </>
    )
}

export default DisplayMovieInfo;