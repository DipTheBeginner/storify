import Image from "next/image"
import { StoryType } from "src/types/types"


interface SingleStoryComponentProps {
    story: StoryType,

}



export default function ({ story }: SingleStoryComponentProps) {
    return (
        <div className="w-[40%] bg-amber-600 mx-auto p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-extrabold mb-2">{story.title}</h1>
                <p className="mb-4">{story.content}</p>

                <div className="flex flex-row items-center gap-3 mt-6">
                    <Image
                        src={story.author.image!}
                        alt={`${story.author.name}'s profile`}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="font-semibold">{story.author.name}</span>
                </div>
            </div>
        </div>
    )
}