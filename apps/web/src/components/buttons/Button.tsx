"use client"

interface ButtonProps {
    children: React.ReactNode;
    clickableFunction:()=>void;

}

export default function Button({ children,clickableFunction }: ButtonProps) {
    return (
        <>
            
            <button className="bg-transparent text-[#6A0DAD] border-2 border-[#6A0DAD] px-3 py-1
             rounded-md transition-all duration-300 ease-in-out hover:bg-[#6A0DAD]
              hover:text-white hover:border-transparent font-bold cursor-pointer"
               onClick={clickableFunction}>{children}</button>
        </>

    )   
}