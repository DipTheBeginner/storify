import axios from "axios";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import { useState } from "react";






export default function CreateStoryPage(){
    const{data:session,status}=useSession()

    const token=session?.user.token;


    const[createStory,setCreateStory]=useState("");

    async function sendStory(){
        const response=axios.post(`http:localhost:8080//api/create-story`,{
            headers:{
                Authorization:`Bearer ${token}`
            }

        })
    }


    return(
        <div>
            
        </div>
    )
}