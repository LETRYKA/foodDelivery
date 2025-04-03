"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import ProfileMobile from "@/components/mobile/Profile";
import ProfileWeb from "@/components/Profile";
import { fetchCurrentUser } from "@/lib/api";
import { LoaderCircle } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const getUser = async () => {
    try {
      const data: any = await fetchCurrentUser();
      if (!data) {
        console.log(`NOT`);
        redirect("/auth/sign-in");
      } else {
        setUser(data);
        console.log(`FETCH DONE`);
      }
    } catch (error) {
      console.log("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getUser();
    setIsMobile(window.innerWidth <= 550);
    const handleResize = () => setIsMobile(window.innerWidth <= 550);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (user === null) {
    return (
      <div className="w-full h-[900px] flex justify-center items-center">
        <LoaderCircle className="animate-spin" />{" "}
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <ProfileMobile user={user} />
      ) : (
        <ProfileWeb user={user} dataRefresh={getUser} />
      )}
    </>
  );
};

export default Profile;
