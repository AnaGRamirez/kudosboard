//
// //imports
//
const express = require("express");
const router = express.Router();
const {
  getCardsByBoardId,
  createCard,
  deleteCard,
  upvoteCard,
  togglePin,
} = require("../prisma/card");


//
// Routes for cards
//
router.get("/board/:id", async (req, res) => {
  const board_id = parseInt(req.params.id);
  try {
    const cards = await getCardsByBoardId(board_id);
    res.json(cards);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const {title, gifurl, author, upvotes, board_id} = req.body;

  if (!title || !gifurl || !board_id) {
    console.log("required fields missing", title, gifurl, board_id);
    return res.status(400).send();
  }
  try {
    const newCard = await createCard({
      title,
      gifurl,
      board_id,
      author,
      upvotes,
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.log("e  rror in creating a card", error);
    res.status(500).send();
  }
});

router.delete("/", async (req, res) => {
  const {card_id} = req.body;
  if (!card_id) {
    return res.status(400).send();
  }
  try {
    await deleteCard(parseInt(card_id));
    res.status(204).send();
  } catch (error) {
    console.log("error in deleting cards", error);
    res.status(500).send();
  }
});

router.patch("/upvote", async (req, res) => {
  const {card_id} = req.body;

  if (!card_id) {
    return res.status(400).send();
  }
  try {
    const updatedCard = await upvoteCard(card_id);
    res.status(200).json(updatedCard);
  } catch (error) {
    console.log("error in upvoting card", error);
  }
});

router.patch("/pin", async (req, res) => {
  const {card_id} = req.body;
  if (!card_id) {
    return res.status(400).send("Card ID missing");
  }
  try {
    const updated = await togglePin(parseInt(card_id));
    res.status(200).json(updated);
  } catch (error) {
    console.log("could not toggle the pin", error);
    res.status(500).send(error);
  }
});

module.exports = router;
