

interface TagButtonComponentsProps{
    children:React.ReactNode,
}

export default function({children}:TagButtonComponentsProps){
    

    return(

        <div>
            <button className="rounded-full bg-neutral-50 text-xs text-neutral-800 px-2 py-1">{children}</button>
        </div>
    )
}