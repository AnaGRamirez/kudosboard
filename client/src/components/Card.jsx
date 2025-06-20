import React from "react";
import "./Card.css";

const Card = ({ id, title, gifurl, upvotes, onUpvote, onDelete}) => {
  return (
    <div className="card">
      <img src={gifurl} alt="gif" className="gif" />

      <div className="card-info">
        <h3>{title}</h3>
        <p>{upvotes}</p>
        <div className="buttons">
          <button onClick={onUpvote}>Upvote</button>

          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
