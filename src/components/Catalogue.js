
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayCatalogue from './DisplayCatalogue';

const Catalogue = () => {

  const [userInput, setUserInput] = useState();
  const [userInputYear, setUserInputYear] = useState();

  const [ movies, setMovies ] = useState([]);

  useEffect(() => {

    if (userInputYear) {
      axios({
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
          api_key: 'da4fdac82c009adaed8ec1f39b233b93',
          language: 'en-US',
          sort_by: 'release_date',
          include_adult: 'false',
          include_video: 'false',
          page: 1,
          primary_release_year: `${userInputYear}`,
        }
      }).then((res) => {
        setMovies(res.data.results);
      })
    }

  }, [userInputYear]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setUserInputYear(userInput);
    setUserInput("")
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
      
      {userInputYear? 
        <DisplayCatalogue theMovies={movies} year={userInputYear} />
        : null
      }
    </>
  )
}

export default Catalogue;