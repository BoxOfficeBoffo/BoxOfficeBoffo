import { useEffect, useState } from 'react';
import UserRankingFirebase from './UserRankingFirebase.js';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const UserRankingList = (props) => {

    const [signedIn, setSignedIn] = useState(false);
    const [userName, setUserName] = useState("");
    let listName = props.listName;
    const [error, setError] = useState("");
    const [linkPath, setLinkPath] = useState(false);
    const [test, setTest] = useState(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);

    // Firebase Auth
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true)
                setUserName(user.uid);

            } else {
                setSignedIn(false)
            }
        });
    }, [auth])


    const handleUserInput = (e) => {
        e.preventDefault();
        if (e.target.value) {
            const rankIndex = e.target.getAttribute('data-array-index');
            const rank = e.target.value;

            const arrayCopy = [...test];
            arrayCopy[rankIndex] = rank;
            setTest(arrayCopy)
            props.selectedMovies[rankIndex].rank = rank;

        }
    }


    const errorHandle = () => {
        if (test.includes("0")) {
            setError("Please make sure all movies are ranked");
            setLinkPath(false);
        } else {
            const findDuplicates = array => array.filter((item, index) => array.indexOf(item) !== index);
            const duplicateElements = findDuplicates(test);
            if (duplicateElements.length !== 0) {
                setError("You can't assign same ranks to different movies")
                setLinkPath(false);
            } else {
                setError("");
                // save list and rank to firebase
                const sendObjectToFirebase = {
                    selectedMovies: props.selectedMovies,
                    userName: userName,
                    listName: listName,
                    year: props.year
                }
                UserRankingFirebase(sendObjectToFirebase);
                setLinkPath(true);
            }
        }
    }

    return (
        <main>
            {
                signedIn ?
                    <>
                        {
                            <div className="displayMovieList">
                                {
                                    props.selectedMovies.map((movie, index) => {
                                        return (
                                            <div key={index} className="movieContainer">
                                                <h5>{movie.title}</h5>
                                                <p>Your Rank: {test[index]}</p>
                                                {/* <p>{movie.id}</p> */}
                                                <form>
                                                    <select id="ranking" name="ranking" onChange={handleUserInput} data-array-index={index}>
                                                        <option value="placeholder" disabled>Pick one:</option>
                                                        <option value="0"></option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                </form>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    error ?
                                        <p>{error}</p>
                                        : null
                                }
                                {
                                    linkPath ?
                                        <Link to="/user/results"><button>Display Results</button></Link>
                                        : <button onClick={errorHandle}>Display Results</button>
                                }

                                {/* {
                                        linkPath ?
                                            <Link to="/">
                                                <button>New List</button>
                                            </Link>
                                    } */}

                                {/* <Link to="/">
                                        <button onClick={errorHandle}>New List</button>
                                    </Link> */}

                                <Link to="/">
                                    <button>New List</button>
                                </Link>

                                <Link to="/user/myList">
                                    <button>My Lists</button>
                                </Link>
                            </div>
                        }
                    </>
                    : null
            }
        </main>
    )
}

export default UserRankingList;