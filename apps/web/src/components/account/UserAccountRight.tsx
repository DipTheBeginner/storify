import { UserType } from "src/types/types"
import StoryCard from "../StoryCard"
import { useSession } from "next-auth/react"



interface UserAccountRightProps {
    userData: UserType | undefined

}


export default function UserAccountRight({userData}:UserAccountRightProps){
    const {data:session}=useSession()


    return(
        <div className="col-span-8">
            <div className="w-full">
                {
                    userData?.story.length! > 0 && userData?.story.map((story)=>(
                        <StoryCard story={story} session={session} key={story.id}/>

                    ))
                }

            </div>
        </div>
    )
}