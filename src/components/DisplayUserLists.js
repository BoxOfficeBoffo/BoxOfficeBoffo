import realtime from '../firebase.js';
import { ref, child, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import DisplayMovieInfo from './DisplayMovieInfo.js';

const DisplayUserLists = (props) => {
    const [userList, setUserList] = useState([]);
    // const [movieList, setMovieList] = useState([]);
    // console.log(props);

    useEffect(() => {
        const userName = props.user;
        //creates the reference to the realtime database
        const dbRef = ref(realtime);
        //variable with reference to the specified relative path
        const userListNames = [];
        const userListRef = child(dbRef, userName)
        onValue(userListRef, (snapshot) => {
            const rankingList = snapshot.val();
            for (let propertyName in rankingList) {
                const userListObject = {
                    key: propertyName,
                    title: propertyName
                }
                userListNames.push(userListObject);
            }
            setUserList(userListNames);
        });

    }, []);

    return (
        // double map
        <div className="displayUserLists">
            <h2>Here are your lists: </h2>
            {
                userList.map((individualList) => {
                    return (
                        <div key={individualList.key}>
                            <h5>{individualList.title}</h5>

                            <DisplayMovieInfo listName={individualList.title} userName={props.user}/>
                            <button>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayUserLists;