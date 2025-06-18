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
    data, //object with the values {titel, imageurl, author, catgory}
  });
}

async function deleteBoard(id) {
  return await prisma.boards.delete({
    where: {id: parseInt(id)},
  });
}

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  deleteBoard,
};
