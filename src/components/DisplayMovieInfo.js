import { ref, child, onValue, remove } from 'firebase/database';
import realtime from '../firebase.js';
import { useState, useEffect } from 'react';
import Modal from './Modal.js';

const DisplayMovieInfo = (props) => {
    const [movieList, setMovieList] = useState([]);
    // variable to check if the list has been deleted or not
    const [listNotDeleted, setListNotDeleted] = useState(true);
    // using the listName passed as props, create a reference path
    const [callModal, setCallModal] = useState(false);
    
    useEffect(() => {
        const dbRef = ref(realtime);
        const userMovieListRef = child(dbRef, `${props.userName}/${props.year}/${props.listName}`);
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
    }, [props])

    const handleListDelete = () => {
        // reference path using the parameter passed
        const specificNodeRef = ref(realtime, `${props.userName}/${props.year}/${props.listName}`);
        remove(specificNodeRef);
        // set the listNotDeleted to false as a list has been deleted so that the state updates to reflect that
        setListNotDeleted(false);
    }

    const clickedDeleteButton = () => {
        setCallModal(true);
    }

    return (
        <>
            {
                // only display list if the list hasn't been deleted
                listNotDeleted ?
                    (<>
                        
                        <h4>{props.listName} (Year: {props.year})</h4>
                        <ul className="theMovies">
                            {
                                movieList.map((individualMovie) => {
                                    return (
                                        <li key={individualMovie.key} className="individualMovies">
                                            <p>{individualMovie.rank}</p>
                                            <p>{individualMovie.title}</p>
                                            {
                                                individualMovie.poster
                                                    ? <img src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster}`} alt={`Poster for ${individualMovie.title}`} />
                                                    : <div className="emptyPoster"></div>
                                            }
                                        </li>

                                    )
                                })
                            }
                        </ul>
                        {/* onClick, send the listName to handleListDelete so that a reference path can be created */}
                        <button onClick={clickedDeleteButton} className="deleteListBtn">Delete</button>
                        {
                            // only call display modal when needed
                            callModal?
                                <Modal 
                                    from="displayMovieInfo"
                                    // close modal when not used
                                    onClose={() => setCallModal(false)}
                                    // to call the click event in the modal
                                    handleListDelete={(e) => handleListDelete(e)}
                                />
                                : null

                        }
                    </>)
                    : null
            }
        </>
    )
}

export default DisplayMovieInfo;