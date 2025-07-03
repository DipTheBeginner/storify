import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";




interface UserDropdownProps {
    email: string,
    image: string,
}


export default function UserDropdown({ email, image }: UserDropdownProps) {

    const [dropDown, setDropDown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const imageRef=useRef<HTMLDivElement>(null);

    const router=useRouter();


    function changeDropDownState() {

        setDropDown(prev => !prev)

    }

    function handleClickOutside(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node) && imageRef.current && !imageRef.current.contains(e.target as Node)) {
            setDropDown(false);
        }
    }

    function accountPage(){
        router.push(`/@${email.split("@")[0]}`)
    }

    useEffect(() => {
        if (dropDown) {
            document.addEventListener("mousedown", handleClickOutside)

        }
        else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)

        }

    }, [dropDown])

    return (
        <div className="relative">
            <Image ref={imageRef} src={image} height={40} width={40} alt="user-profile" className="rounded-full" onClick={changeDropDownState} />

            {
                dropDown && (<div ref={ref} className="absolute right-0 text-sm font-medium flex w-[8rem] flex-col bg-neutral-200 px-5 rounded-sm ">
                    <span className="py-1.5" onClick={accountPage}>
                        Account
                    </span>
                    <span className="py-1.5">
                        Sign out
                    </span>
                </div>)

            }

        </div>
    )
}