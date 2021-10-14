import axios from "axios";
import { useState, useEffect } from "react";
import DisplayTopMovies from "./DisplayTopMovies.js";
import UsersFinalList from "./UsersFinalLists.js";
import realtime from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, child, onValue} from 'firebase/database';


const ResultsPage = () => {

    const [topMovies, setTopMovies] = useState([]);
    const [userData, setUserData] = useState([]);

    // AUTHENTICATION AND USER STATE
    const [signedIn, setSignedIn] = useState(false);
    const [userName, setUserName] = useState("");

    // Firebase Auth
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true)
                // setUserName("Jam");
                setUserName(user.uid);
                // console.log(userName);
            } else {
                setSignedIn(false)
            }
        });
    }, [auth])


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
                primary_release_year: 2001,
            }
        }).then((res) => {
            // console.log(res.data.results);
            setTopMovies(res.data.results);
        })
    }, []);

    useEffect(() => {
        const dbRef = ref(realtime);
        // const userListsRef = child(dbRef, `${userName}`);
        // console.log(userName);

        onValue(dbRef, (snapshot) => {
            const listData = snapshot.val();

            const newArr = [];
            const oldArr = [];

            for( let yearProp in listData ) {
                const yearList = listData[yearProp]
                for (let listNameProp in yearList) {
                    const listObj = {
                        year: yearProp,
                        listName: listNameProp
                    }
                    oldArr.push(listObj)
                }
                newArr.push()              
            }
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