"use client"

import React from 'react'
import './globals.css'
import { SessionProvider } from "next-auth/react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="eng">
            <body>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
            </body>
        </html>
    )
}

