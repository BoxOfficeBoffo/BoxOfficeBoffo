import React from "react";

function ModalListCreation(props) {

  if(!props.show){
    return null
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <div className="modalHeader">
          <h4 className="modalTitle">Are you finished your selection? If so please enter a title for your selection and click next to choose ranking</h4>
        </div>
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
      </div>
    </div>
  )

}
export default ModalListCreation;