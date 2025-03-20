import axios from "axios";

// ORDER API

export async function fetchFood() {
  try {
    const res = await axios.get("http://localhost:8080/api/food/food", {
      headers: { Authorization: `Bearer` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching food:", err);
    return { error: "Failed to fetch food" };
  }
}

export async function fetchCategory() {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/food/food-category",
      {
        headers: { Authorization: `Bearer` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching food:", err);
    return { error: "Failed to fetch food" };
  }
}
