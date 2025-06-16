const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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
