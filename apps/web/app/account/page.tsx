"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import FollowStats from "src/components/FollowStats";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (

    <div className="flex flex-col bg-neutral-400 p-4 items-center">
      <div className="flex items-center gap-6 justify-between">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-yellow-300 object-cover"
          />
        )}

        <span className="text-2xl font-bold text-neutral-900">
          {session.user.name}
        </span>
      </div>
    </div>
  );
}
