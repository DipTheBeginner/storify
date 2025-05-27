import Image from "next/image"
import TagButtonComponents from "./buttons/TagButtonComponents"
import { ChevronRight, MoveRightIcon } from "lucide-react"
import { Session } from "next-auth";



interface StoryCardProps {
    story: {
        id: string,
        title: string,
        content: string,
        imageUrl?: string,
        createdAt: Date,
        author: {
            name: string,
            email: string
        },
        tag: { tagName: string }[]
    };
    session: Session | null;
}




export default function ({ story, session }: StoryCardProps) {



    return (
        <div className="flex bg-[#19233b] w-90 rounded-md p-4  flex-col gap-y-2">
            <Image src="/images/tech.jpeg" width={500} height={500} alt="image" />
            <TagButtonComponents>{story.tag?.[0]?.tagName}</TagButtonComponents>
            <div className="text-md font-bold text-neutral-100 border-b border-gray-300 py-3">{story.title}</div>
            <div className="text-neutral-100 text-sm font-semibold">{story.content}</div>
            <div className="flex justify-end">
                <button className=" flex rounded-full bg-yellow-400 font-semibold items-center px-3 py-1.5 cursor-pointer">
                    <span className="text-xs">
                        Read Full Article
                    </span>
                    <ChevronRight size={18} />
                </button>
            </div>

            {session?.user?.image && (
                <div>
                    <Image src={session.user.image} alt="User profile" width={40} height={40} className="rounded-full border border-yellow-300" />
                </div>
            )}

            <div className="text-neutral-100 text-xs font-bold">
                {new Date(story.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
        </div>
    )
}