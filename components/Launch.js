import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { backendUrl } from "../constants";
import Banner from "./Banner";

export default function Launch() {
    const user = useSelector((state) => state.auth.user);
    const axios = require("axios").default;
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        axios({
            url: backendUrl + "user/me",
            method: "GET",
            headers: {
                Authorization: "Bearer " + user.access_token,
            },
        }).then(function (response) {
            setLoggedInUser(response.data);
        });
    }, [user]);

    return (
        <>
            <div className={"container mx-auto"}>
                    <Banner />
            </div>
        </>
    );
}
