

interface FollowStatsProps{
    
    onClick:()=>void,
    children:React.ReactNode,
    count:number
    className:string


    
}

export default function({onClick,children,count,className}:FollowStatsProps){


    return(
        <div>
            <button onClick={onClick} className="flex flex-col text-neutral-800 items-center px-5 py-2 bg-blue-600 hover:bg-gray-200 rounded-lg showdow-sm transition cursor-pointer">{children}</button>
            <span className="text-lg font-semibold text-white">{count}</span>
        </div>
    )
}