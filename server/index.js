//
// //imports
//
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//
// Import and Use routes (boards and cards routes)
//
const boards = require("./routes/boardsRoutes");
app.use("/boards", boards);

const cards = require("./routes/cardsRoutes");
app.use("/cards", cards);

app.get("/", (req, res) => {
  res.send("Welcome to THE KUDOSBOARD API");
});
