import { useRouter } from "next/router";
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import mpLogo from "../public/mp_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setAccessData } from "../store/slices/authSlice";

export default function Header() {
    const user = useSelector((state) => state.auth.user);

    if (user && Object.keys(user).length === 0) {
        const dispatch = useDispatch();
        const { data: session } = useSession();
        dispatch(
            setAccessData({
                user: session.user,
            })
        );
    }

    const router = useRouter();
    return (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
                {/* Left */}
                <div
                    onClick={() => router.push("/")}
                    className="hidden relative w-24 lg:inline-flex"
                >
                    <h1 className={"font-normal text-3xl min-w-max pt-2"}>
                        Movie Predictor
                    </h1>
                </div>
                <div
                    onClick={() => router.push("/")}
                    className="relative w-10 lg:hidden"
                >
                    <Image
                        alt="mp-logo"
                        src={mpLogo}
                        objectFit="contain"
                        layout="fill"
                    />
                </div>

                {/* Middle */}
                <div className="max-w-xs">
                    <div className="relative mt-1 p-3 rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            className="bg-gray-50 block w-full h-8 pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                </div>
                {/* Right */}
                <div className="flex items-center justify-end space-x-2">
                    <HomeIcon
                        onClick={() => router.push("/")}
                        className="navBtn"
                    />
                    <MenuIcon className="h-6 md:hidden cursor-pointer" />
                    {user?.access_token ? (
                        <>
                            <div className="relative navBtn">
                                <PaperAirplaneIcon className="rotate-45" />
                                <div className="absolute -top-1 -right-2 text-xs h-5 w-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                                    3
                                </div>
                            </div>
                            <PlusCircleIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <div className="flex items-center">
                                <Image
                                    onClick={signOut}
                                    src={user?.image}
                                    alt="pro-pic"
                                    className="rounded-full cursor-pointer"
                                    objectFit="fill"
                                    layout="fixed"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </>
                    ) : (
                        <button className="font-semibold" onClick={signIn}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
