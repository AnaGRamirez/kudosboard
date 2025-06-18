// This files defines the functions to connect backend with frontend

const BASE_URL = "http://localhost:3000";

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
