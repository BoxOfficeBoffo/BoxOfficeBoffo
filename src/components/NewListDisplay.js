import realtime from '../firebase.js';
import { ref, child, onValue } from 'firebase/database';
import DisplayMovieInfo from "./DisplayMovieInfo";

const NewListDisplay = (props) => {
    let userListNames;

    const dbRef = ref(realtime);
    //     Create new firebase reference path
    const allUserListNamesRef = child(dbRef, `${props.userName}/${props.year}`);
    onValue(allUserListNamesRef, (snapshot) => {
        const allUserListNames = snapshot.val();

        // Get the names of ALL lists created by user
        for (let listProperty in allUserListNames) {
            userListNames = listProperty;
        }
    })



    return (
        <>
            <DisplayMovieInfo userName={props.userName} listName={userListNames} year={props.year}/>
        </>
    )

}

export default NewListDisplay;