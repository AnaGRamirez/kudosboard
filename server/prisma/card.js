prisma = require("../prisma/client");

async function getCardsByBoardId(board_id) {
  return await prisma.cards.findMany({
    where: {
      board_id: board_id,
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

async function deleteCard(card_id) {
  return await prisma.cards.delete({
    where: {
      id: parseInt(card_id),
    },
  });
}

async function upvoteCard(card_id) {
  try {
    const updatedCard = await prisma.cards.update({
      where: {id: parseInt(card_id)},
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

async function togglePin(card_id) {
  const card = await prisma.cards.findUnique({
    where: {id: parseInt(card_id)},
  });

  if (!card) {
    throw new Error("Card not found");
  }

  const updated = await prisma.cards.update({
    where: {id: parseInt(card_id)},
    data: {pinned: !card.pinned, createdAt: new Date()},
  });

  return updated;
}

module.exports = {
  getCardsByBoardId,
  createCard,
  deleteCard,
  upvoteCard,
  togglePin,
};
