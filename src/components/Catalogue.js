
import {useState} from 'react';
import axios from 'axios';

const Catalogue = () => {

  const [userInput, setUserInput] = useState()

  const handleChange = (e) => {
    setUserInput(e.target.value);
    console.log(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="catalogueForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="yearInput">Choose a year:</label>
          <input 
          type="number"
          id="yearInput"
          onChange={handleChange}
          value={userInput}
          placeholder="1999" />
          <button type="submit">Enter</button>
        </form>
      </div>
    </>
  )
}

export default Catalogue;