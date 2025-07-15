"use client";

import { useSession } from "next-auth/react";
import CreateStoryNavBar from "src/components/navbars/CreateStoryNavBar";
import CreateStoryComponent from "src/components/story/CreateStoryComponent";

export default function CreateStoryPage() {
  const { data: session } = useSession();
  
  const token = session?.user?.token;
  
  return (
    <div className="h-screen w-full">
      <CreateStoryNavBar />
      <div className="w-full flex justify-center">
        <div className="translate-x-24">
          <CreateStoryComponent token={token} />
        </div>
      </div>
    </div>
  );
}