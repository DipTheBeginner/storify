"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, use, useState } from "react";

interface StoryPageProps {
    params: {
        authorId: string,
        storyId: string
    }
}

export default function StoryPage({ params }: StoryPageProps) {
    // Unwrap the params Promise using React.use()
    const { authorId, storyId } = (params);
    const [fullStory, setFullStory] = useState<any>(null);

    console.log("StoryPage params:", { authorId, storyId });
    console.log("Author ID:", authorId, "Story ID:", storyId);

    const { data: session, status } = useSession();
    const token = session?.user.token;

    async function fetchFullStory() {
        try {
            console.log("calling");
            const response = await axios.get(`http://localhost:8080/api/full-story/${authorId}/${storyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Data in full", response);
            setFullStory(response.data.data.fullStories)
        } catch (error) {
            console.error("Error fetching story:", error);
        }
    }

    useEffect(() => {
        if (session?.user.token) {
            fetchFullStory()
        }
    }, [session, token, authorId, storyId])
    return (
        <div className="p-4 bg-amber-700 min-h-screen">
            {fullStory ? (
                <div className="flex flex-col items-center">

                    <h1 className="text-3xl font-extrabold">{fullStory.title}</h1>

                    <h1>{fullStory.content}</h1>


                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
