import { useState } from "react"

const DisplayCatalogue = (movies) => {
    console.log(movies);

    return (
        <div className="displayCatalogue">
            <ul>
                {/* {
                    movies.map( (individualMovie) => {
                        return(
                            <li key={individualMovie.id}>
                                <h2>{individualMovie.original_title}</h2>
                            </li>
                        )
                    })
                } */}
            </ul>
        </div>
    )
}

export default DisplayCatalogue

