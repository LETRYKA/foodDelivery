"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import ProfileMobile from "@/components/mobile/Profile";
import ProfileWeb from "@/components/Profile";
import { fetchCurrentUser } from "@/lib/api";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => {
        if (!data) {
          console.log(`NOT`);
          redirect("/auth/sign-in");
        } else {
          setUser(data);
          console.log(`FETCH DONE`);
        }
      })
      .catch(() => console.log(`NOT`));

    setIsMobile(window.innerWidth <= 550);
    const handleResize = () => setIsMobile(window.innerWidth <= 550);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (user === null) return <p>Loading...</p>;

  return (
    <>{isMobile ? <ProfileMobile user={user} /> : <ProfileWeb user={user} />}</>
  );
};

export default Profile;
