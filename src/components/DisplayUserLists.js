import realtime from '../firebase.js';
import { ref, child, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import DisplayMovieInfo from './DisplayMovieInfo.js';

const DisplayUserLists = (props) => {
    const [userList, setUserList] = useState([]);
    const userName = props.user;

    useEffect(() => {
        //creates the reference to the realtime database
        const dbRef = ref(realtime);
        const userListNames = [];
        // Firebase refereance path
        const userListRef = child(dbRef, userName)
        onValue(userListRef, (snapshot) => {
            const rankingList = snapshot.val();
            // Get the name of ALL lists created by user
            for (let propertyName in rankingList) {
                const userListObject = {
                    key: propertyName,
                    title: propertyName
                }
                userListNames.push(userListObject);
            }
            setUserList(userListNames);
        });

    }, [userName]);

    return (
        <div className="displayUserLists">
            <h2>Here are your lists: </h2>
            <ul>
                {
                    userList.map((individualList) => {
                        return (
                            <li key={individualList.key}>
                                {/* Send the list name to DisplayMovieInfo component */}
                                <DisplayMovieInfo listName={individualList.title} userName={userName}/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DisplayUserLists;