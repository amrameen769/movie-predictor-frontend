import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { backendUrl } from "../constants";
import Banner from "../components/Banner";

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
        <h1 className={"pt-60 font-thin text-6xl min-w-min"}>
          Welcome {loggedInUser && loggedInUser.email}
        </h1>
        <div className={"container mx-auto max-h-screen"}>
          <Banner />
          {/* <h1 className={"pt-60 font-thin text-6xl min-w-min"}>Launch Page</h1> */}
        </div>
      </div>
    </>
  );
}
