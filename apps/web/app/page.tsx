"use client"


import { signIn } from "next-auth/react";
import Button from "src/components/buttons/Button";
import NavBar from "src/components/NavBar";



export default function HomePage() {

  async function handleSignin() {
    signIn("google", {
      redirect: false,
      callbackUrl: "/"
    })

  }

  return (
    <div>
      <NavBar/>
      <main className=" min-h-screen bg-cover bg-center bg-no-repeat flex justify-center bg-neutral-900 overflow-hidden"
      >

        <section className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-700 p-6 rounded-lg">
            Welcome to Storify
          </h1>
          <p className="text-lg text-white mb-8 font-bold">

            Everyone has a story to tell
          </p>

          <Button clickableFunction={handleSignin}>Get Started</Button>
        </section>

      </main>
    </div>
  )
}
