"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HomeNavBar from "src/components/navbars/HomeNavBar";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface UserData {
  name: string;
  profilePhoto: string;
  followers: number;
  following: number;
  posts: Post[];
}

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  const account = typeof params?.account === "string"
    ? params.account
    : Array.isArray(params?.account)
    ? params.account[0]
    : undefined;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account || !session?.user.token) return;

    const decodedEmail = decodeURIComponent(account.slice(1));

    async function fetchUserAccount() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/account-data/${decodedEmail}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        setUserData(res.data);
      } catch (err) {
        console.error("❌ Error fetching account data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAccount();
  }, [account, session]);

  if (loading) return <div className="text-center mt-10">Loading account...</div>;
  if (!userData) return <div className="text-center mt-10 text-red-500">User not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeNavBar />
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={userData.profilePhoto}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-sm text-gray-500">
              {userData.followers} followers • {userData.following} following
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          {userData.posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            <ul className="space-y-4">
              {userData.posts.map((post) => (
                <li key={post.id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
