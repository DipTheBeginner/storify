import Link from "next/link"

interface NavBarComponentsProps {
    href:string
    children: React.ReactNode
}

export default function NavBarComponents({ href,children }: NavBarComponentsProps) {
    return (
        <Link href={href} className="text-gray-500 hover:text-black transition-all duration-300 ease-in-out font-bold">
        {children}
        </Link>
    )
}