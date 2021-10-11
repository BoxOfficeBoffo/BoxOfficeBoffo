import axios from "axios";
import { useState, useEffect } from "react";
import DisplayTopMovies from "./DisplayTopMovies.js";
import UsersFinalList from "./UsersFinalLists.js";

const ResultsPage = () => {

    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        axios ({
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: 'da4fdac82c009adaed8ec1f39b233b93',
                language: 'en-US',
                sort_by: 'revenue.desc',
                include_adult: 'false',
                include_video: 'false',
                page: 1,
                primary_release_year: 1940,
            }
        }).then((res) => {
            console.log(res.data.results);
            setTopMovies(res.data.results);
        })
    }, []);


    return (
        <div>
            <h3>The results</h3>
            <DisplayTopMovies theMovieList={topMovies} year="2001"/>
            <UsersFinalList />
        </div>
    )

}

export default ResultsPage;