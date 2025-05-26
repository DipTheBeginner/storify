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
          createdAt: string,
          author: {
            name: string,
            email: string
          },
          tag: { tagName: string }[]
        };
        session: Session | null;
      }




export default function () {



    return (
        <div className="flex bg-[#19233b] w-90 rounded-md p-4  flex-col gap-y-2">
            <Image src="/images/tech.jpeg" width={500} height={500} alt="image" />
            <TagButtonComponents>Technology</TagButtonComponents>
            <div className="text-md font-bold text-neutral-100 border-b border-gray-300 py-3">Title</div>
            <div className="text-neutral-100 text-sm font-semibold">Content</div>
            <div className="flex justify-end">
                <button className=" flex rounded-full bg-yellow-400 font-semibold items-center px-3 py-1.5 ">
                    <span className="text-xs">
                        Read Full Article
                    </span>
                    <ChevronRight size={18} />
                </button>
            </div>

            <div></div>
            <div>img</div>
            <div>date</div>
        </div>
    )
}