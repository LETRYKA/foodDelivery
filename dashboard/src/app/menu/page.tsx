import TableOrder from "@/components/Table";
import { redirect } from "next/navigation";
import { fetchOrders } from "@/lib/api";

const Menu = async () => {
  const orders = await fetchOrders();

  if (orders.error === "Unauthorized") {
    redirect("/auth/sign-in");
  }

  return <div>page</div>;
};

export default Menu;
