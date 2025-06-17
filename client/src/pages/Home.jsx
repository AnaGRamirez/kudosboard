import React, {useState} from "react";
import BoardFilter from "../components/BoardFilter";
import SearchBar from "../components/SearchBar";
import BoardCard from "../components/BoardCard";
import BoardGrid from "../components/BoardGrid";
import Header from "../components/Header";
import CreateBoardButton from "../components/CreateBoardButton";

const Home = () => {

  console.log("h0ome is loading");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCreateBoard, setShowCreateBoard] = useState(true);


  // gotta have a state after backend is ready to save the boards;
  const handleSearch = (query) => {
    //todo:backend first
    console.log("you are searching for ", query);
  };


  return (
    <div>
      <Header></Header>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <BoardFilter
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <CreateBoardButton onClick={()=> console.log("hahaha")}/> 

      {/* <BoardGrid boards = {[]}></BoardGrid> */}
      <BoardGrid
        boards={[
          {
            title: "ana's Bd",
            category: "Thank you",
            imgURL:
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXljMnhmOWZkcmhkZWpqd3lidzR3bmFzdmdhZjdxZTMycHRxYzJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VeT5jhseHD0W3dI7de/giphy.gif",
            onView: () => console.log("Hahah"),
            onDelete: () => console.log("Hahah"),
          },
          {
            title: "ana's Bd",
            category: "Thank you",
            imgURL:
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXljMnhmOWZkcmhkZWpqd3lidzR3bmFzdmdhZjdxZTMycHRxYzJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VeT5jhseHD0W3dI7de/giphy.gif",
            onView: () => console.log("Hahah"),
            onDelete: () => console.log("Hahah"),
          },
          {
            title: "ana's Bd",
            category: "Thank you",
            imgURL:
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXljMnhmOWZkcmhkZWpqd3lidzR3bmFzdmdhZjdxZTMycHRxYzJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VeT5jhseHD0W3dI7de/giphy.gif",
            onView: () => console.log("Hahah"),
            onDelete: () => console.log("Hahah"),
          },
          {
            title: "ana's Bd",
            category: "Thank you",
            imgURL:
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXljMnhmOWZkcmhkZWpqd3lidzR3bmFzdmdhZjdxZTMycHRxYzJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VeT5jhseHD0W3dI7de/giphy.gif",
            onView: () => console.log("Hahah"),
            onDelete: () => console.log("Hahah"),
          },
          {
            title: "ana's Bd",
            category: "Thank you",
            imgURL:
              "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXljMnhmOWZkcmhkZWpqd3lidzR3bmFzdmdhZjdxZTMycHRxYzJzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VeT5jhseHD0W3dI7de/giphy.gif",
            onView: () => console.log("Hahah"),
            onDelete: () => console.log("Hahah"),
          },
        ]}
      ></BoardGrid>
    </div>
  );
};

export default Home;
