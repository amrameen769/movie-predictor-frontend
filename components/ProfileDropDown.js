import {Menu} from "@headlessui/react"
import {ChevronRightIcon} from "@heroicons/react/outline";
import {signOut} from "next-auth/react"
export default function ProfileDropDown(){
    return (
        <Menu>
            <Menu.Items>
                <Menu.Item>
                    {({active}) => (
                        <button
                            onClick={() => signOut({
                                callbackUrl: `${window.location.origin}`
                            })}
                            className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                            Sign Out
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
            <Menu.Button><ChevronRightIcon className={"navBtn"}/></Menu.Button>
        </Menu>
    )
}