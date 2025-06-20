const BASE_URL = "https://kudosboard-ldos.onrender.com";


// makeApiRequest: Makes a request to the API endpoint.
// params:
// method (string): The HTTP method to use (POST || DELETE)
// endpoint (string): The API endpoint URL
// data (json object || null)
// returns:
// Returns a promise resolving to the response data or null if the response body is empty.
async function makeApiRequest(method, endpoint, data = null) {
  const url = `${BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {"Content-Type": "application/json"},
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    let errorMessage = res.statusText;
    try {
      const errorData = await res.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (error) {
      console.log("error in making api request");
    }
    throw new Error(
      `HTTP error! status: ${res.status}, message: ${errorMessage}`
    );
  }
  // DELETE requests do not need to handle json
  if (res.status === 204) {
    return null;
  }

  return res.json();
}

// Use generic makeApiRequest calls (for only post and delete)
export function createBoard(data) {
  return makeApiRequest("POST", "/boards", data);
}

export function deleteBoard(board_id) {
  return makeApiRequest("DELETE", "/boards", {board_id});
}

export function searchBoards(query) {
  return makeApiRequest("POST", "/boards/search", {query});
}

export function createCard(data) {
  return makeApiRequest("POST", "/cards", data);
}

export function deleteCard(card_id) {
  return makeApiRequest("DELETE", "/cards", {card_id});
}
//
// GET REQUESTS
//
export async function fetchBoards() {
  const url = `${BASE_URL}/boards`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchCardsByBoardId(board_id) {
  try {
    const res = await fetch(`${BASE_URL}/cards/board/${board_id}`);
    if (!res.ok) {
      throw error;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("cannot fetch the cards", error);
  }
}

//
// PATCH REQUESTS
//
export async function upvoteCard(card_id) {
  const res = await fetch(`${BASE_URL}/cards/upvote`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({card_id}),
  });

  if (!res.ok) {
    console.log("this was error from upvote", error);
    throw new Error(`upvote failed" ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function togglePinCard(card_id) {
  const res = await fetch("http://localhost:3000/cards/pin", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({card_id}),
  });

  if (!res.ok) {
    throw new Error(`pinning failed ${res.statusText}`);
  }

  return await res.json();
}
