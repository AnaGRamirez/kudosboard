import React from "react";
import "./CreateBoardButton.css";

// click it, we need to render modal. 
// we need to post data
const CreateBoardButton = ({onClick}) => {
    return (
  <div className="create-board-button-container">
    <button className="create-board-button" onClick={onClick}>
     Create a board
    </button>
  </div>
    );
};

export default CreateBoardButton;
