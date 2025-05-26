"use client"

import axios from "axios"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HomeNavBar from "src/components/navbars/HomeNavBar"
import StoryCard from "src/components/StoryCard";
import { useAllStoryStore } from "src/zustand/stories/allStories";


interface Story {
    id: string,
    title: string,
    content: string,
    imageUrl?: string,
    createdAt: string,
    author: {
        name: string,
        email: string
    };
    tag: { tagName: string }[];

}


export default function () {

    const { data: session, status } = useSession()

    console.log("Here session is ", session)

    const{allStories,setAllStories}=useAllStoryStore();

  
    const [loading, setLoading] = useState(true);
    const token = session?.user.token

    async function fetchStories() {
        try {
            const response = await axios.get("http://localhost:8080/api/getStory", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setAllStories(response.data.data)
            console.log("Stories is ", response.data);

        }

        catch (error: any) {
            console.log("Error fetching stories:", error?.response?.data || error.message || error);

        }

    }

    useEffect(() => {

        if (session?.user.token) {
            fetchStories()
        }
    }, [session, token])




    return (
        <>

            <HomeNavBar />

            <StoryCard></StoryCard>

            <div className="p-4">
                {allStories.map((story) => (
                    <div>
                        <h2>{story.title}</h2>
                        <p>{story.content}</p>
                    </div>
                ))}
            </div>



        </>
    )
}