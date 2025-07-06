"use client";

import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    account: string;
  };
}

interface UserData {
  name: string;
  email: string;
  image: string;
  followers: { id: string }[];
  following: { id: string }[];
  story: {
    id: string;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
  }[];
}

export default function Page({ params }: PageProps) {
  const { data: session } = useSession();
  const { account } = params;
  const decodedEmail = decodeURIComponent(account).slice(1); // removes "@"

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUserAccount() {
    try {
      console.log("🔄 Fetching data for:", decodedEmail);

      const response = await axios.get(
        `http://localhost:8080/api/account-data/${decodedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      console.log("✅ Response:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.user.token) {
      fetchUserAccount();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">Loading profile...</div>
    );
  }

  if (!userData) {
    return (
      <div className="p-6 text-center text-red-500">Error loading account data.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Image
          src={userData.image}
          alt="User Profile"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <p className="text-sm text-gray-600">{userData.email}</p>
          <div className="mt-2 text-sm text-gray-700 flex gap-4">
            <span>{userData.followers.length} Followers</span>
            <span>{userData.following.length} Following</span>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Stories</h2>
        {userData.story.length === 0 ? (
          <p className="text-gray-500">No stories posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userData.story.map((story) => (
              <div
                key={story.id}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <h3 className="font-semibold text-md mb-2">{story.title}</h3>
                {story.image && (
                  <Image
                    src={story.image}
                    alt="Story thumbnail"
                    width={300}
                    height={200}
                    className="rounded-md mb-2 object-cover w-full h-48"
                  />
                )}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {story.content}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Posted on: {new Date(story.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
