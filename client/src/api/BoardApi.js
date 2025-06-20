// This files defines the functions to connect backend with frontend

// const BASE_URL = "https://kudosboard-ldos.onrender.com";
const BASE_URL = "http://localhost:3000"
export async function fetchBoards() {
  const url = `${BASE_URL}/boards`;
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await res.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
export async function createBoard(data = {boardData}) {
  const url = `${BASE_URL}/boards`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteBoard(id) {
  const res = await fetch(`${BASE_URL}/boards`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
  });

  if (!res.ok) {
    throw error;
  }
}

export async function searchBoards(query) {
  const res = await fetch(`${BASE_URL}/boards/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query}),
  });
  if (!res.ok) {
    throw error;
  }

  return await res.json();
}

export async function fetchCardsByBoardId(boardId) {
  try {
    const res = await fetch(`${BASE_URL}/cards/board/${boardId}`);
    if (!res.ok) {
      throw error;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("cannot fetch the cards", error);
  }
}
export async function createCard({title, gifurl, author, upvotes, board_id}) {
  const res = await fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, gifurl, author, upvotes, board_id}),
  });

  if (!res.ok) {
    throw new Error(`Failed to create card: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function deleteCard(cardId) {
  const res = await fetch(`${BASE_URL}/cards`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({cardId}),
  });

  return;
}

export async function upvoteCard(cardId) {
  const res = await fetch(`${BASE_URL}/cards/upvote`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({cardId}),
  });

  if(!res.ok){
    console.log("this was error from upvote", error);
    throw new Error(`upvote failed" ${res.status} ${res.statusText}`)
  }
  return await res.json();
}


export async function togglePinCard(cardId){
  const res = await fetch("http://localhost:3000/cards/pin", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({cardId}),
  });

  if(!res.ok){
    throw new Error (`pinning failed ${res.statusText}`)
  }
  
  return await res.json();

  }
