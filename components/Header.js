import {useRouter} from "next/router";
import {
    MenuIcon,
    UserGroupIcon,
} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";
import {signIn, useSession} from "next-auth/react";
import Image from "next/image";
import mpLogo from "../public/mp_logo.png";
import {useDispatch, useSelector} from "react-redux";
import {setAccessData} from "../store/slices/authSlice";
import ProfileDropDown from "./ProfileDropDown";
import Search from "./Search";

export default function Header() {
    const user = useSelector((state) => state.auth.user);

    if (user && Object.keys(user).length === 0) {
        const dispatch = useDispatch();
        const {data: session} = useSession();
        dispatch(
            setAccessData({
                user: session.user,
            })
        );
    }
    return (
        <div className="shadow-sm border-b bg-white sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
                {/* Left */}
                <div
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
                {/*<div className="max-w-xs">*/}
                {/*    <Search />*/}
                {/*</div>*/}
                {/* Right */}
                <div className="flex items-center justify-end space-x-2">
                    <MenuIcon className="h-6 md:hidden cursor-pointer"/>
                    {user?.access_token ? (
                        <>
                            <UserGroupIcon className="navBtn"/>
                            <div className="flex items-center">
                                <Image
                                    src={user?.image}
                                    alt="pro-pic"
                                    className="rounded-full cursor-pointer"
                                    objectFit="fill"
                                    layout="fixed"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <ProfileDropDown />
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
