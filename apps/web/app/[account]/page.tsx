"use client";

import axios from "axios";
import { User2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserAccountLeft from "src/components/account/UserAccountLeft";
import UserAccountRight from "src/components/account/UserAccountRight";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import { UserType } from "src/types/types";

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  const account = (params?.account as string) || "";
  const decodedEmail = decodeURIComponent(account);
  const [userData, setUserData] = useState<UserType>();

  async function fetchUserAccount() {

    try {
      const response = await axios.get(
        `http://localhost:8080/api/account-data/${decodedEmail.slice(1)}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },

        }
      );
      setUserData(response.data.data);
    } catch (err) {
      console.error("Failed to fetch account data", err);
    }

  }

  useEffect(() => {
    console.log("session in useeffect", session)
    if (session?.user.token) {
      fetchUserAccount();
    }
  }, [session]);



  return (
    <div className="h-screen w-full">
      <HomeNavBar />
      <div className="h-full w-full">

        <div className="flex flex-row h-full max-w-7xl mx-auto">

          <div className="grid grid-cols-12 w-full">

            <UserAccountLeft userData={userData}/>
            <UserAccountRight userData={userData} />

          </div>

        </div>

      </div>
    </div>
  );
}
