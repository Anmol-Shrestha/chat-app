"use client"
import Link from "next/link";
import React from 'react'
import UserButton from "../UserButton";
import { signInNew } from "@/helper";
import styles from "./navigation.module.css"
import { ModeToggle } from "../mode-toggle";

function Navigation() {
    return (
        <header className={styles.header}>
            <nav className={`${styles.navigation}`}>
                <div className={`${styles.left}`}>
                    <Link href="/"><img src="./logo-header.png" alt="" /></Link>
                </div>

                <div className={`${styles.right}`}>
                   <ModeToggle/>

                    <Link href="/about" className="ml-5 font-light">
                        ABOUT
                    </Link>
                     <UserButton
                      
                    />


                </div>
            </nav>
        </header>
    )
}

export default Navigation