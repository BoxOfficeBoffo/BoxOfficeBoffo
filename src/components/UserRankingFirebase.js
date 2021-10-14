import realtime from '../firebase.js';
import { ref, child, set } from 'firebase/database';

const UserRankingList = (props) => {
    const movies = [...props.selectedMovies];
    movies.sort((a, b) => {
        return a.rank - b.rank;
    });
    // creates the reference to the realtime database
    const dbRef = ref(realtime);
    // variable with reference to the specified relative path
    const userListRef = child(dbRef, `${props.userName}/${props.year}/${props.listName}`)
    console.log(props.listName)
    // const userListRef = child(dbRef, `${props.userName}/${props.year}/jam`)
    set(userListRef, movies);
}

export default UserRankingList;