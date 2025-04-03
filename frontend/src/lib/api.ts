"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

// GET API URL
const API_URL = process.env.API_URL;

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
  profile,
  cover,
}: {
  Username?: string;
  Phone?: string;
  Email?: string;
  Password?: string;
  Address?: string;
  userId: string;
  profile?: string;
  cover?: string;
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  const payload: any = {};
  if (Username) payload.name = Username;
  if (Phone) payload.phoneNumber = Phone;
  if (Email) payload.email = Email;
  if (Password) payload.password = Password;
  if (Address) payload.address = Address;
  if (profile) payload.profile = profile;
  if (cover) payload.cover = cover;

  try {
    const res = await axios.put(`${API_URL}/api/users/${userId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    return { error: "Failed to update user" };
  }
}

// Fetch Food
export async function fetchFood(page: number, limit: number) {
  try {
    const res = await axios.get(
      `${API_URL}/api/food/food?page=${page}&limit=${limit}`
    );

    return {
      foodItems: res.data.data, // List of food items
      pagination: res.data.pagination, // Extract pagination info
    };
  } catch (err) {
    console.error("Error fetching food:", err);
    return { foodItems: [], pagination: { currentPage: 1, totalPages: 1 } };
  }
}

// Fetch food by id
export async function fetchFoodById({ foodId }: { foodId: string }) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  try {
    const user = await fetchCurrentUser();
    const res = await axios.get(`${API_URL}/api/food/food/${foodId}`, {
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

// Fetch food by Categories
export async function fetchFoodByCategories({ id }: { id: string }) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return { error: "Unauthorized" };

  try {
    const user = await fetchCurrentUser();
    if (!user) return { error: "Unauthorized" };

    const res = await axios.get(`${API_URL}/api/food/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating order:", err);
    return { error: "Failed to create order" };
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
