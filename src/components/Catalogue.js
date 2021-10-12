import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCatalogue from './DisplayCatalogue';
import realtime from '../firebase.js';
import { ref, onValue } from 'firebase/database';

let submittedYear = ""
const Catalogue = () => {
  //set state for year(userInput)
  const [userInput, setUserInput] = useState("");
  //set state for all movies from API search
  const [movies, setMovies] = useState([]);
  //set state for selected movies
  const [movieList, setMovieList] = useState([]);
  //selected movies state
  const [selectedMovies, setSelectedMovies] = useState([])


  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submittedYear = userInput
    //moved axios into handleSubmit function because after lots of attempts, it doesn't make sense to have in a useEffect.  We only want to call the api when the handleSubmit button is clicked (not when anything new is rendered on page). 
    // if (userInput) {
    axios({
      url: 'https://api.themoviedb.org/3/discover/movie',
      params: {
        api_key: 'da4fdac82c009adaed8ec1f39b233b93',
        language: 'en-US',
        // added parameter to sort by revenue (highest to lowest). Will have function to render on page randomized, but have highest revenue
        sort_by: 'revenue.desc',
        // added parameter to include show US movies (and us release dates since audience is North American)
        region: 'US',
        include_adult: 'false',
        include_video: 'false',
        // Including parameter to show movies released between May1-Sept4
        'primary_release_date.gte': `${userInput}-05-01`,
        'primary_release_date.lte': `${userInput}-09-04`,
        page: 1,
        primary_release_year: `${userInput}`,
      }
    }).then((res) => {
      //modifies the input to be randomized
      const shuffleResult = (array) => {
        //create a variable to store and return an array
        const shuffledArray = array.slice();
        //Durstenfeld shuffle algorithm to randomize result
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray
      }
      const shuffledResult = shuffleResult(res.data.results);
      setMovies(shuffledResult);
      console.log(res.data.results, "res");
    })
    //empty user selection when they they submit a new search.
    setSelectedMovies([]);
  }

  //when user selects a movie this function will be called. 
  //It will add the selected movie to the state "selectedMovies". 
  //If the movie has already been selected, it will be removed.
  const handleSelectMovie = (id, title, poster) => {
    //findIndex returns the index of the first element in the array that satisfies condition
    const selectedMovieIndex = selectedMovies.findIndex((element) => element.id == id)
    //if the selected movie is already in the list, remove the selected movie.
    if (selectedMovieIndex >= 0) {
        //did not render until .slice() was added.  Slice gets a copy of the array by value. React only renders when state is explicitly set. without slice(), it was changing it in place and not rendering because it was a copy by reference, not value.
        const movieArray = selectedMovies.slice();
        movieArray.splice(selectedMovieIndex, 1);
        setSelectedMovies(movieArray);
        console.log(movieArray, "movieArray");
    } else {
        //Object that will get added to state []
        //This will only let the user choose 10 movies per list.
        if (selectedMovies.length <= 9) {
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

  //Create the subscrtiption(link) to firebase and will update anytime a value changes
  useEffect(() => {
    const dbRef = ref(realtime);
    onValue(dbRef, (snapshot) => {
      const myData = snapshot.val();
      const newArray = [];
      console.log(snapshot.val(), "snapshot")
      const userInfo = myData.users.jam;
      for (let property in userInfo) {
        console.log(property);
        const movieListObject = {
          key: property,
          movieList: userInfo[property]
        }
        newArray.push(movieListObject);
      }
      setMovieList(newArray);
      console.log(newArray, "movie")
    })
  }, [])


  return (
    <>
      <div className="catalogueForm wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="yearInput">Choose a year:</label>
          <input
            type="text"
            id="yearInput"
            onChange={handleChange}
            value={userInput}
            placeholder="1999" />
          <button type="submit">Enter</button>
        </form>
      </div>

      {/* add ternary */}
      <DisplayCatalogue
        selectedMovies={selectedMovies}
        handleSelectMovie={(id, title, poster) => handleSelectMovie(id, title, poster)}
        theMovies={movies}
        year={submittedYear}
      />

    </>
  )
}

export default Catalogue;