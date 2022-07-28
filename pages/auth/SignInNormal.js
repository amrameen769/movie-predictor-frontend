import {useRef} from "react";
import useFetch from "../../hooks/useFetch";
import {backendUrl} from "../../constants";
import {useDispatch} from "react-redux";
import {setAccessData} from "../../store/slices/authSlice";
import {useRouter} from "next/router";
import {default as axios} from "axios";

export default function SignInNormal() {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const dispatch = useDispatch()
    const router = useRouter()

    const loginMethod = () => {
        (async () => {
            const reqData = {
                username: usernameRef.current.value, password: passwordRef.current.value, email: emailRef.current.value
            }
            const data = await useFetch(backendUrl + "user/create", "post", null, reqData)
            await axios({
                method: "post",
                url: backendUrl + "auth/auth-token",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },
                data: `grant_type=password&username=${data.username}&password=${reqData.password}`,
            }).then(async function (response) {
                console.log(response.data)
            })
            dispatch(setAccessData({
                user: data
            }))
            await router.push("/")
        })();

    }

    return (
        <>
            <div class="bg-white rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div class="mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                           id="username" type="text" placeholder="Username" ref={usernameRef}/>
                </div>
                <div class="mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                           id="email" type="email" placeholder="Email" ref={emailRef}/>
                </div>
                <div class="mb-6">
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                        id="password" type="password" placeholder="Password" ref={passwordRef}/>
                </div>
                <div>
                    <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={loginMethod}>
                        Login in with Username and Password
                    </button>
                </div>
            </div>
        </>
    )
}