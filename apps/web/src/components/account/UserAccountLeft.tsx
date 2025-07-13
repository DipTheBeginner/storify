import Image from "next/image"
import { UserType } from "src/types/types"



interface UserAccountLeftProps {
    userData: UserType | undefined

}


export default function UserAccountLeft({ userData }: UserAccountLeftProps) {

    return (
        <div className="col-span-4 px-9 py-7">
            <div className="flex flex-col gap-y-4">

                <div className="relative w-full h-64 aspect-square">
                    <Image
                        src={userData?.image!}
                        alt="user-profile"
                        fill
                        className="object-cover"
                    />
                </div>
                <hr className="border-neutral-500/50 border" />


                <section className="flex flex-col gap-y-3 ">
                    <div >
                        <span className="font-semibold text-2xl tracking-wide text-neutral-800 ">{userData?.name}</span>
                    </div>
                    
                    <div className="flex flex-col gap-y-0.5">
                        <span className="text-md font-semibold text-neutral-700/80">Bio  </span>
                        <span className="text-md font-light tracking-wide">Keep coding</span>
                    </div>
                    <div className="w-full grid-cols-2 gap-x-4 grid mt-3">
                        <span className="px-3 py-1.5 rounded-xl text-center bg-neutral-100 border-[1px] border-neutral-200 col-span-1">2M Followers</span>
                        <span className="px-3 py-1.5 rounded-xl bg-neutral-100 text-center border-[1px] border-neutral-200 col-span-1">250 Following</span>
                    </div>
                    
                </section>
            </div>
        </div>
    )

}