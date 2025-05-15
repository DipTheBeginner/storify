
interface UtilityCardProps {
    className?: string,
    children: React.ReactNode
}

export default function UtilityCard({ className, children }: UtilityCardProps) {


    return (
        <div className={` flex items-center justify-center h-screen w-screen fixed inset-0 bg-opacity-10`}>
            <div className= {`${className} dark:bg-neutral-950 bg-neutral-300 dark:text-neutral-200 text-neutral-900 rounded-[16px]`}>
                {children}

            </div>
        </div>
    )

}