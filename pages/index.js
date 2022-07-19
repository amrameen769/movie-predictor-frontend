import Head from 'next/head'
import {getSession, signIn} from "next-auth/react";
import {useSession} from "next-auth/react"
import Launch from "../components/Launch";
import Header from "../components/Header";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";

export default function Home() {
    const {data: session} = useSession()

    return (
        <div>
            <Head>
                <title>Movie Predictor</title>
                <meta name="description" content="Movies you would like to watch!"/>
                <link rel="icon" href="/mp_logo.png"/>
            </Head>
            {session && <Header/>}
            <main className={"container mx-auto"}>
                {session ? (
                        <Launch/>
                    ) :
                    (
                        <div className="flex flex-col items-center min-h-screen">
                            <h1 className={"pt-60 font-thin text-6xl min-w-min"}>Welcome to Movie Predictor</h1>
                            <button onClick={signIn}
                                    className={"mt-10 border-0 h-14 w-36 p-2 rounded-xl bg-black text-white font-semibold hover:border-2 hover:bg-white hover:border-gray-600 hover:text-black transition-all duration-400 ease-out"}>
                                Learn More...
                            </button>
                        </div>
                    )}

            </main>
        </div>
    )
}

export async function getServerSideProps(context) {

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    return {
        props: {
            session
        }
    }
}

