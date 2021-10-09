
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayCatalogue from './DisplayCatalogue';

const Catalogue = () => {

  const [userInput, setUserInput] = useState();
  const [userInputYear, setUserInputYear] = useState();

  const [ movies, setMovies ] = useState([]);

  useEffect(() => {

    axios({
      url: 'https://api.themoviedb.org/3/discover/movie',
      params: {
        api_key: 'da4fdac82c009adaed8ec1f39b233b93',
        language: 'en-US',
        sort_by: 'original_title.asc',
        include_adult: 'false',
        include_video: 'false',
        page: 1,
        primary_release_year: `${userInputYear}`,
      }
    }).then((res) => {
      setMovies(res.data.results);
      console.log(res.data.results)
    })
  }, [userInputYear]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInputYear(userInput);
    console.log(userInput);
  }

  return (
    <>
      <div className="catalogueForm">
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

      <DisplayCatalogue movies={movies}/>
    </>
  )
}

export default Catalogue;