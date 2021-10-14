import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

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
                    Home
                </li>
                <li>
                    My Lists
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