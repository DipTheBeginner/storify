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
        <div className="flex flex-row">
            {/* content */}

            <div>
                <div className="flex flex-row">
                    <Image className="rounded-full" src={session?.user.image!} alt="user profile" height={20} width={20} />
                    <span>{session?.user.name}</span>
                </div>
                <h1 className="font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, autem?
                </h1>


            </div>


            {/* Image */}


        </div>
    )
}