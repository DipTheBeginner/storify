"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { use, useEffect } from "react";
import HomeNavBar from "src/components/navbars/HomeNavBar";

// app/[account]/page.tsx
interface PageProps {
  params: {
    account: string;
  };
}


export default function Page({ params }: PageProps) {

    const {data:session}=useSession()
    
const { account } = params;
    const decodedEmail = decodeURIComponent(account);

      async function fetchUserAccount(){
        const response=await axios.get(`http://localhost:8080/api/account-data/${decodedEmail.slice(1)}`,{
            headers:{
                Authorization:`Bearer ${session?.user.token}`
            },
            
        })
        console.log("response in account page",response);
      }

      useEffect(()=>{

        if(session?.user.token){
            fetchUserAccount()
        }

      },[session])

     


    return <div><HomeNavBar/></div>;
}
