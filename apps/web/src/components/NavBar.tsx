"use client"

import Link from "next/link";
import Button from "./buttons/Button";
import NavBarComponents from "./NavBarComponents";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UtilityCard from "./UtilityCard";
import GoogleSigninButton from "./buttons/GoogleSigninButton";



export default function NavBar() {

    const { data: session, status } = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     if (session) {
    //         router.push("/home")
    //     }

    // }, [session])


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


    async function googleSignin() {
        signIn("google", {
            redirect: true,
            callbackUrl: "/"
        })

    }





    return (
        <div className="flex justify-between items-center p-4 pr-20 bg-black">

            <Link href="/">
                <div className="text-3xl font-extrabold text-purple-700 hover:text-purple-900 
            transitions-colors duration-300 cursor-pointer hover:translate-x-2">Storify</div>

            </Link>

            <div className="flex space-x-8 items-center">

                <NavBarComponents href="/home">Home</NavBarComponents>


                <div className="flex flex-col items-end space-y-2">

                    {

                        session ? (
                            <Button clickableFunction={handleAccountButtonClick}>Account</Button>
                        ) : (<Button clickableFunction={openLoginModalHandler}>Sign in</Button>)

                    }

                </div>

                {
                    isLoginModalOpen && (<UtilityCard className="flex flex-col relative w-3/12 py-4 px-4 gap-y-4 shadow-md rounded-lg bg-white">
                        <div className="font-bold">
                            Sign in to Storify ?
                        </div>

                        <p className="text-xs">
                            To access all the exciting features of Banter and stay updated with the latest conversations. Log in now to connect with others and explore what's new!
                        </p>
                        <button
                            onClick={() => setIsLoginModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 font-bold text-lg"
                        >
                            ×
                        </button>
                        <GoogleSigninButton onClick={googleSignin}>Sign In using Google</GoogleSigninButton>
                    </UtilityCard>)
                }

                {
                    session && (<Button clickableFunction={signOutUser}>Sign out</Button>)
                }





            </div>

        </div>
    )
}



