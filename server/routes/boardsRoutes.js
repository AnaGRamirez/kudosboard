const express = require("express");
const router = express.Router();

prisma = require("../prisma/client")



prisma = require('')
const {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
} = require("../prisma/board");

router.get("/", async (req, res) => {
  const {filter} = req.body;

  try {
    const boards = await getBoards(filter);
    res.json(boards);
  } catch (error) {
    console.log("did not fetch", error);
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const board = await getBoardById(id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send("board not found");
    }
  } catch (error) {
    console.error("sorry server error");
  }
});

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    const newBoard = await createBoard(data);
    res.status(201).send(newBoard);
  } catch (error) {
    console.log("failed ot create", error);
  }
});

router.delete("/", async (req, res) => {
  const {id} = req.body;

  if (!id) {
    return res.status(400).send("can't delete without id");
  }
  try {
    await deleteBoard(id);
  } catch (error) {
    res.status(500).send("could not delete this board", error);
  }
});
