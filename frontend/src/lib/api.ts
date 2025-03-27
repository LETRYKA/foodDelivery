"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

// GET API URL
const API_URL = process.env.API_URL;
console.log(API_URL, "HEEEERE");

// Fetch Current User
export async function fetchCurrentUser() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const res = await axios.get(`${API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
}

// Check User
export async function checkUserSession() {
  const user = await fetchCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return user;
}

// Update User
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
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await axios.put(
      `${API_URL}/api/users/${userId}`,
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
    console.error("Error updating user:", err);
    return { error: "Failed to update user" };
  }
}

// Fetch Food
export async function fetchFood() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await axios.get(`${API_URL}/api/food/food`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching food:", err);
    return { error: "Failed to fetch food" };
  }
}

// Fetch Food Categories
export async function fetchCategory() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  try {
    const res = await axios.get(`${API_URL}/api/food/food-category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching food categories:", err);
    return { error: "Failed to fetch food categories" };
  }
}

// Fetch User Orders
export async function fetchOrder() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  try {
    const user = await fetchCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const res = await axios.get(
      `${API_URL}/api/food/food-order/${user.data._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching order:", err);
    return { error: "Failed to fetch order" };
  }
}

// Create Order
export async function CreateOrder({ items }: { items: any[] }) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  try {
    const user = await fetchCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const res = await axios.post(
      `${API_URL}/api/food/food-order`,
      {
        userId: user.data._id,
        items: items,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating order:", err);
    return { error: "Failed to create order" };
  }
}
