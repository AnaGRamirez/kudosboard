import React, {useState} from 'react';
import Header from "../components/Header";
import BoardFilter from "../components/BoardFilter";
import SearchBar from "../components/SearchBar";
import CreateBoardButton from '../components/CreateBoardButton';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    </div>
  );
};

export default Home;
