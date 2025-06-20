import React from "react";
import "./BoardFilter.css";

const categories = ["All", "Recent", "Celebration", "Thank You", "Inspiration"];

const BoardFilter = ({selectedCategory, onSelect}) => {
  return (
    <div className="board-filter">
      <div className="board-filter-scroll">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardFilter;
