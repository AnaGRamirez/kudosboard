import React, {useState} from "react";
import "./SearchBar.css";

const SearchBar = ({onSearch}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(input);
  };

  const handleClear = () => {
    setInput("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} name="searchbar">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);

          if (value === "") {
            onSearch("");
          }
        }}
        placeholder="serch for a board"
        className="search-input"
      ></input>

      <button type="submit" className="search-button">
        Search
      </button>

      <button type="button" onClick={handleClear} className="clear-button">
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
