import React, {useState} from "react";
import "./SearchBar.css";

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} name="searchbar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
