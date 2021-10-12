import { useEffect, useState } from 'react/cjs/react.development';
import realtime from '../firebase.js';
import { ref, onValue, child } from 'firebase/database';
import { Router } from 'react-router';

const UsersFinalList = () => {

    const [ moviesLists, setMovieLists ] = useState([]);

    // FIREBASE SETUP
    useEffect (() => {
        // Reference the realtime database from firebase
        const dbRef = ref(realtime);
        
        // Upon data input, onValue to look for changes and read from the database
        onValue(dbRef, (snapshot) => {
            const myData = snapshot.val();

            // Empty array for the notes object
            // const newArray = [];

            // const userInfo = myData.users.jam;
            // console.log(userInfo);
            // const userDB = userInfo;


        },)
    })

    return (
        <div>
            <p>Tis a fake!</p>
            {/* <ul>
                return (
                    {userList.map((user, index) => {
                        return (
                            <li> {user}
                                {userList.map((subLists, sIndex) => {
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
        </div>
    )
}


export default UsersFinalList;