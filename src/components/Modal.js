import { useEffect, useState } from "react";

const Modal = (props) => {
    const [fromCatalogue, setFromCatalogue] = useState(true);
    // keeps track of the message to send to user
    const [modalQuestion, setModalQuestion] = useState("")

    useEffect(() => {
        // checks where the modal is being called from
        const checkLocation = props.from;
        if (checkLocation === "displayMovieInfo") {
            setFromCatalogue(false)
            setModalQuestion("Are you sure you want to delete this list?")
        } else if (checkLocation === "catalogue") {
            setFromCatalogue(true)
            setModalQuestion("Are you finished with your selection? If so please enter a title for your selection and click next to choose ranking")
        }

    }, [props.from])

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h4 className="modalTitle">{modalQuestion}</h4>
                </div>
                {/* if modal called from catalogu, shows form page, otherwise shows the delete button */}
                {
                    fromCatalogue ?
                        <form className="modalBody" onSubmit={(e) => props.handleSubmitMovieList(e)}>
                            <label htmlFor="newListName">Give a name to your list!</label>
                            <div className="modalListTitle">
                                <input
                                    type="text"
                                    id="newListName"
                                    placeholder={`my ${props.year} list`}
                                />
                                <button className="saveButton" type="submit" >Next</button>
                            </div>
                            <button className="closeButton" onClick={props.onClose}>Cancel</button>
                        </form>
                        :
                        <>
                            <button className="deleteButton" onClick={props.handleListDelete}>Delete</button>
                            <button className="closeButton" onClick={props.onClose}>Cancel</button>
                        </>

                }
            </div>
        </div>
    )
}

export default Modal;