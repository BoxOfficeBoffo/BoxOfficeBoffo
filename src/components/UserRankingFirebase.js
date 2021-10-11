import realtime from '../firebase.js';
import { ref, child, set } from 'firebase/database';

const UserRankingList = (array, userName, listName) => {
    const movies = [...array];
    //creates the reference to the realtime database
    const dbRef = ref(realtime);
    //variable with reference to the specified relative path
    const userListRef = child(dbRef, `${userName}/${listName}`)
    set(userListRef, movies);
}

export default UserRankingList;