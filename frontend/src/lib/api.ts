"use server";

import { cookies } from "next/headers";
import axios from "axios";

// USER API

export const fetchCurrentUser = async (token: string) => {
  try {
    const res = await axios.get("http://localhost:8080/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export async function PatchUser({
  Username,
  Phone,
  Email,
  Password,
  Address,
  userId,
}: {
  Username: string;
  Phone: string;
  Email: string;
  Password: string;
  Address: string;
  userId: string;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.put(
      `http://localhost:8080/api/users/${userId}`,
      {
        name: Username,
        email: Email,
        password: Password,
        phoneNumber: Phone,
        address: Address,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error patching food:", err);
    return { error: "Failed to patch food" };
  }
}

// FETCH FOOD

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

// ORDER API

export async function CreateOrder({
  userId,
  items,
}: {
  userId: string;
  items: [];
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.put(
      `http://localhost:8080/api/food/food-order`,
      {
        userId: userId,
        items: items,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating order", err);
    return { error: "Failed to create order" };
  }
}
