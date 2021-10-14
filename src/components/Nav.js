import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";


const Nav = () => {
    const [signedIn, setSignedIn] = useState(false);
    const auth = getAuth();


    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                setSignedIn(true);
                
            }).catch((error) => {
                console.log(error)
            })
    }

    const signingOut = () => {
        signOut(auth)
        setSignedIn(false);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSignedIn(true)
            } else {
                setSignedIn(false)
            }
        });
    }, [auth])


    return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user/myList">My Lists</Link>
                    </li>
                    {
                        signedIn ?
                            <li onClick={signingOut}>Logout</li>:
                            <li onClick={signInWithGoogle}>Login</li>
                    }
                </ul>
            </nav>
    )
}

export default Nav;