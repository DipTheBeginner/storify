"use client";

import { useSession } from "next-auth/react";
import CreateStoryComponent from "src/components/story/CreateStoryComponent";

export default function CreateStoryPage() {
  const { data: session } = useSession();

  const token = session?.user?.token;

  return (
    <div className="p-4">
      <CreateStoryComponent token={token} />
    </div>
  );
}
