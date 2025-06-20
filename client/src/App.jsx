import Home from "./components/Home";
import {Routes, Route} from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boards/:boardId" element={<BoardPage />} />
    </Routes>
  );
}
export default App;
