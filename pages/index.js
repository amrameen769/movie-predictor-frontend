import Head from "next/head";
import { getSession, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Launch from "../components/Launch";
import Header from "../components/Header";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { wrapper } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAccessData } from "../store/slices/authSlice";
export default function Home() {
  const { data: session } = useSession();

  const user = useSelector((state) => state.auth.user);

  if (user && Object.keys(user).length === 0) {
    const dispatch = useDispatch();
    dispatch(
      setAccessData({
        user: session?.user,
      })
    );
  }

  return (
    <div>
      <Head>
        <title>Movie Predictor</title>
        <meta name="description" content="Movies you would like to watch!" />
        <link rel="icon" href="/mp_logo.png" />
      </Head>
      {session && <Header />}
      <main className={"container mx-auto"}>
        {session ? (
          <Launch />
        ) : (
          <div className="flex flex-col items-center min-h-screen">
            <h1 className={"pt-60 font-thin text-6xl min-w-min"}>
              Welcome to Movie Predictor
            </h1>
            <button
              onClick={signIn}
              className={
                "mt-10 border-0 h-14 w-36 p-2 rounded-xl bg-black text-white font-semibold hover:border-2 hover:bg-white hover:border-gray-600 hover:text-black transition-all duration-400 ease-out"
              }
            >
              Learn More...
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//
//     const session = await unstable_getServerSession(context.req, context.res, authOptions);
//
//     const axios = require("axios").default;
//
//     session && await axios({
//         method: "post",
//         url: "http://localhost:8000/user/create",
//         data: {
//             "username": session.user.username,
//             "email": session.user.email,
//             "password": session.user.uid
//         }
//     }).then(async function (response) {
//         if (response.status === 201) {
//             await axios({
//                 method: "post", url: "http://localhost:8000/auth/auth-token", headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }, data: `grant_type=password&username=${session.user.username}&password=${session.user.uid}`
//             }).then(async function (response) {
//                 session.user.access_token = await response.data.access_token
//                 session.user.token_type = await response.data.token_type
//             })
//         }
//     }).catch(async function (error) {
//         if (error.response.status === 406) {
//             await axios({
//                 method: "post", url: "http://localhost:8000/auth/auth-token", headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }, data: `grant_type=password&username=${session.user.username}&password=${session.user.uid}`
//             }).then(async function (response) {
//                 session.user.access_token = await response.data.access_token
//                 session.user.token_type = await response.data.token_type
//             })
//         }
//     })
//
//     return {
//         props: {
//             session
//         }
//     }
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    const axios = require("axios").default;

    session &&
      (await axios({
        method: "post",
        url: "http://localhost:8000/user/create",
        data: {
          username: session.user.username,
          email: session.user.email,
          password: session.user.uid,
        },
      })
        .then(async function (response) {
          if (response.status === 201) {
            await axios({
              method: "post",
              url: "http://localhost:8000/auth/auth-token",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              data: `grant_type=password&username=${session.user.username}&password=${session.user.uid}`,
            }).then(async function (response) {
              session.user.access_token = await response.data.access_token;
              session.user.token_type = await response.data.token_type;
            });
          }
        })
        .catch(async function (error) {
          if (error.response.status === 406) {
            await axios({
              method: "post",
              url: "http://localhost:8000/auth/auth-token",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              data: `grant_type=password&username=${session.user.username}&password=${session.user.uid}`,
            }).then(async function (response) {
              session.user.access_token = await response.data.access_token;
              session.user.token_type = await response.data.token_type;
            });
          }
        }));

    return {
      props: {
        session,
      },
    };
  }
);
