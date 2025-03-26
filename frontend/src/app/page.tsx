import { redirect } from "next/navigation";

export default function Main() {
  redirect("/home");
  return <div className="">Redirecting...</div>;
}
