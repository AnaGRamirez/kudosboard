import React from "react";
 import {Link} from 'react-router-dom';
import "./BoardCard.css";
import { useNavigate } from "react-router-dom";
const BoardCard = ({
  id,
  title,
  category,
  imgURL,
  onView,
  onDelete,
}) => {
    console.log("card props", {title, category, imgURL});
   const navigate = useNavigate();

   const handleView = () => {
    navigate(`/board/${id}`)
   }
  return (
    <div className="board-card">
        <img src={imgURL} alt={title} className="board-image" />

      <div className="board-content">
        <h2 className="board-title">{title}</h2>
        <span className="board-category"> {category} </span>

        <div className="board-actions">
          <Link to={`/boards/${id}`} className="view-button" onClick={handleView}>
            View
          </Link>
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
