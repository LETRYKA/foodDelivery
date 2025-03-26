"use server";

import { cookies } from "next/headers";
import axios from "axios";

// GET API URL
const API_URL = process.env.API_URL;

// ORDER API

export async function fetchOrders() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.get(`${API_URL}/api/food/food-order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { error: "Failed to fetch orders" };
  }
}

export async function updateStatus({
  orderId,
  newStatus,
}: {
  orderId: string;
  newStatus: string;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.patch(
      `${API_URL}/api/food/food-order/${orderId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(`dsadsadsads`, orderId);
    return res.data;
  } catch (err) {
    console.error("Error updating order status:", err);
    return { error: "Failed to update order status" };
  }
}

export async function deleteOrder({ orderId }: { orderId: string }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.delete(`${API_URL}api/food/food-order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting order:", err);
    return { error: "Failed to delete order" };
  }
}

// FOOD API

export async function fetchFoods() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.get(`${API_URL}/api/food/food`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { error: "Failed to fetch orders" };
  }
}

export async function fetchFoodById({ foodId }: { foodId: string }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.get(`${API_URL}/api/food/food/${foodId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error getting food:", err);
    return { error: "Failed to get food" };
  }
}

export async function PatchFoodById({
  foodId,
  foodName,
  foodPrice,
  foodDescription,
  foodImage,
  Category,
}: {
  foodId: string;
  foodName: string;
  foodPrice: number;
  foodDescription: string;
  foodImage: string;
  Category: string;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.patch(
      `${API_URL}/api/food/food/${foodId}`,
      {
        foodName,
        price: foodPrice,
        description: foodDescription,
        image: foodImage,
        categoryId: Category,
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

export async function CreateFood({
  foodName,
  foodPrice,
  foodDescription,
  foodImage,
  categoryId,
}: {
  foodName: string;
  foodPrice: number;
  foodDescription: string;
  foodImage: string;
  categoryId: [];
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.post(
      `${API_URL}/api/food/food`,
      {
        foodName,
        price: foodPrice,
        description: foodDescription,
        image: foodImage,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating food:", err);
    return { error: "Failed to create food" };
  }
}

export async function deleteFoodById({ foodId }: { foodId: string }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.delete(`${API_URL}/api/food/food/${foodId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting food", err);
    return { error: "Failed to delete food" };
  }
}

// CATEGORY API

export async function fetchCategory() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.get(`${API_URL}/api/food/food-category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return { error: "Failed to fetch category" };
  }
}

export async function createCategory({ name }: { name: string }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.post(`${API_URL}/api/food/food-category}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting order:", err);
    return { error: "Failed to delete order" };
  }
}

export async function editCategory({ id, name }: { id: string; name: string }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.patch(
      `${API_URL}/api/food/food-category${id}`,
      {
        name,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error patching category:", err);
    return { error: "Failed to create category" };
  }
}

export async function deleteCategory({ id }: { id: string }) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.delete(`${API_URL}/api/food/food-category${id}}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting category:", err);
    return { error: "Failed to delete category" };
  }
}
