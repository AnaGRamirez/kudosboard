import React from "react";
import "./CreateBoardButton.css";

// click it, we need to render modal. 
// we need to post data
const CreateBoardButton = () => {
    return (
  <div className="create-board-button-container">
    <button className="create-board-button">
     Create a board
    </button>
  </div>
    );
};

export default CreateBoardButton;
