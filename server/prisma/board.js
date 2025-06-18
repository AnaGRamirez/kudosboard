const prisma = require("./client");

async function getBoards(filter) {
  let whereClause = {};
  let orderBy = {id: "asc"};

  if (["Celebration", "Thank You", "Inspiration"].includes(filter)) {
    whereClause = filter;
  }

  if (filter === "Recent") {
    orderBy = {createdAt: "desc"};
  }

  return await prisma.boards.findMany({
    where: whereClause,
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
