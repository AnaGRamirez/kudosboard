const express = require("express");
const router = express.Router();

prisma = require("../prisma/client");

prisma = require("../prisma/client");

async function getCardsByBoardId(boardId) {
  return await prisma.cards.findMany({
    where: {
      board_id: boardId,
    },
    orderBy: {
      id: "asc",
    },
  });
}

async function createCard(data) {
  return await prisma.cards.create({
    data: {
      title: data.title,
      gifurl: data.gifurl,
      author: data.author || null,
      upvotes: data.upvotes || 0,
      board_id: parseInt(data.board_id),
    },
  });
}

async function deleteCard(cardId) {
  return await prisma.cards.delete({
    where: {
      id: parseInt(cardId),
    },
  });
}

// upvote helper

async function upvoteCard(cardId) {
  try {
    const updatedCard = await prisma.cards.update({
      where: {id: parseInt(cardId)},
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
    return updatedCard;
  } catch (error) {
    console.log("error in updating card", error);
  }

}

module.exports = {
  getCardsByBoardId,
  createCard,
  deleteCard,
  upvoteCard,
};
