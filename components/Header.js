import {MenuIcon,} from "@heroicons/react/outline";
import {signIn, useSession} from "next-auth/react";
import Image from "next/image";
import mpLogo from "../public/mp_logo.png";
import {useDispatch, useSelector} from "react-redux";
import {setAccessData} from "../store/slices/authSlice";
import ProfileDropDown from "./ProfileDropDown";
import {useRouter} from "next/router";

export default function Header() {
    const user = useSelector((state) => state.auth.user);
    const router = useRouter()

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
        <div className="shadow-sm border-b bg-white sticky top-0 z-50 pt-1 pb-1">
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
                {/* Left */}
                <div
                    className="hidden relative w-24 lg:inline-flex hover:cursor-pointer"
                    onClick={() => router.push("/")}
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
                            <div className="flex items-center">
                                <h3 className={"pr-2 font-semibold"}>Hi, {user.name}</h3>
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
                            <ProfileDropDown/>
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
