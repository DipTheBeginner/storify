import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { StoryType } from "src/types/types";

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
            {/* Top section: Title and Author Info */}
            <div className="flex flex-col items-start gap-6">
                <h1 className="text-3xl font-extrabold text-neutral-800">{story.title}</h1>

                <div className="flex items-center gap-3">
                    <div className="" onClick={openAccountHandler}>

                        <Image
                            src={story.author.image!}
                            alt={`${story.author.name}'s profile`}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="font-semibold text-sm text-neutral-800">
                            {toPascalCase(story.author.name)}
                        </span>
                    </div>
                    <span className="text-sm text-gray-400">
                        {new Date(story.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>

            {/* like and comment section */}

            <div className=" flex flex-col gap-10">


                <div className="">
                    storylikes

                </div>

                {/* Middle Section: Post Image */}
                <div className="flex justify-center  rounded-lg overflow-hidden gap-">
                    <Image
                        src="/images/tech.jpeg"
                        width={500}
                        height={500}
                        alt="post image"
                        className="object-cover"
                    />
                </div>

                <div>

                </div>
            </div>

            <div>
                {story.content}

            </div>




        </div>
    );
}
