import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCatalogue from './DisplayCatalogue';
import UserRankingList from './UserRankingList';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fiveStarRating from '../assets/fiveStarRating.png';
import Modal from './Modal';


let submittedYear = ""
const Catalogue = () => {

  const [signedIn, setSignedIn] = useState(false);

  // Firebase Auth
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true)
      } else {
        setSignedIn(false)
      }
    });
  }, [auth])


  //set state for year(userInput)
  const [userInput, setUserInput] = useState("");
  //set state for all movies from API search
  const [movies, setMovies] = useState([]);
  //selected movies state
  const [selectedMovies, setSelectedMovies] = useState([])
  //sorting page state
  const [showSortPage, setShowSortPage] = useState(false)
  //state for list name
  const [listName, setListName] = useState("")
  //Show Modal for List Creation
  const [showModalListCreation, setShowModalListCreation] = useState(false)


  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submittedYear = userInput
    //moved axios into handleSubmit function because after lots of attempts, it doesn't make sense to have in a useEffect.  We only want to call the api when the handleSubmit button is clicked (not when anything new is rendered on page). 
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
      //if there is no result an alert pops up (error handle)
      if (shuffledResult.length < 1) {
        alert('No movie results found')
      } else if (shuffledResult.length < 9) {
        alert('Sorry, there are not enough movies to choose from')
        setMovies([])
      }
    })
    //empty user selection when they they submit a new search.
    setSelectedMovies([]);
  }

  //when user selects a movie this function will be called. 
  //It will add the selected movie to the state "selectedMovies". 
  //If the movie has already been selected, it will be removed.
  const handleSelectMovie = (id, title, poster) => {
    //Set show modal to false by default
    setShowModalListCreation(false);
    //findIndex returns the index of the first element in the array that satisfies condition
    const selectedMovieIndex = selectedMovies.findIndex((element) => element.id === id)
    //if the selected movie is already in the list, remove the selected movie.
    if (selectedMovieIndex >= 0) {
      //did not render until .slice() was added.  Slice gets a copy of the array by value. React only renders when state is explicitly set. without slice(), it was changing it in place and not rendering because it was a copy by reference, not value.
      const movieArray = selectedMovies.slice();
      movieArray.splice(selectedMovieIndex, 1);
      setSelectedMovies(movieArray);
    } else {
      //Object that will get added to state []
      //This will only let the user choose 10 movies per list.
      if (selectedMovies.length <= 9) {
        const selectedMovie = {
          id: id,
          title: `${title}`,
          poster_path: `${poster}`
        }
        const movieArray = selectedMovies.slice();
        movieArray.push(selectedMovie);
        setSelectedMovies(movieArray);
        //if this is the 10th selected movie show the modal to give it a name
        if (movieArray.length === 10) {
          setShowModalListCreation(true);
        }
      }
    }
    // console.log(typeof(selectedMovies[0].id), "type of selectedMovies move id")
  }

  //function to handle list name
  const handleSubmitMovieList = (e) => {
    //if input has value set list name and go to sort page
    if (e.target.newListName.value) {
      setListName(e.target.newListName.value);
      setShowSortPage(true);
      setShowModalListCreation(false);
    } else {
      e.preventDefault()
      alert('Please enter a list name');
    }
  }


  return (
    <>
      {
        signedIn ?
          <>
            {
              showSortPage ?
                <UserRankingList
                  listName={listName}
                  year={submittedYear}
                  selectedMovies={selectedMovies}
                /> :
                <div>
                  <div className="intro wrapper">
                    <h3>This app allows you to create a movie pool to predict the top 10 grossing movies for any given year.</h3><br/>
                    <p className="theRules">The rules are simple:</p>
                    <ol>
                      <li>Select a year of your choice to get 20 summer blockbuster movie options (the top 10 grossing movies are already included!)</li>
                      <li>Pick 10 movies that you think are the top grossing movies for that particular year</li>
                      <li>Rank the 10 movies from highest grossing (1) to lowest grossing (10)</li>
                      <li>Save (lock in) your list.</li>
                    </ol>

                    <p>You'll have access to all your movie pool list predictions forever!!</p>
                    <img src={fiveStarRating} alt="Five gold stars in an arch" className="fiveStars"/>
                  </div>
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
                  <DisplayCatalogue
                    selectedMovies={selectedMovies}
                    handleSelectMovie={(id, title, poster) => handleSelectMovie(id, title, poster)}
                    handleSubmitMovieList={(e) => handleSubmitMovieList(e)}
                    theMovies={movies}
                    year={submittedYear}
                  />
                  {
                    showModalListCreation?
                      <Modal
                        handleSubmitMovieList={(e) => handleSubmitMovieList(e)}
                        year={submittedYear}
                        onClose={() => setShowModalListCreation(false)}
                        from="catalogue"
                      />
                      :null
                  }
                </div>
            }
          </>
          : <h2 className="loginPlz">Please login!</h2>
      }
    </>
  )
}

export default Catalogue;