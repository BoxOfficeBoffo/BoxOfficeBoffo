import { useEffect, useState } from 'react';
import realtime from '../firebase.js';
import { ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UsersFinalList = () => {

    const [ userLists, setUserLists ] = useState([]);

    // Firebase Auth
    const [signedIn, setSignedIn] = useState(false);
    const auth = getAuth();
    let user;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true)
                console.log(user.uid);
                user = user.uid;
            } else {
                setSignedIn(false)
            }
        });
    }, [])



    // FIREBASE SETUP
    useEffect (() => {
        // Reference the realtime database from firebase
        const dbRef = ref(realtime);
        
        // Upon data input, onValue to look for changes and read from the database
        onValue(dbRef, (snapshot) => {
            const myData = snapshot.val();

            for (let propName in myData) {
                // Save the loop in a new variable
                const listObject = {
                    key: propName,
                    list: myData[propName]
                }
            
            //     // Push all new input on to the notesObject onto the Array
            //     newArray.push(listObject)
            //     }
            // // Passing our state the array
            // setUserLists(newArray);
            // });
            
        // }, []);
            }})
        })

    return (
        <div>
            <p>Tis a fake!</p>
            <ul>
                return (
                    {userLists.map((user, index) => {
                        return (
                            <li> {user}
                                {userLists.map((subLists, sIndex) => {
                                    return (
                                        <li> {subLists}</li> 
                                    )}
                                )};
                            </li>
                            )
                        }
                    )}
                )
            </ul>
            <button></button>
        </div>
    )
}


export default UsersFinalList;