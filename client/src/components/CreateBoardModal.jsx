import React, {useState} from "react";
import "./CreateBoardModal.css";

const CreateBoardModal = ({onClose, onCreate}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  var imageurl = "https://picsum.photos/200/300?random=197";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !category) {
      alert("please fill out the required fields");
      return;
    }

    // TODO: Add submision logic here
    const data = {title, imageurl, author, category};
    onCreate(data); 
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form className="new-board-form" onSubmit={handleSubmit}>
        <button className="close-button" type="button" onClick={onClose}>
          X
        </button>

        <h2>Create New Board</h2>
        <label> Title: </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category:</label>

        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=""> Select a category </option>

          <option value="Celebration"> Celebration</option>

          <option value="Thank You"> Thank You</option>
          <option value="Inspiration"> Inspiration</option>
        </select>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>

        <button className="submit" type="submit">
          {" "}
          Create Board
        </button>
      </form>
    </div>
  );
};

export default CreateBoardModal;
