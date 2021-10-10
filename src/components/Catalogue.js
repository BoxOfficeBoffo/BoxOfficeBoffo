
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayCatalogue from './DisplayCatalogue';

const Catalogue = () => {

  const [userInput, setUserInput] = useState("");
  const [ movies, setMovies ] = useState([]);


  
  const handleChange = (e) => {
    setUserInput(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

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
        setMovies(res.data.results);
        console.log(res.data.results, "res");
      })
    // }
    // setUserInput("")
  }
  
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
      
      {/* {userInput?  */}
        <DisplayCatalogue theMovies={movies} year={userInput} />
        {/* : null */}
      {/* } */}
    </>
  )
}

export default Catalogue;