import Head from 'next/head'
import MpLogo from '../public/mp_logo_trans.png'
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Movie Predictor</title>
        <meta name="description" content="Movies you would like to watch!" />
        <link rel="icon" href="/mp_logo.png" />
      </Head>

      <main className={"container mx-auto"}>
          <div className={"flex flex-col items-center"}>
          <div className="flex items-center justify-center min-h-screen">
              <Image src={MpLogo} objectFit={"contain"}/>
              <h1 className={"font-thin text-6xl min-w-min"}>Welcome to Movie Predictor</h1>
          </div>
          <div className={"flex-1 -m-60"}>
              <button className={"border-0 h-14 w-36 p-2 rounded-xl bg-black text-white font-semibold hover:border-2 hover:bg-white hover:border-gray-600 hover:text-black transition-all duration-400 ease-out"}>
                  Learn More...
              </button>
          </div>
          </div>
      </main>
    </div>
  )
}
