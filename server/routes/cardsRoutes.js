const express = require("express");
const router = express.Router();

const {getCardsByBoardId, createCard, deleteCard} = require("../prisma/card");

router.get("/board/:id", async (req, res) => {
  const boardId = parseInt(req.params.id);
  try {
    const cards = await getCardsByBoardId(boardId);
    res.json(cards);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  const {title, gifurl, author, upvotes, board_id} = req.body;
  if (!title || !gifurl || !board_id){

    console.log("required fields missing")
    return res.status(400).send()
  }
  try {
    const newCard = await createCard({title, gifurl, board_id, author, upvotes});
    res.status(201).send(newCard);
  } catch (error) {
    console.log("error in creating a card", error);
    res.status(500).send();
  }
});

router.delete("/", async (req, res) => {
  const {cardId} = req.body;
  if (!cardId) {
    return res.status(400).send()
  }
  try {
    await deleteCard(parseInt(cardId));
    res.status(200).send();
  } catch (error) {
    console.log("error in deleting cards", error);
    res.status(500).send();
  }
});



// router.post("upvote/", async (req, res) => {
//   const {card_id} = req.body;

//   if (!card_id){
//     return res.status(400).send()
//   }
//   try {
//     const newCard = await createCard({title, gifurl, board_id, author, upvotes});
//     res.status(201).send(newCard);
//   } catch (error) {
//     console.log("error in creating a card", error);
//     res.status(500).send();
//   }
// });


module.exports = router;
