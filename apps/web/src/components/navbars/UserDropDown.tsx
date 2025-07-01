"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

interface Props {
  image: string;
  email: string;
}

export default function UserDropdown({ image, email }: Props) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src={image}
        alt="User"
        width={40}
        height={40}
        className="rounded-full cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      />
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <button
            className="w-full text-left px-4 py-2 hover:bg-neutral-100"
            onClick={() => {
              router.push(`/account/${encodeURIComponent(email)}`);
              setShowDropdown(false);
            }}
          >
            👤 Account
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-neutral-100 text-red-600"
            onClick={() => signOut()}
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
