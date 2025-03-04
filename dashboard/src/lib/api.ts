"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function fetchOrders() {
  const token = (await cookies()).get("token")?.value;
  
  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.get("http://localhost:8080/api/food/food-order", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { error: "Failed to fetch orders" };
  }
}

export async function updateStatus(props: any) {
  const { orderId, newStatus } = props;
  const token = (await cookies()).get("token")?.value;
  
  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    const res = await axios.patch(`http://localhost:8080/api/food/food-order/${orderId}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { error: "Failed to fetch orders" };
  }
}
