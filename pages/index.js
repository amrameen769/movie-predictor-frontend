import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Movie Predictor</title>
        <meta name="description" content="Movies you would like to watch!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"container mx-auto"}>
          <div className="flex items-center justify-center min-h-screen">
              <h1 className={""}>Welcome to Movie-Predictor</h1>
          </div>
      </main>
    </div>
  )
}
