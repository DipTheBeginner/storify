"use client"

import React from 'react'
import NavBar from "components/NavBar";
import './globals.css'
import { SessionProvider } from "next-auth/react";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="eng">
            <body>
                <RecoilRoot>
                    <SessionProvider>
                        <NavBar />
                        {children}
                    </SessionProvider>
                </RecoilRoot>
            </body>
        </html>
    )
}

