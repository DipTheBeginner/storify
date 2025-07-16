import { IoIosHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";



interface LikeButtonProps {
    storyId: string,
    userId: string,
    token: string,
    initialLiked: boolean,
    likeCount: number,
    onLikeToggle?: (liked: boolean) => void;

}


export default function LikeButton({
    storyId,
    userId,
    token,
    initialLiked,
    likeCount,
    onLikeToggle,
}: LikeButtonProps) {
    const [hasLiked, setHasLiked] = useState(initialLiked);
    const [likes, setLikes] = useState(likeCount);


    async function likeStory() {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/toggle-like`,
                { userId, storyId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.data === "LIKED") {
                setHasLiked(true);
                setLikes((prev) => prev + 1);
                onLikeToggle?.(true);
            } else if (response.data.data === "DISLIKED") {
                setHasLiked(false);
                setLikes((prev) => Math.max(prev - 1, 0));
                onLikeToggle?.(false);
            }
        } catch (error) {
            console.log("Error in liking story", error);
        }
    }


    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                if (!userId || !storyId) return;
                likeStory();
            }}
            className="cursor-pointer hover:opacity-80 transition"
        >
            <div className="flex flex-row items-center gap-1">
                {hasLiked ? (
                    <FcLike className="w-4 h-4" />
                ) : (
                    <IoIosHeartEmpty className="w-4 h-4" />
                )}
                <span className="text-xs font-extralight leading-none">{likes}</span>
            </div>
        </div>
    );
}