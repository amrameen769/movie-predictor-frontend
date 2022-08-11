import {useSelector} from "react-redux";

export default function Forum(){

    const user = useSelector((state) => state.auth.user);
    if (user && Object.keys(user).length === 0) {
        return (
            <div className={"text-center"}>
                <h1 className={"font-bold text-2xl m-60"}>Please Login to Continue</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className={"text-2xl"}>Forum</h1>
            </div>
        )
    }
}
