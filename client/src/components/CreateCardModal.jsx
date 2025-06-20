import React, {useState, useEffect} from "react";
import "./CreateCardModal.css";

const CreateCardModal = ({onClose, onCreate}) => {
  const [title, setTitle] = useState("");
  const [gifQuery, setGifQuery] = useState("");
  const [selectedGif, setSelectedGif] = useState(null);
  const [gifResults, setGifResults] = useState([]);
  const [author, setAuthor] = useState("");
  const [gifurl, setGifurl] = useState("");
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIF_API_KEY}&q=${gifQuery}&limit=3`;

  useEffect(() => {
    if (!gifQuery) {
      return;
    }

    const fetGifs = async () => {
      const res = await fetch(`${url}`);
      const data = await res.json();
      setGifResults(data.data);
    };
    fetGifs();
  }, [gifQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalGifURl = gifurl || selectedGif?.images.fixed_height.url;
    if (!title && !finalGifURl) {
      alert("please enter required data");
      return;
    }
  
      const newCard = {
        title,
        gifurl,
        author,

      };
      onCreate(newCard);
      onClose();

  };

  return (
    <div className="modal-overlay">
        <div className="create-card-modal">
      <div className="modal-card">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Create a Card</h2>
        <form className="create-card-form" onSubmit={handleSubmit}>
          {/* message */}
          <label>
            Message:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {/* author */}
          <label>
            Author (optional):
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
          </label>
          {/* search for a gif */}
          <label>
            Search for a Gif (or paste one below)
            <input
              type="text"
              placeholder="happy, cat, dancing..."
              value={gifQuery}
              onChange={(e) => setGifQuery(e.target.value)}
            ></input>
          </label>
          <div className="gif-results">
            {gifResults.map((gif) => {
                const isSelected = gif.images.fixed_height.url === gifurl;
                return (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className={`gif-option ${isSelected? "selected": ""}`}
                onClick={() => setGifurl(gif.images.fixed_height.url)}
              ></img>
            )})}
          </div>

          <label>
            paste a GIF URL
            <input
              type="text"
              value={gifurl}
              onChange={(e) => {
             setGifurl(e.target.value);
              }}
            ></input>
          </label>

          <div className="create-card-modal-buttons">
            <button type="submit">Add Card</button>
          </div>
        </form>
      </div>
    </div>

    </div>

  
  );
};

export default CreateCardModal;
