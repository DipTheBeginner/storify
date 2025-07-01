"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import { StoryType } from "src/types/types";

interface Props {
  email: string;
}

export default function AccountPageClient({ email }: Props) {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<{ name: string; image: string } | null>(null);
  const [myStory, setMyStory] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    console.log("Email:", email);
    
    if (status === "authenticated" && session?.user?.token && email) {
      fetchPosts();
    } else if (status === "unauthenticated") {
      setError("Please sign in to view this page");
      setLoading(false);
    }
  }, [session, status, email]);

  // Set profile data from session
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "Unknown User",
        image: session.user.image || "/default-avatar.png"
      });
    }
  }, [session]);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      
      console.log("=== DEBUGGING FETCH POSTS ===");
      console.log("1. Email:", email);
      console.log("2. Session:", session);
      console.log("3. User token exists:", !!session?.user?.token);
      console.log("4. Token value:", session?.user?.token?.substring(0, 20) + "...");
      
      const url = `http://localhost:8080/api/get-user-story/${encodeURIComponent(email)}`;
      console.log("5. Request URL:", url);
      
      const headers = {
        Authorization: `Bearer ${session?.user.token}`,
        'Content-Type': 'application/json'
      };
      console.log("6. Request headers:", headers);
      
      const response = await axios.get(url, { headers });
      
      console.log("7. API Response status:", response.status);
      console.log("8. API Response data:", response.data);
      console.log("9. Stories array:", response.data.data);
      
      setMyStory(response.data.data || []);
    } catch (error: any) {
      console.error("=== ERROR DETAILS ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error response status:", error.response?.status);
      console.error("Error response data:", error.response?.data);
      console.error("Error response headers:", error.response?.headers);
      
      if (error.code === 'ECONNREFUSED') {
        setError("Cannot connect to server. Make sure your backend is running on port 8080.");
      } else if (error.response?.status === 401) {
        setError("Authentication failed. Please sign in again.");
      } else if (error.response?.status === 404) {
        setError("API endpoint not found. Check your backend routes.");
      } else {
        setError(error.response?.data?.error || error.message || "Failed to fetch stories");
      }
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div>
        <HomeNavBar />
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <HomeNavBar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomeNavBar />
      <div className="bg-neutral-200 min-h-screen py-8 px-12">
        {/* Profile */}
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
          <div>
            <span className="text-xl font-semibold text-gray-800">
              {profileData?.name || "Loading..."}
            </span>
            <p className="text-gray-600 text-sm">{email}</p>
          </div>
        </div>

        {/* Stories */}
        <div className="mt-10 ml-40">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">My Stories</h2>
            <button 
              onClick={fetchPosts}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry Fetch
            </button>
          </div>
          
          {/* Debug Info */}
          <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
            <strong>Debug Info:</strong><br />
            Email: {email}<br />
            Session Status: {status}<br />
            Has Token: {session?.user?.token ? 'Yes' : 'No'}<br />
            Stories Count: {myStory.length}<br />
            Current Error: {error || 'None'}
          </div>
          
          {myStory.length > 0 ? (
            <div className="space-y-4">
              {myStory.map((story) => (
                <div key={story.id} className="bg-white shadow p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-700 mb-2">{story.content}</p>
                  {story.tag && Array.isArray(story.tag) && story.tag.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {story.tag.map((tag, index) => (
                        <span 
                          key={tag.id || index} 
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tag.tagName}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">
                    By {story.author?.name || "Unknown"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center text-gray-500">
              <p>No stories found.</p>
              <p className="text-sm mt-2">You haven't created any stories yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}