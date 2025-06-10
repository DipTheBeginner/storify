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
    like: {
        userId: Number;
    }[];
    _count?: {
        likes: Number
    }
}

export default function () {
    const { data: session, status } = useSession()
    const { allStories, setAllStories } = useAllStoryStore();
    const [loading, setLoading] = useState(true);
    const token = session?.user.token

    async function fetchStories() {
        try {
            const response = await axios.get("http://localhost:8080/api/get-story", {
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
            <div className="p-4">
                {allStories.map((story, index) => (
                    <div key={story.id}>
                        <StoryCard story={story} session={session} />
                        {index < allStories.length - 1 && (
                            <div className="flex justify-center">
                                <div className="w-[40%] h-px bg-gray-300"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}