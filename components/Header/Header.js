"use client";
import './Header.scss';
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const { data: session, status } = useSession();
    const user = session?.user;
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const currentUser = {
        id: 1,
        username: "admin",
        isSeller: true,
    }

    useEffect(() => {
        console.log("session:", session);
        if (user && status === 'authenticated') {
            router.push("/");
        }
        else if (!user && status === 'unauthenticated') {
            router.push("/login");
        }
    }, [session, status, router])

    return (
        <header className={`${user ? 'bg-[#21b2b6]' : 'bg-white'} flex items-center justify-center w-full`}>
            <nav className=" w-[1200px] flex justify-between">
                <div className='flex items-center'>
                    <Image src='/logo.png'
                        alt='logo'
                        width={50}
                        height={50}
                    />
                    <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
                        Pub Seeking
                    </Link>
                </div>
                <ul className="links">
                    {/* <li>
                        <Link href="/" className="text-ct-dark-600">
                            Home
                        </Link>
                    </li> */}
                    {!user && (
                        <>
                            <li>
                                <Link href="/login" className="text-ct-dark-600">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-ct-dark-600">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <div
                                className=" bg-gray-100 p-[6px] rounded-md w-[70%] gap-3 hidden md:flex"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-transparent outline-none w-full"
                                />
                            </div>
                            {user && (
                                <div className="user" onClick={() => setOpen(!open)}>
                                    <img src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=" alt="user avatar" />
                                    <span>{currentUser?.username}</span>
                                    {open &&
                                        (
                                            <div className="options">
                                                <Link href="/profile" className="link">
                                                    Profile
                                                </Link>
                                                <Link href="/" className="link" onClick={() => signOut()}>
                                                    Logout
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;