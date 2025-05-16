import Image from "next/image"


interface GoogleSigninButtonProps{
    onClick:()=>void,
    children:React.ReactNode
}

export default function({onClick,children}:GoogleSigninButtonProps){
    return <div>
        <button onClick={onClick} className="bg-black w-full hover:bg-gray-800 text-white">
        <div className="flex flex-row items-center justify-center gap-x-4">

        <Image src="/images/google.png" width={20} height={20} alt="google-logo" />  <span>{children}</span>
                </div>

        </button>
    </div>
}



