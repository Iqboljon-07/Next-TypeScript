"use client";

import "./style.css";
import { FaCode, FaUser, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";



function Navbar() {
    const { logout, token } = useAuth()

    const pathname = usePathname();
    const router = useRouter();




    return (
        <div className="wrapper flex items-center justify-between py-5 px-10 font-bold">
            <Link
                href="/"
                className={`flex items-center gap-1 text-white text-2xl font-bold wrapper_item ${pathname === "/" ? "active" : ""
                    }`}
            >
                <FaCode />
                DevConnector
            </Link>

            <div className="flex gap-10 text-white text-lg font-bold">
                <Link
                    className={`wrapper_item ${pathname === "/profiles" ? "active" : ""}`}
                    href="/profiles"
                >
                    Developers
                </Link>


                {token ? <div className="flex gap-10">
                    <Link
                        className={`wrapper_item ${pathname === "/posts" ? "active" : ""
                            }`}
                        href="/posts"
                    >
                        Posts
                    </Link>
                    <Link
                        className={`wrapper_item flex items-center gap-2 ${pathname === "/dashboard" ? "active" : ""
                            }`}
                        href="/dashboard"
                    >
                        <FaUser />
                        Dashboard
                    </Link>
                    <button onClick={logout} className="flex items-center gap-1">
                        <FaSignOutAlt /> Logout
                    </button>
                </div> : <div className="flex gap-10">
                    <Link
                        className={`wrapper_item ${pathname === "/register" ? "active" : ""
                            }`}
                        href="/register"
                    >
                        Register
                    </Link>
                    <Link
                        className={`wrapper_item ${pathname === "/login" ? "active" : ""
                            }`}
                        href="/login"
                    >
                        Login
                    </Link>
                </div>
                }


            </div>
        </div>
    );
}

export default Navbar;
