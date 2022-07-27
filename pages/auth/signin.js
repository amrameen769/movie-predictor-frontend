import { getProviders, signIn as signIntoProvider } from "next-auth/react";

function signIn({ providers }) {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
                <h1 className={"pt-60 font-thin text-6xl min-w-min"}>
                    Sign In to Movie Predictor
                </h1>
                <p className="font-xs italic">Educational Purposes Only.</p>
                <div className="mt-40">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="p-3 bg-blue-500 rounded-lg text-white"
                                onClick={() =>
                                    signIntoProvider(provider.id, {
                                        callbackUrl: "/",
                                    })
                                }
                            >
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

export default signIn;
