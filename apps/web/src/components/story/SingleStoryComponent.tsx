import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { StoryType } from "src/types/types";
import {format} from 'date-fns';

interface SingleStoryComponentProps {
    story: StoryType;
}

function toPascalCase(name: string) {
    return name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function SingleStoryComponent({ story }: SingleStoryComponentProps) {

    const router=useRouter();
     function openAccountHandler(e:MouseEvent<HTMLDivElement>){
            e.stopPropagation();
            console.log("small div also clicked");
            router.push(`/@${story.author.email.split("@")[0]}`)
        }
    return (
        <div className="w-[40%] mx-auto p-6 flex flex-col gap-4  ">
            <div className="text-2xl font-bold mt-2">
                {story.title}
            </div>
            <div className="flex flex-row gap-3 mt-6 items-center">
                <Image src={story.author.image!} height={40} width={40} alt="user" className="rounded-full"/>
                <span className="font-medium text-sm">{story.author.name}</span>
                <span className="text-neutral-600 text-sm">{format(story.createdAt,'MMMM d, yyyy')}</span>
            </div>
             <hr className="border-neutral-500/40 border mt-4"/>
             <div>
                <span>{story.likes}</span>
             </div>
        
        </div>
    );
}
