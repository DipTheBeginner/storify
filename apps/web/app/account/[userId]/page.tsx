"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import { useUserStoryStore } from "src/zustand/stories/userStories";

function toPascalCase(name: string) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const { setUserStories } = useUserStoryStore();
  const params = useParams();
  const userIdFromURL = params?.userId as string;
  const token = session?.user?.token;
  const [profileData, setProfileData] = useState<{ name: string; image: string } | null>(null);

  const isOwnProfile = session?.user?.id === (userIdFromURL);

  useEffect(() => {
    if (!userIdFromURL || !token) return;

    // Fetch stories of the given userId
    async function fetchUserStories() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-user-story?userId=${userIdFromURL}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserStories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      }
    }

    // Fetch profile info (for other users)
    async function fetchUserProfile() {
      try {
        if (isOwnProfile) {
          setProfileData({
            name: session.user.name || "",
            image: session.user.image || "",
          });
        } else {
          const res = await axios.get(`http://localhost:8080/api/get-user-info?userId=${userIdFromURL}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfileData({ name: res.data.name, image: res.data.image });
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    }

    fetchUserStories();
    fetchUserProfile();
  }, [userIdFromURL, token, isOwnProfile]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You are not logged in</p>;

  return (
    <div>
      <HomeNavBar />
      <div className="bg-neutral-200 min-h-screen py-8 px-12">
        <div className="flex items-center gap-6 p-20 w-fit ml-40">
          {profileData?.image && (
            <Image
              src={profileData.image}
              height={80}
              width={80}
              alt="user-profile"
              className="rounded-full border border-gray-300 object-cover"
            />
          )}
          <span className="text-xl font-semibold text-gray-800">
            {toPascalCase(profileData?.name || "")}
          </span>
        </div>

        <div className="flex flex-row gap-10 w-fit ml-80 -mt-10">
          <span className="text-lg">Home</span>
          <span className="text-lg">About</span>
        </div>

        <div className="h-[1px] bg-gray-400 w-full mt-6" />
      </div>
    </div>
  );
}
