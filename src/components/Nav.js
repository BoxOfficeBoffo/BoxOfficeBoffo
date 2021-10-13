import { useState } from "react/cjs/react.development";

const Nav = () => {

    const [signedIn, setSignedIn] = useState(false);



    return (
        <nav>
            <ul>
                <li>
                    Home
                </li>
                <li>
                    My Lists
                </li>
                <li onClick={() => setSignedIn(prevState => !prevState)}>
                    {
                    signedIn ?
                        <p>Logout</p>:   
                        <p>Login</p>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Nav;