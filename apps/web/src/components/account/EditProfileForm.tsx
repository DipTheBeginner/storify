"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditProfileForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hook with backend API to update user profile
    console.log("Submitting profile update:", { name, bio });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Edit Profile (Coming Soon)</h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
          placeholder="Enter your name"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border px-3 py-2 rounded"
          placeholder="Write something about yourself"
        />
      </div>

      <Button type="submit" disabled>
        Save (Disabled)
      </Button>
    </form>
  );
}
