import './App.css';
import Catalogue from './components/Catalogue.js';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <header>
        <h1>MOVIES</h1>
      </header>
      <div className="wrapper">
        <Route exact path="/">
          <Catalogue />
        </Route>
      </div>
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

