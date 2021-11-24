import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../../icons/EyeIcon";
import EyeoffIcon from "../../icons/EyeoffIcon";

export default function Signin() {
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="flex w-full h-full">
            <div className="container mx-auto justify-center items-center flex">
                <div className="flex px-2 py-2 w-4/12 rounded border dark:border-gray-800 dark:bg-gray-800 dark:text-gray-100 border-gray-200 flex-col mt-10">
                    <div className="flex flex-col w-full">
                        <h1 className="text-center py-2 text-lg">welcome back! <span className="font-medium">signin</span> to continue</h1>
                        <button className="items-center flex rounded mt-5 mb-3 outline-none dark:bg-gray-900 border dark:border-gray-800 border-gray-200 hover:border-gray-300 justify-center mx-2 h-10">
                            <img src="https://o.remove.bg/downloads/f2adc9b4-e798-4fba-a81d-acc6e16de68d/image-removebg-preview.png" alt="google_login_image" className="w-6 h-6 object-contain" />
                            <span className="px-2">
                                Continue with google
                            </span>
                        </button>
                        <form onSubmit={handleSubmit} className="flex flex-col px-3">
                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="add your email address" autoComplete="off" type="email" id="email" className="dark:bg-gray-900 placeholder-gray-600 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                            </div>
                            <div className="flex flex-col relative mt-3">
                                <label htmlFor="email">Password</label>
                                <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="add password here" autoComplete="off" type={isEyeOpen ? "text" : "password"} id="email" className="placeholder-gray-600 dark:bg-gray-900 border dark:border-transparent dark:text-gray-300 border-gray-200 focus:ring focus:ring-blue-400 outline-none rounded h-10 px-2" />
                                <button onClick={() => setIsEyeOpen(!isEyeOpen)} className="absolute top-9 right-3" type="button">{isEyeOpen ? <EyeIcon /> : <EyeoffIcon />}</button>
                            </div>
                            <button className="mt-5 mb-2 rounded w-full h-9 bg-btnClr text-gray-100">Signin</button>
                        </form>
                        <p className="w-full items-center justify-center mt-2 text-center">
                            <span>Don't have an account ?</span>
                            <Link to='/signup' className="px-2 hover:text-blue-600 hover:underline">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
