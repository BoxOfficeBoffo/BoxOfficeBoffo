import { ref, child, onValue } from 'firebase/database';
import realtime from '../firebase.js';
import { useState, useEffect } from 'react';

const DisplayMovieInfo = (props) => {
    const dbRef = ref(realtime);
    const [movieList, setMovieList] = useState([]);
    // const userName = props.userName;
    const userMovieListRef = child(dbRef, `${props.userName}/${props.listName}`);

    useEffect(() => {
        onValue(userMovieListRef, (snapshot) => {
            const allMovies = snapshot.val();
            const movieInfo = []
            console.log(allMovies);
            for (let movieObjects in allMovies) {
                const movieInfoObject = {
                    key: allMovies[movieObjects].id,
                    title: allMovies[movieObjects].title,
                    poster: allMovies[movieObjects].photo,
                    rank: allMovies[movieObjects].rank
                }
                // console.log(stuff[stuffProps]);
                movieInfo.push(movieInfoObject);
            }
            // console.log(movieInfo);
            setMovieList(movieInfo);
        })
    },[])

    return(
        <>
        {
            movieList.map((individualMovie) => {
                return(
                    <div key={individualMovie.key} className="individualMovies">
                        <p>{individualMovie.title}</p>
                        <p>{individualMovie.rank}</p>
                    </div>

                )
            })

        }
        </>
    )
}

export default DisplayMovieInfo;