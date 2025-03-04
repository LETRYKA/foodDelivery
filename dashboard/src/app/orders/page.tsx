import TableOrder from "@/components/Table";
import { redirect } from "next/navigation";
import { fetchOrders } from "@/lib/api";

const Orders = async () => {
  const orders = await fetchOrders();

  if (orders.error === "Unauthorized") {
    redirect("/auth/sign-in");
  }

  return (
    <div className="w-full h-[90%] flex flex-row">
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full px-9 pb-8 gap-5 pt-2 flex flex-row overflow-hidden">
          <TableOrder orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
