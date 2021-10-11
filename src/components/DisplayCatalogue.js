import realtime from '../firebase.js';
import { ref, child, set } from 'firebase/database';
import { useEffect, useState } from 'react';

const DisplayCatalogue = (apiData) => {
    // console.log(apiData.theMovies, "api data");
    const movies = apiData.theMovies;
    const year = apiData.year;
    // console.log(movies, 'movies')
    const [selectedMovies, setSelectedMovies] = useState([])
    const handleSubmitMovieList = () => {
    const user = "jam"
    const listName = "2015 Blockbuster"
    //creates the reference to the realtime database
    const dbRef = ref(realtime);
    //variable with reference to the specified relative path
    const userListRef = child(dbRef, `users/${user}/${listName}`)
    set(userListRef, selectedMovies);
    }


    const handleSelectMovie = (id, title, poster) => {
        //findIndex returns the index of the first element in the array that satisfies condition
        const selectedMovieIndex = selectedMovies.findIndex((element) => element.id == id)
        //if the selected movie is already in the list, remove the selected movie.
        if (selectedMovieIndex >= 0) {
            //did not render until .slice() was added.  Slice gets a copy of the array by value. 
            //because react only renders when state is explicitly set. without slice(), i was changing it in place because it was a copy by reference, not value.
            const movieArray = selectedMovies.slice();
            movieArray.splice(selectedMovieIndex, 1);
            setSelectedMovies(movieArray);
            console.log(movieArray, "movieArray");
        } else {
            console.log(selectedMovies.length, selectedMovies.length < 11, 'selected movies setState length')
            //Object that will get added to state []
            if (selectedMovies.length < 11) {
                const selectedMovie = {
                    id: `${id}`,
                    title: `${title}`,
                    poster_path: `${poster}`
                }
                const movieArray = selectedMovies.slice();
                movieArray.push(selectedMovie);
                setSelectedMovies(movieArray);
                console.log(movieArray, "movieArray");
            } else {
                alert("You have selected 10 movies! Click next if you are ready.")

            }
        }
        // console.log(selectedMovies, "selectedMovieArray");
    }


    return (
        <div className="displayCatalogue wrapper">
            <h2>Here are the movies released in {year}</h2>
            <button onClick={() => handleSubmitMovieList()}>next page</button>
            <ul>
                {
                    movies.map((individualMovie) => {
                        return (
                            <li key={individualMovie.id} onClick={() => handleSelectMovie(individualMovie.id, individualMovie.title, individualMovie.poster_path)}>
                                {
                                    selectedMovies.findIndex((item) => item.id == individualMovie.id) >= 0 ?
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
        </div>
    )
}

export default DisplayCatalogue

