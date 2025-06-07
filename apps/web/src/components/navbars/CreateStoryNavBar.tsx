"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function StorySubmitNavbar({ onPublish }: { onPublish: () => void }) {
  const { data: session } = useSession();

  return (
    <div className="bg-neutral-100 w-full h-16 flex flex-row items-center justify-between px-8 py-2 border-b border-neutral-200">
      
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-[#fc4f4c] hover:translate-x-1 transition-all cursor-pointer">
          Storify
        </div>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="User"
            width={35}
            height={35}
            className="rounded-full"
          />
        )}
      </div>

      <div>
        <Button
          onClick={onPublish}
          className="bg-[#fc4f4c] text-white hover:bg-[#e64845] transition"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
