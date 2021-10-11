import realtime from '../firebase.js';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

const UserRankingList = () => {
    const dbRef = ref(realtime);
    const [movieRankingList, setMovieRankingList] = useState([]);

    useEffect( () => {
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const userList = [];
            console.log(data);
            for (let users in data) {
                userList.push(users)
            }
            console.log(userList);

            // snapshot.forEach((childSnapshot) => {
            //     const myData = childSnapshot.val();
            //     console.log(myData);
            //     const newArray = [];
            // });
        });
    }, []);
    
    return(
        <h5>This is a sentence</h5>
    )
}

export default UserRankingList;