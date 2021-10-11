import { useEffect, useState } from 'react';

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

    let allSelection = ["0","0","0","0","0"];
    // const [userRank, setUserRank] = useState([...allSelection]);

    const handleUserInput = (e) => {
        if (e.target.value) {
            const rankIndex = e.target.getAttribute('data-array-index');
            const userRank = e.target.getAttribute('data-rank');
            
            const rank = e.target.value;
    
            if (userRank) {
                if(allSelection.includes(rank)) {
                    // find the index of the number
                    const numIndex = allSelection.indexOf(rank);
                    console.log(numIndex);
                    // replace the number from the array with a 0
                    allSelection[numIndex] = "0";
                }
            } else {
                // does it already exist in the allSelection?
                if(allSelection.includes(rank)) {
                    // Yes: delete the number from the array
                    const numIndex = allSelection.indexOf(rank);
                    allSelection[numIndex] = "0";
                }
            }
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
            
            // console.log(allSelection);
            // console.log(array);
        }
    }

    const errorHandle = () => {
        if(allSelection.includes("0")) {
            console.log("Please make sure all movies have individual ranks");
        } else {
            console.log("saved!");
            // save list and rank to firebase
        }
    }

    const handleClickDisplayResult = () => {
        errorHandle();
        // send to results component
    }

    const handleClickNewList = () => {
        errorHandle();
        // send to catalogue component
    }

    return (
        <div className="displayMovieList">
            {
                array.map((movie, index) => {
                    return (
                        <div key={index} className="movieContainer">
                            <h5>{movie.title}</h5>
                            {/* <p>{userRank[index]}</p> */}
                            <form>
                                <select id="ranking" name="ranking" onChange={handleUserInput} data-array-index={index}>
                                    <option value="placeholder" disabled>Pick one:</option>
                                    <option></option>
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
            <button onClick={handleClickDisplayResult}>Display Results</button>
            <button onClick={handleClickNewList}>New List</button>
        </div>
    )
}

export default UserRankingList;