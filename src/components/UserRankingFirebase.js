import realtime from '../firebase.js';
import { ref, child, push } from 'firebase/database';

const UserRankingList = (props) => {
    const movies = [...props.selectedMovies];

    // sorts the movies by rank desc 1-10
    movies.sort((a, b) => {
        return a.rank - b.rank;
    });

    // creates the reference to the realtime database
    const dbRef = ref(realtime);

    // variable with reference to the specified relative path
    const userListRef = child(dbRef, `${props.userName}/${props.year}/${props.listName}`)
    push(userListRef, movies);
}

export default UserRankingList;