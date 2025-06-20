"use client";

import { useUserStoryStore } from "src/zustand/stories/userStories";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserStoryList() {
  const { userStories, setUserStories } = useUserStoryStore();
  const { data: session } = useSession();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(storyId: string) {
    if (!session?.user?.id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this story?");
    if (!confirmDelete) return;

    setDeletingId(storyId);
    try {
      await axios.delete(`http://localhost:8080/api/story/${session.user.id}/${storyId}`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      setUserStories(userStories.filter((story) => story.id !== storyId));
    } catch (error) {
      console.error("Failed to delete story", error);
      alert("Failed to delete story.");
    } finally {
      setDeletingId(null);
    }
  }

  if (userStories.length === 0) {
    return <p className="text-gray-600 ml-40">You haven’t posted any stories yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4 ml-40 mt-10">
      {userStories.map((story) => (
        <div
          key={story.id}
          className="flex justify-between items-center p-4 border bg-white rounded shadow-md w-[80%]"
        >
          <div>
            <h2 className="text-lg font-semibold">{story.title}</h2>
            <p className="text-sm text-gray-600">{story.content.slice(0, 100)}...</p>
          </div>
          <button
            onClick={() => handleDelete(story.id)}
            disabled={deletingId === story.id}
            className="text-sm px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {deletingId === story.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
    </div>
  );
}
