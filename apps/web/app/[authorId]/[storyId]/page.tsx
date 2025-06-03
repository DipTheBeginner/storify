"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, use, useState } from "react";
import NavBar from "src/components/NavBar";
import HomeNavBar from "src/components/navbars/HomeNavBar";
import SingleStoryComponent from "src/components/story/SingleStoryComponent";
import { StoryType } from "src/types/types";

interface StoryPageProps {
    params: Promise<{
        authorId: string,
        storyId: string
    }>
}

export default function StoryPage({ params }: StoryPageProps) {
    // Unwrap the params Promise using React.use()
    const { authorId, storyId } = use(params);
    const [fullStory, setFullStory] = useState<StoryType>();


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
            setFullStory(response.data.data)
        } catch (error) {
            console.error("Error fetching story:", error);
        }
    }

    console.log("full story response",fullStory);

    useEffect(() => {
        if (session?.user.token) {
            fetchFullStory()
        }
    }, [session, token, authorId, storyId])

    return (
        <div className="min-h-screen">
            <HomeNavBar />
            {fullStory ? (
                <SingleStoryComponent story={fullStory} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}