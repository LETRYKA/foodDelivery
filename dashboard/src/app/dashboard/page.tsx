import StatusWidget from "@/components/StatusWidget";
import Income from "@/components/Income";
import Banner from "@/components/Banner";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchOrders } from "@/lib/api";

const Dashboard = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const orders = await fetchOrders();

  if (!token) {
    redirect("/auth/sign-in");
  }
  if (orders.error === "Unauthorized") {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <div className="w-full h-full flex flex-row overflow-hidde">
        <div className="w-full h-full px-9 pb-8 gap-5  pt-2 flex flex-row overflow-hidden">
          <div className="w-[77%] h-full rounded-[var(--radius)]">
            <Banner />
            <div className="w-full flex flex-row mt-5 gap-4">
              <StatusWidget />
              <StatusWidget />
              <StatusWidget />
              <StatusWidget />
            </div>
          </div>
          <div className="w-[23%] h-full rounded-[var(--radius)] flex flex-col justify-start items-center">
            <Income orders={orders} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
