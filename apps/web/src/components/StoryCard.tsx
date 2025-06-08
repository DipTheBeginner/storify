import Image from "next/image"
import { Session } from "next-auth";
import { StoryType } from "src/types/types";
import { IoIosHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    console.log("Full story object:", story);
    console.log("Story ID before conversion:", story.id, typeof story.id);

    const [hasLiked, setHasLiked] = useState<Boolean>(story.likes && story.likes.some(like => like.userId === Number(session?.user.id)))

    const router = useRouter()

    const { data: sessionData, status } = useSession()
    const token = sessionData?.user.token;
    console.log("Token in story", token)

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
                setHasLiked(true)
            }
            else if (response.data.data === "DISLIKED") {
                setHasLiked(false)
            }
        } catch (error) {
            console.log("Error in liking story", error)
        }
    }

    return (
        <div className="flex flex-col py-8 space-y-6 items-center justify-center">
            <div className="flex flex-row w-[40%] items-center justify-between rounded-lg cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                router.push(`/${story.author.id}/${story.id}`);}}>
                {/* content */}
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-1 flex-row space-x-2">
                        <Image className="rounded-full" src={session?.user.image!} alt="user profile" height={20} width={20} />
                        <span className="text-xs">{toPascalCase(session?.user.name!)}</span>
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

                        <div onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            
                            const userId = Number(session?.user.id);
                            const storyId = story?.id;

                            console.log("Like clicked", { userId, storyId });

                            if (!userId || !storyId) {
                                console.warn("Invalid userId or storyId:", { userId, storyId });
                                return;
                            }

                            likeStory(userId, storyId);
                        }}
                        className="cursor-pointer"
                        >
                            {
                                hasLiked ? (
                                    <FcLike />
                                ) : (
                                    <IoIosHeartEmpty />
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* Image */}
                <Image src="/images/node.png" alt="post-image" width={100} height={300} />
            </div>
        </div>
    )
}