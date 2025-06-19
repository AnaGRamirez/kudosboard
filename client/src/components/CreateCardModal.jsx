import React, { useState } from "react";
import "./CreateCardModal.css";

const CreateCardModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [gifurl, setGifurl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      title,
      gifurl,
      upvotes: 0,
    };
    onCreate(newCard);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Create a Card</h2>
        <form className="new-card-form" onSubmit={handleSubmit}>
          <label>
            Message:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Gif URL:
            <input
              type="text"
              value={gifurl}
              onChange={(e) => setGifurl(e.target.value)}
              required
            />
          </label>
          <div className="create-card-modal-buttons">
            <button type="submit">Add Card</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardModal;
