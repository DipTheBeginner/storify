import Image from "next/image"
import TagButtonComponents from "./buttons/TagButtonComponents"
import { ChevronRight, MoveRightIcon, ThumbsUp } from "lucide-react"
import { Session } from "next-auth";
import LikeButton from "./buttons/LikeButton";
import { StoryType } from "src/types/types";
import { IoIosHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";



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

    const hasUserLiked = story.likes && story.likes.some(like => like.userId === Number(session?.user.id))

    return (

        <div className="flex flex-row w-[40%] items-center">
            {/* content */}

            <div className="flex flex-col space-y-2">
                <div className="flex flex-row space-x-2">
                    <Image className="rounded-full" src={session?.user.image!} alt="user profile" height={20} width={20} />
                    <span className="text-xs">{toPascalCase(session?.user.name!)}</span>
                </div>
                <h1 className="font-extrabold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, autem?
                </h1>
                <p className="line-clamp-2 text-sm font-semibold text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatum molestiae expedita obcaecati aspernatur error fugit magnam repellat? Laboriosam, dicta.
                </p>
                <div className="flex flex-row space-x-2">
                    <time className="text-xs text-gray-400">
                        {new Date(story.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>

                    <div className="bg-green-600" onClick={ }>
                        {
                            hasUserLiked ? (
                                <FcLike />
                            ) : (
                                <IoIosHeartEmpty />
                            )
                        }
                    </div>



                </div>
            </div>
            {/* Image */}
            <Image src="/images/tech.jpeg" alt="post-image" width={100} height={100} />
        </div>
    )
}