"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import axios from "axios";
import { StoryType } from "src/types/types";

interface Props {
  email: string;
}

export default function AccountPageClient({ email }: Props) {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<{ name: string; image: string } | null>(null);
  const [myStory, setMyStory] = useState<StoryType[]>([]);

  useEffect(() => {
    if (session?.user.token && email) {
      fetchPosts();
    }
  }, [session?.user.token, email]);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/get-user-story/${email}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      setMyStory(response.data.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
            {profileData?.name}
          </span>
        </div>

        <div className="flex flex-row gap-10 w-fit ml-80 -mt-10">
          <span className="text-lg">Home</span>
          <span className="text-lg">About</span>
        </div>

        <div className="h-[1px] bg-gray-400 w-full mt-6" />

        <div className="mt-10 ml-40">
          <h2 className="text-2xl font-semibold mb-4">My Stories</h2>
          {myStory.length > 0 ? (
            myStory.map((story) => (
              <div key={story.id} className="bg-white shadow p-4 rounded mb-4">
                <h3 className="text-xl font-bold">{story.title}</h3>
                <p className="text-gray-700">{story.content}</p>
              </div>
            ))
          ) : (
            <p>No stories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
