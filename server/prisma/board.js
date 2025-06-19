const prisma = require("./client");

async function getBoards() {
  let orderBy = {id: "asc"};

  return await prisma.boards.findMany({
    orderBy,
  });
}

async function getBoardById(id) {
  return await prisma.boards.findUnique({
    where: {id: parseInt(id)},
  });
}

async function createBoard(data) {
  return prisma.boards.create({
    data, //object with the values {title, imageurl, author, catgory}
  });
}

async function deleteBoard(id) {
  return await prisma.boards.delete({
    where: {id: parseInt(id)},
  });
}

async function searchBoardsByTitle(query) {
  return await prisma.boards.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
}

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
  searchBoardsByTitle,
};
