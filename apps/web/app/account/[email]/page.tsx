"use client"
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import axios from "axios";
import { StoryType } from "src/types/types";

interface Props {
  params: Promise<{
    email: string;
  }>
}

export default function AccountPage({ params }: Props) {
  // const [email, setEmail] = useState<string>("");
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<{ name: string; image: string } | null>(null);
  const { email: encodedEmail } = use(params);
  const email = decodeURIComponent(encodedEmail);
  console.log("email now is ==", email)
  const[myStory,setMyStory]=useState<StoryType[]>([]);

  async function fetchPosts() {
    const response = await axios.get(`http://localhost:8080/api/get-user-story/${email}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`
        }
      }
    )
    setMyStory(response.data.data)

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