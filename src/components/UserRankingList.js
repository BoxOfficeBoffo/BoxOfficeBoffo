import { useEffect, useState } from 'react';
import DisplayUserLists from './DisplayUserLists.js';
import UserRankingFirebase from './UserRankingFirebase.js';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const UserRankingList = (props) => {

    // let allSelection = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    const [signedIn, setSignedIn] = useState(false);
    const [userName, setUserName] = useState("");
    let listName = props.listName;
    const [error, setError] = useState("");
    const [showList, setShowList] = useState(false);
    const [linkPath, setLinkPath] = useState(false);
    const [test, setTest] = useState(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);

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
            console.log("Please make sure all movies are ranked");
            setLinkPath(false);
            return false;
        } else {
            const findDuplicates = array => array.filter((item, index) => array.indexOf(item) !== index);
            const duplicateElements = findDuplicates(test);
            if (duplicateElements.length !== 0) {
                setError("You can't assign same ranks to different movies")
                console.log("You can't assign same ranks to different movies")
                setLinkPath(false);
                return false;
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
                return true;
            }
        }
    }

    const handleClickDisplayResult = () => {
        if (errorHandle()) {
            console.log("yay")
            // send to results component
        } else {
            console.log("nay")
        }

    }

    const handleClickNewList = () => {
        if (errorHandle()) {
            console.log("yay")
            // send to catalogue component
        } else {
            console.log("nay")
        }
    }

    return (
        <main>
            {
                signedIn ?
                    <>
                        {
                            showList ?
                                <DisplayUserLists userName={userName} /> :
                                <div className="displayMovieList">
                                    {
                                        props.selectedMovies.map((movie, index) => {
                                            return (
                                                <div key={index} className="movieContainer">
                                                    <h5>{movie.title}</h5>
                                                    {/* <p>{movie.id}</p> */}
                                                    <p>{test[index]}</p>
                                                    <form>
                                                        <select id="ranking" name="ranking" onChange={handleUserInput} data-array-index={index}>
                                                            <option value="placeholder" disabled>Pick one:</option>
                                                            <option value="0">0</option>
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
                                            <Link to="/user/results"><button onClick={handleClickDisplayResult}>Display Results</button></Link>
                                            : <button onClick={handleClickDisplayResult}>Display Results</button>
                                    }

                                    {/* <Link to={linkPath? "/user/results"}>
                                        <button onClick={handleClickDisplayResult}>Display Results</button>
                                    </Link> */}

                                    <Link to="/">
                                        <button onClick={handleClickNewList}>New List</button>
                                    </Link>

                                    <Link to="/user/myList">
                                        <button onClick={() => setShowList(true)}>My Lists</button>
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