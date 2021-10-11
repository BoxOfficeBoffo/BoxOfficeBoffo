import { useEffect, useState } from 'react/cjs/react.development';
import realtime from '../firebase.js';
import { ref, onValue } from 'firebase/database';

const UsersFinalList = () => {

    // const userList =  [
    //     { allLists: {
    //         list1: {
    //             title: "movie1",
    //             rank: 1,
    //             },
    //         list2: {
    //             title: "movie2",
    //             rank: 2,
    //             },
    //         list3: {
    //             title: "movie3",
    //             rank: 3,
    //             }
    //         }
    //     }
    // ]
    // console.log(userList);

    const [ moviesLists, setMovieLists ] = useState([]);

    // FIREBASE SETUP
    useEffect (() => {
        // Reference the realtime database from firebase
        const dbRef = ref(realtime);
        
        // Upon data input, onValue to look for changes and read from the database
        onValue(dbRef, (snapshot) => {
            const myData = snapshot.val();

            // Empty array for the notes object
            const newArray = [];
                // 'For in' loop to gain access to all objects in the array
        
            for (let propName in myData) {
              // Save the loop in a new variable
                const listsObject = {
                    key: propName,
                    list: myData[propName]
                }
            
                // Push all new input on to the notesObject onto the Array
                newArray.push(listsObject)
                }
            // Passing our state the array
            setMovieLists(newArray);
            });
    }, [])


    return (
        <div>
            <p>Tis a fake!</p>
            <ul>
                {
                    moviesLists.map((eachList) => {
                        return (
                            <li key={eachList.key}>
                                <p>{eachList.list}</p>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )

}


export default UsersFinalList;