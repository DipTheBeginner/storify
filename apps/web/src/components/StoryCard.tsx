import Image from "next/image"
import { Session } from "next-auth";
import { StoryType } from "src/types/types";

import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAllStoryStore } from "src/zustand/stories/allStories";

interface StoryCardProps {
    story: StoryType
    session: Session | null;
}

function toPascalCase(name: string) {
    return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function ({ story, session }: StoryCardProps) {

    const { allStories, setAllStories, updateStoryLikes } = useAllStoryStore();

    console.log("Full story object:", story);
    console.log("Story ID before conversion:", story.id, typeof story.id);

    const [hasLiked, setHasLiked] = useState<Boolean>(story.likes && story.likes.some(like => like.userId === Number(session?.user.id)))

    const router = useRouter()

    const { data: sessionData, status } = useSession()
    const token = sessionData?.user.token;

    function openAccountHandler(e:MouseEvent<HTMLDivElement>){
        e.stopPropagation();
        console.log("small div also clicked");
        router.push(`/@${story.author.email.split("@")[0]}`)
    }

    async function likeStory(userId: number, storyId: string) {
        console.log("Sending like request with:", { userId, storyId, token });

        try {
            const response = await axios.post(`http://localhost:8080/api/toggle-like`,
                { userId, storyId },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            console.log("Response from like is", response)
            if (response.data.data === "LIKED") {
                setHasLiked(true);
                updateStoryLikes(story.id, true);
            }
            else if (response.data.data === "DISLIKED") {
                setHasLiked(false);
                updateStoryLikes(story.id, false);

            }
        } catch (error) {
            console.log("Error in liking story", error)
        }
    }

    return (
        <div className="flex flex-col py-8 space-y-6 items-center justify-center">
            <div className="flex flex-row w-[40%] items-center justify-between rounded-lg cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                router.push(`/author/${story.author.id}/${story.id}`);
            }}>
                {/* content */}
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-1 flex-row space-x-2 w-fit" onClick={openAccountHandler}>
                        <Image className="rounded-full" src={story.author.image!} alt="user profile" height={20} width={20} />
                        <span className="text-xs font-semibold">{toPascalCase(story.author.name)}</span>
                    </div>
                    <h1 className="font-extrabold">
                        {story.title}
                    </h1>
                    <p className="line-clamp-2 text-sm font-semibold text-gray-500">
                        {story.content}
                    </p>
                    <div className="flex flex-row space-x-2">
                        <time className="text-xs text-gray-400">
                            {new Date(story.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>

                        

                        
                    </div>
                </div>
                {/* Image */}
                <Image src="/images/node.png" alt="post-image" width={100} height={300} />
            </div>
        </div>
    )
}