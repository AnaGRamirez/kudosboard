import React, {useState} from "react";
import BoardFilter from "../components/BoardFilter";
import SearchBar from "../components/SearchBar";
import BoardCard from "../components/BoardCard";
import BoardGrid from "../components/BoardGrid";
import Header from "../components/Header";
import CreateBoardButton from "../components/CreateBoardButton";
import CreateBoardModal from "../components/CreateBoardModal";
import {fetchBoards, createBoard} from "../api/BoardApi";
import {useEffect} from "react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    console.log("entering useeffect ");
    const getAllBoards = async () => {
      try {
        const allboards = await fetchBoards();
        console.log(allboards, "ahaah");
        setBoards(allboards);
      } catch (error) {
        console.log("what is this?", error);
      }
    };
    getAllBoards();
  }, []);

  useEffect(() => {
    console.log("boards: ", boards);
  }, [boards]);

  // gotta have a state after backend is ready to save the boards;
  const handleSearch = (query) => {
    //todo:backend first
    console.log("you are searching for ", query);
  };

const handleCreateBoard = (boardDetails) => {
  const createBoardAsync = async () => {
    try {
      const createdBoard = await createBoard(boardDetails);
      setBoards((prevBoards) => [...prevBoards, createdBoard]);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  createBoardAsync();
}

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

      <BoardGrid boards={boards}></BoardGrid>
    </div>
  );
};

export default Home;
