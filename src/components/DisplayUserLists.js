import realtime from '../firebase.js';
import { ref, child, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NewListDisplay from './NewListDisplay.js';

let userName;

const DisplayUserLists = () => {
    const [listYears, setListYears] = useState([]);
    const [signedIn, setSignedIn] = useState(false);
    const [haveInfo, setHaveInfo] = useState(false);


    // Firebase Auth
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true)
                userName = user.uid
                const dbRef = ref(realtime);
                const theYears = [];

                // Firebase refereance path
                const userYearRef = child(dbRef, `${userName}`);
                onValue(userYearRef, (snapshot) => {
                    const listByYear = snapshot.val();

                    // Get the year
                    for (let yearProperty in listByYear) {
                        theYears.push(yearProperty);
                    }
                    // set the year to listYears and setInfo to true
                    setListYears(theYears);
                    setHaveInfo(true);
                });

            } else {
                setSignedIn(false)
            }
        })
    }, [auth]);

    return (
        <div className="displayUserLists">
            {
                signedIn ?
                    <>
                        <h2>Here are your lists: </h2>
                        {
                            haveInfo ?
                                listYears.map((individualYear) => {
                                    return (
                                        // pass the info to newList component to avoid repeat
                                        <ul className={`year${individualYear}`} key={`year${individualYear}`}>
                                            <NewListDisplay userName={userName} year={individualYear}/>
                                        </ul>
                                    )
                                })
                                : <p>Don't have</p>
                        }
                    </>
                    : <p>Please Log in to see your list</p>
            }
        </div>
    )
}

export default DisplayUserLists;