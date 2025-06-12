"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import FollowStats from "src/components/FollowStats";
import StoryCard from "src/components/StoryCard";
import { useAllStoryStore } from "src/zustand/stories/allStories";


function toPascalCase(name: string) {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AccountPage() {
  const { data: session, status } = useSession();

  const token = session?.user.token

  console.log("Token is ",token)

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
      console.log("User id in acoount is ",session.user.id)
      setUserStories(response.data.data)  
      console.log("User story are",response.data)

    } catch (error) {

    }
  }
  useEffect(() => {
    if (session?.user.token) {
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

    <div className="bg-gray-200 min-h-screen relative flex flex-col items-center">

      <div className="absolute top-0 left-0 w-full h-32 bg-white rounded-b-[80%]" />

      <div className="mt-40 w-full flex items-center gap-6 bg-amber-800 h-50">
        <div className="flex flex-row items-center gap-10 bg-yellow-400 ml-80">

          <div className="bg-green-700">


            {session.user.image && (
              <Image
                src={session.user.image}
                alt="User profile"
                width={200}
                height={200}
                className="rounded-full border border-gray-300 object-cover"
              />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 bg-red-400 -mt-20 ">
            {toPascalCase(session.user.name || "")}
          </h1>
        </div>
      </div>
      <div className="font-semibold text-2xl bg-amber-500 w-full flex">
        <span className="bg-red-500 ml-120">
          My Posts
        </span>
      </div>

    </div>
  );
}
