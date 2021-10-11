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
            for (let propertyName in rankingList) {
                const userListObject = {
                    key: propertyName,
                    title: propertyName
                }
                userListNames.push(userListObject);
            }

            if (userListNames.length > 0) {
                setUserList(userListNames);
                for (let i = 0; i < userListNames.length; i++) {
                    const userMovieListRef = child(dbRef, `${userName}/${userListNames[i].title}`);
                    onValue(userMovieListRef, (snapshot) => {
                        const stuff = snapshot.val();
                        const movieInfo = []
                        // console.log(stuff);
                        for (let stuffProps in stuff) {
                            const movieInfoObject = {
                                key: stuffProps,
                                title: stuff[stuffProps].title,
                                poster: stuff[stuffProps].photo,
                                rank: stuff[stuffProps].rank
                            }
                            // console.log(stuff[stuffProps]);
                            movieInfo.push(movieInfoObject);
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
                    return (
                        <div key={individualList.key}>
                            <h5>{individualList.title}</h5>
                            {
                                movieList.map((individualMovie) => {
                                    return (
                                        <div key={individualMovie.key}>
                                            <p>{individualMovie.title}</p>
                                            <p>{individualMovie.rank}</p>
                                        </div>
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