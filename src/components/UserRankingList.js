import { useEffect, useState } from 'react';
import DisplayUserLists from './DisplayUserLists.js';
import UserRankingFirebase from './UserRankingFirebase.js';

const UserRankingList = () => {
    let array = [
        {
            id: 102,
            title: "Movie Title1",
            photo: "photo URL"
        },
        {
            id: 103,
            title: "Movie Title2",
            photo: "photo URL"
        },
        {
            id: 104,
            title: "Movie Title3",
            photo: "photo URL"
        },
        {
            id: 105,
            title: "Movie Title4",
            photo: "photo URL"
        },
        {
            id: 106,
            title: "Movie Title5",
            photo: "photo URL"
        }
    ]

    let allSelection = ["0", "0", "0", "0", "0"];
    let userName = "Pink";
    let listName = "2016 Blockbuster";
    // const [error, setError] = useState("");
    const [showList, setShowList] = useState(false);

    const handleUserInput = (e) => {
        if (e.target.value) {
            const rankIndex = e.target.getAttribute('data-array-index');
            const userRank = e.target.getAttribute('data-rank');

            const rank = e.target.value;

            // if (userRank) {
            //     if(allSelection.includes(rank)) {
            //         // find the index of the number
            //         const numIndex = allSelection.indexOf(rank);
            //         // replace the number from the array with a 0
            //         allSelection[numIndex] = "0";
            //     }
            // } else {
            //     // does it already exist in the allSelection?
            //     if(allSelection.includes(rank)) {
            //         // Yes: delete the number from the array
            //         const numIndex = allSelection.indexOf(rank);
            //         allSelection[numIndex] = "0";
            //     }
            // }
            allSelection[rankIndex] = rank;
            e.target.setAttribute('data-rank', e.target.value);
            array[rankIndex].rank = rank;


            // setUserRank(
            //     userRank.map( (individualRank, index) => {
            //         if (individualRank !== allSelection[index]) {
            //             return allSelection[index];
            //         } else {
            //             return individualRank;
            //         }
            //     })
            // );
            // setUserRank(...allSelection);

            console.log(allSelection);
            // console.log(array);
        }
    }

    const errorHandle = () => {
        if (allSelection.includes("0")) {
            console.log("Please make sure all movies are ranked");
            return false;
        } else {
            const findDuplicates = array => array.filter((item, index) => array.indexOf(item) !== index);
            const duplicateElements = findDuplicates(allSelection);
            // console.log(duplicateElements.length);
            if (duplicateElements.length !== 0) {
                // setError("You can't assign same ranks to different movies")
                console.log("You can't assign same ranks to different movies")
                return false;
            } else {
                // setError("");
                // save list and rank to firebase
                UserRankingFirebase(array, userName, listName);
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
                showList? 
                    <DisplayUserLists user={userName}/>:
                    <div className="displayMovieList">
                        {
                            array.map((movie, index) => {
                                return (
                                    <div key={index} className="movieContainer">
                                        <h5>{movie.title}</h5>
                                        <p>{movie.id}</p>
                                        <form>
                                            <select id="ranking" name="ranking" onChange={handleUserInput} data-array-index={index}>
                                                <option value="placeholder" disabled>Pick one:</option>
                                                <option value="0"></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </form>
                                    </div>
                                )
                            })
                        }
                        {/* {
                        error? 
                            <p className="userListError">{error}</p>
                            : null
                    } */}
                        <button onClick={handleClickDisplayResult}>Display Results</button>
                        <button onClick={handleClickNewList}>New List</button>
                        <button onClick={() => setShowList(true)}>My Lists</button>
                    </div>
            }
        </main>
    )
}

export default UserRankingList;