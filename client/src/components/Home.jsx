import React, {useState, useEffect} from "react";
import BoardFilter from "./BoardFilter";
import SearchBar from "./SearchBar";
import BoardGrid from "./BoardGrid";
import Header from "./Header";
import CreateBoardButton from "./CreateBoardButton";
import CreateBoardModal from "./CreateBoardModal";

import {
  fetchBoards,
  createBoard,
  deleteBoard,
  searchBoards,
} from "../api/BoardApi";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [allBoards, setAllBoards] = useState([]);
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("entering useeffect ");
    const getAllBoards = async () => {
      try {
        const allboards = await fetchBoards();
        console.log(allboards, "ahaah");
        setAllBoards(allboards);
      } catch (error) {
        console.log("what is this?", error);
      }
    };
    getAllBoards();
  }, []);

  useEffect(() => {
    console.log("boards: ", boards);
  }, [allBoards]);

  // gotta have a state after backend is ready to save the boards;
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setBoards(allBoards);
      return;
    }

    try {
      const results = await searchBoards(query);
      setBoards(results);
    } catch (error) {
      console.log("couldn't search", error);
    }
  };

  const handleCreateBoard = (boardDetails) => {
    const createBoardAsync = async () => {
      try {
        const createdBoard = await createBoard(boardDetails);
        setAllBoards((prevBoards) => [...prevBoards, createdBoard]);
      } catch (error) {
        console.error("Error creating board:", error);
      }
    };
    createBoardAsync();
  };

  const handleDeleteBoard = async (id) => {
    if (
      !window.confirm("are you absolutely sure you want to delete this board")
    )
      return;
    try {
      await deleteBoard(id);
      setAllBoards((prev) => prev.filter((board) => board.id !== id));
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  useEffect(() => {
    const applyFilter = () => {
      let filtered = [...allBoards];

      switch (selectedCategory) {
        case "All":
          break; //no filter

        case "Recent":
          filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          break;

        case "Celebration":
        case "Thank You":
        case "Inspiration":
          filtered = filtered.filter(
            (board) => board.category === selectedCategory
          );
          break;
      }
      setBoards(filtered);
    };
    applyFilter();
  }, [selectedCategory, allBoards]);

  return (
    <div>
      <Header></Header>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <BoardFilter
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <CreateBoardButton onClick={() => setShowCreateBoard(true)} />

      {showCreateBoard && (
        <CreateBoardModal
          onClose={() => setShowCreateBoard(false)}
          onCreate={handleCreateBoard}
        ></CreateBoardModal>
      )}

      <BoardGrid boards={boards} onDelete={handleDeleteBoard}></BoardGrid>
       <footer className="site-footer">
        <p className="footer-catchphrase">
          Thanks for stopping by — see you in the terminal!
        </p>
        <p>&copy; 2025 Ana Ramirez</p>
      </footer>
    </div>
  );
};

export default Home;
