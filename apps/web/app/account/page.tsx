"use client"

import FollowStats from "components/FollowStats";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-start justify-between w-full px-4">
        <div>
          {session.user?.image && (
            <Image
              src={session.user.image}
              width={60}
              height={60}
              alt="User Profile"
              className="rounded-full"
            />
          )}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          <FollowStats count={400}>Followers</FollowStats>
          <FollowStats count={200}>Following</FollowStats>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl font-semibold">{session.user?.name}</p>
        <p className="text-sm text-gray-400">{session.user?.email}</p>
      </div>
    </div>
  );
}
