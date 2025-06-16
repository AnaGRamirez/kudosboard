import React from "react";
import BoardCard from "./BoardCard";
import "./BoardGrid.css";

const BoardGrid = ({boards}) => {
  const renderCards = () => {
    return boards.map((board, index) => (
      <BoardCard
        key={index}
        id= {index}
        title={board.title}
        category={board.category}
        imgURL={board.imgURL}
        onView={() => console.log("you are vieweing board ", index)}
        onDelete={() => console.log("you are deleting board ", index)}
      ></BoardCard>
    ));
  };

  return (
    <div className="board-grid-container">
      {boards.length===0? (
        <div className="grid-message">
          <h3> No boards yet. Create one! </h3>
        </div>
      ) : (
        <div className="board-grid"> {renderCards()}</div>
      )}
    </div>
  );
};

export default BoardGrid;