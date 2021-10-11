import realtime from '../firebase.js';
import { ref, child, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

const DisplayUserLists = (props) => {
    const [userList, setUserList] = useState([]);
    const [movieList, setMovieList] = useState([]);
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
            // console.log(rankingList);
            for (let propertyName in rankingList) {
                userListNames.push(propertyName);
                // console.log(rankingList[propertyName]);
                // count++;
            }

            // console.log(userListNames.length, userListNames)
            if (userListNames.length > 0) {
                setUserList(userListNames);
                for (let i = 0; i < userListNames.length; i++) {
                    const userMovieListRef = child(dbRef, `${userName}/${userListNames[i]}`);
                    onValue(userMovieListRef, (snapshot) => {
                        const stuff = snapshot.val();
                        const movieInfo = []
                        // console.log(stuff);
                        for (let stuffProps in stuff) {
                            // console.log(stuff[stuffProps]);
                            movieInfo.push(stuff[stuffProps].title);
                        }
                        // console.log(movieInfo);
                        setMovieList(movieInfo);
                    })
                }
            }
        });

    }, []);

    return (
        // double map
        <div className="displayUserLists">
            <h2>Here are your lists: </h2>
            {
                userList.map((individualList) => {
                    return(
                        <div>
                            <h5>{individualList}</h5>
                            {
                                movieList.map((individualMovie) => {
                                    return(
                                        <>
                                            <p>{individualMovie}</p>
                                        </>
                                    )
                                })
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayUserLists;