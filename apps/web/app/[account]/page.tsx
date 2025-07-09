"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import HomeNavBar from "src/components/navbars/HomeNavBar";

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();

  // ✅ Fix: Safely extract account from params
  const account = typeof params?.account === "string" ? params.account : Array.isArray(params?.account) ? params.account[0] : "";
  const decodedEmail = decodeURIComponent(account);

  async function fetchUserAccount() {
    try {
      const response = await axios.get(`http://localhost:8080/api/account-data/${decodedEmail.slice(1)}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      console.log("✅ response in account page", response.data);
    } catch (error) {
      console.error("❌ Error fetching user account:", error);
    }
  }

  useEffect(() => {
    if (session?.user.token) {
      fetchUserAccount();
    }
  }, [session]);

  return (
    <div>
      <HomeNavBar />
    </div>
  );
}
