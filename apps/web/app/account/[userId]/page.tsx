"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import FollowStats from "src/components/FollowStats";
import NavBar from "src/components/NavBar";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import StoryCard from "src/components/StoryCard";
import { useAllStoryStore } from "src/zustand/stories/allStories";
import { useUserStoryStore } from "src/zustand/stories/userStories";


function toPascalCase(name: string) {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const { userStories, setUserStories } = useUserStoryStore

  const token = session?.user.token

  console.log("Token is ", token)

  async function fetchMyStories() {
    if (!session?.user.id) {
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/get-user-story?userId=${Number(session?.user?.id)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("User id in acoount is ", session.user.id)
      setUserStories(response.data.data)
      console.log("User story are", response.data)

    } catch (error) {

    }
  }
  useEffect(() => {
    if (session?.user.token && session.user.id) {
      fetchMyStories()
    }
  }, [session, token])



  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (

    <div>
      <HomeNavBar />
      <div className="bg-neutral-200 min-h-screen py-8 px-12">
        {/* Profile Section */}
        <div className="flex items-center gap-6 p-20 w-fit ml-40">
          <Image
            src={session.user.image!}
            height={80}
            width={80}
            alt="user-profile"
            className="rounded-full border border-gray-300 object-cover"
          />
          <span className="text-xl font-semibold text-gray-800">
            {toPascalCase(session.user.name || "")}
          </span>
        </div>
        <div className="flex flex-row gap-10  w-fit ml-80 -mt-10">
          <span className="text-lg ">
            Home
          </span>
          <span className="text-lg">
            About
          </span>
          
        </div>
        <div className="h-[1px] bg-gray-400 w-full mt-6" />
      </div>
    </div>
  );
}
