const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const cors = require("cors");

app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const boards = require("./routes/boardsRoutes");
app.use("/boards", boards);

const cards = require("./routes/cardsRoutes");
app.use('/cards', cards)


app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Adopt-a-Pet</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>Welcome to my server.</p>
      </body>
    </html>
  `);
});
