// import { useEffect, useState } from 'react/cjs/react.development';
// import realtime from '../firebase.js';
// import { ref, onValue } from 'firebase/database';
// import { Router } from 'react-router';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const UsersFinalList = () => {

    // const [ moviesLists, setMovieLists ] = useState([]);

    // Firebase Auth
    // const [signedIn, setSignedIn] = useState(false);
    // const auth = getAuth();
    // // let userName;
    // useEffect(() => {
    //     onAuthStateChanged(auth, () => {
    //         if () {
    //             setSignedIn(true)
    //             // userName = user.uid;
    //         } else {
    //             setSignedIn(false)
    //         }
    //     });
    // }, [])



    // FIREBASE SETUP
    // useEffect(() => {
        // Reference the realtime database from firebase
        // const dbRef = ref(realtime);

        // Upon data input, onValue to look for changes and read from the database
        // onValue(dbRef, (snapshot) => {
            // const myData = snapshot.val();

            // Empty array for the notes object
            // const newArray = [];

            // const userInfo = myData.users.jam;
            // console.log(userInfo);
            // const userDB = userInfo;


        // })
    // })

    return (
        <div>
            {/* {signedIn ?
                <> */}
                    <p>Tis a fake!</p>
                    {/* <ul>
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
            </ul> */}
                    <button></button>
                {/* </>
                : null
            } */}
        </div>
    )
}


export default UsersFinalList;