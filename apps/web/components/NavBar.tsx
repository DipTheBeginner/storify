"use client"

import Link from "next/link";
import Button from "./Button";
import NavBarComponents from "./NavBarComponents";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UtilityCard from "./UtilityCard";



export default function NavBar() {

    const { data: session, status } = useSession();

    const router = useRouter();

    function handleAccountButtonClick() {
        router.push("/account")
    }

    function signOutUser() {
        signOut({
            redirect: true,
            callbackUrl: "/"
        });
    }

    async function openLoginModalHandler() {
        setIsLoginModalOpen(true)
    }

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);







    return (
        <div className="flex justify-between items-center p-4 pr-20 bg-black">

            <Link href="/">
                <div className="text-3xl font-extrabold text-purple-700 hover:text-purple-900 
            transitions-colors duration-300 cursor-pointer hover:translate-x-2">Storify</div>

            </Link>

            <div className="flex space-x-8 items-center">

                <NavBarComponents href="/">Home</NavBarComponents>


                <div className="flex flex-col items-end space-y-2">

                    {

                        session ? (
                            <Button clickableFunction={handleAccountButtonClick}>Account</Button>
                        ) : (<Button clickableFunction={openLoginModalHandler}>Sign in</Button>)

                    }

                </div>

                {
                    isLoginModalOpen && (<UtilityCard className=" flex flex-col relative w-3/12 py-4 px-4 gap-y-4">
                        <div className="font-bold">
                            Sign in to Storify ?
                        </div>

                        <p className="text-xs">
                            To access all the exciting features of Banter and stay updated with the latest conversations. Log in now to connect with others and explore what's new!
                        </p>
                    </UtilityCard>)
                }




                <Button clickableFunction={signOutUser}>Sign out</Button>

            </div>

        </div>
    )
}



