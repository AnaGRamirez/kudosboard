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
    console.log('data: ', data)
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
