import './App.css';
import Catalogue from './components/Catalogue.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import DisplayUserLists from './components/DisplayUserLists.js';
import Nav from './components/Nav.js';
import goldStars from './assets/goldStars.png'
import movieReel from './assets/movieReel.png'

function App() {
  return (
    <Router>
      <header>
          <div className="headerContainer wrapper">
            <img src={goldStars} alt="Seven gold stars in an arch" className="goldStars"/>
            <h1>Box Office Buster</h1>
            <img src={movieReel} alt="Clipart of a movie reel" className="movieReel"/>
          </div>
        <Nav />
      </header>
      <main>
      <div className="wrapper">
        <Route exact path="/">
          <Catalogue />
        </Route>

        <Route path="/:userName/myList">
          <DisplayUserLists />
        </Route>

      </div>
      </main>
      <footer>
        <p>Created © <a href="https://junocollege.com/">Juno College </a>2021</p>
      </footer>
    </Router>
  );
}

export default App;

// PSEUDOCODE
// 1. Add user interface, utilizing form elements
// 2. Based on the summer year(between May 1-September 4), an API call be made based on the user's input
  // - User will be given option to search
  // - Filter movies by year and store the top 10(by revenue) in to a new Array
  // - User prompted with alert if selection is empty to make a choice
// 3. User can select 10 movies to be ranked later
  // - Button to confirm selection
// 4. Using a Router, users will be routed to a page with their selected movies
  // - User can then rank their selection from 1-10
  // - Final ranked selection will be pushed to firebase, and unchangeable
  // - User will be given an option to see results or create another list or delete list
    // -Before deleting a prediction list, user will be prompted with a custom confirmation box "Are you sure?"
// 5. User is then Routed to page with user selection and officual order of highest grossing films to compare


// WorkLoad
// Jim: finish displayCatalogue portion
  // error handling
  // filtering the summer months
  // letting users select 10 movies (no more than 10)

// Tasnia: display the 10 movies 
  // give them the ability to create another list
    // let them go back to the previous page
  // let them be able to delete a list
  // save the ranks into firebase

// Jasmine: show both actual top 10 and all of the user's list to compare
  // api call for the top 10 grossing movies
  // display the movies bets for ALL users
    // use firebase and pull the lists


