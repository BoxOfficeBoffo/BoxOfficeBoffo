import realtime from '../firebase.js';
import { ref, child, set } from 'firebase/database';
import { Link } from 'react-router-dom';
import UserRankingList from './UserRankingFirebase.js';
// import { useEffect, useState } from 'react';

const DisplayCatalogue = (props) => {
    const movies = props.theMovies;
    const year = props.year;
    const user = "jam"
    const listName = `${year} Blockbuster`

    const handleSubmitMovieList = () => {
        //This will check to see if there are exactly 10 movies selected before saving to firebase.
        if (props.selectedMovies.length <= 9) {
            alert('please choose 10 movies')
        } else {
            //creates the reference to the realtime database
            // const dbRef = ref(realtime);
            // //variable with reference to the specified relative path
            // const userListRef = child(dbRef, `${user}/${listName}`)
            // set(userListRef, props.selectedMovies);
        }
    }

    return (
        <div className="displayCatalogue wrapper">

            <Link to="/user/rankingList">
                <button onClick={() => handleSubmitMovieList()}>next page</button>
            </Link>

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
        </div>
    )
}

export default DisplayCatalogue

