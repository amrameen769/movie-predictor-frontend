import Header from "./Header";
import {useSession} from "next-auth/react";

export default function Launch() {
    const {data: session} = useSession()
    return (
        <>
            <div className={"container mx-auto"}>
                <h1 className={"pt-60 font-thin text-6xl min-w-min"}>Launch Page</h1>
            </div>
        </>
    )
}