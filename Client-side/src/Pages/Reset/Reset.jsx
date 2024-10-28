
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../Components/axios/axios.instance';
import toast from 'react-hot-toast';


const Reset = () => {
    const [email, setEmail] = useState('')
    const [isCodeSent, setIsCodeSent] = useState(false)

    const onSubmit = async () => {
        try {
            if (email) {
                const res = await api.patch(`/users/forget/${email}`)
                setIsCodeSent(true)
                setEmail(res.data?.email)
                toast.success(res.data?.message)
            }
            else {
                toast.error("Please Enter Email Address / Phone Number")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setIsCodeSent(false)
        }
    }
    const [code, setCode] = useState("")
    const location = useLocation().search
    const codeParam = new URLSearchParams(location).get('code')
    const emailParam = new URLSearchParams(location).get('email')
    const [isValidCode, setIsValidCode] = useState(false)
    const codeVerify = async () => {
        try {
            const res = await api.post(`/users/verify-code/`, {
                code: codeParam,
                user: emailParam,
            })
            return true
        } catch (error) {
            return false
        }
    }
    useEffect(() => {
        (
            async () => {
                if (codeParam && emailParam) {
                    const isTrue = await codeVerify()
                    setIsValidCode(isTrue)
                }
            }
        )()
    }, [codeParam, emailParam])
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const updatePassword = async () => {
        if (!password) {
            toast.error("Please Enter Password")
            return
        }
        try {
            const res = await api.put(`/users/update-password/${emailParam}`, { password: password })
            if (res) {
                toast.success("Password updated successfully Please Login")
                navigate("/login")
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message || "Something went wrong")
        }
    }
    return (
        <div className='p-10 container mx-auto flex justify-center h-[90vh] text-black'>
            <div className='flex justify-center items-center'>
                {
                    isValidCode && emailParam && codeParam ?
                        <div
                            className='w-[410px] min-h-[auto] bg-white rounded-lg p-4 shadow-md'>
                            <div >
                                <h1 className='text-3xl mb-2'>Update Password</h1>
                                <label className="form-control w-full mt-2">
                                    <div className="label px-0 mb-[1px]">
                                        <span className="label-text font-semibold text-gray-600">New Password</span>
                                    </div>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type="text"
                                        placeholder="Enter New Password"
                                        name='password'
                                        className="text-sm w-full border outline-none border-gray-700 placeholder:text-gray-500 rounded py-2 px-2 text-gray-700"
                                    />
                                </label>

                                <button
                                    onClick={updatePassword}
                                    className='btn btn-primary w-full mb-2 mt-5 rounded-3xl' type='submit'>
                                    Change password
                                </button>
                            </div>
                        </div>
                        :
                        <div
                            className='w-[410px] min-h-[auto] bg-white rounded-lg p-4 shadow-md'>
                            {
                                !isCodeSent ?
                                    <>
                                        <div >
                                            <p className='text-red-500'>{
                                                emailParam && codeParam && !isValidCode && "Invalid Link Please Try Again"
                                            }</p>
                                            <h1 className='text-3xl mb-2 mt-2'>Reset password</h1>
                                            <label className="form-control w-full mt-2">
                                                <div className="label px-0 mb-[1px]">
                                                    <span className="label-text font-semibold text-gray-600">Email Address / Phone Number</span>
                                                </div>
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    type="email"
                                                    name='email'
                                                    placeholder="Enter Email Address / Phone Number"
                                                    className="text-sm w-full border outline-none border-gray-700 placeholder:text-gray-500 rounded py-2 px-2 text-gray-700"
                                                />
                                            </label>

                                            <button
                                                onClick={onSubmit}
                                                className='btn btn-primary w-full mb-2 mt-5 rounded-3xl' type='submit'>
                                                Send Code
                                            </button>
                                        </div>
                                        <div className="flex justify-center">
                                            <Link to={'/login'} className='text-center w-full text-sm mt-2'>
                                                You have account access?
                                                <span className='font-semibold underline text-primary ml-2'>Login</span>
                                            </Link>
                                        </div>
                                    </>
                                    :
                                    <div className='w-full min-h-[200px]'>
                                        <img
                                            src={'/images/success.png'}
                                            width={80}
                                            height={80}
                                            alt='Success'
                                            className='mx-auto'
                                        />
                                        <h1 className='text-center font-normal text-green-600 mt-4'>
                                            Successfully sent password reset link to your email. Please check your email.
                                        </h1>
                                        <div className='flex items-center justify-center gap-3 mt-5'>
                                            <h1 className='text-sm'>Didn't receive mail?</h1>
                                            <button
                                                onClick={onSubmit}
                                                className='btn btn-primary w-full rounded-lg btn-xs max-w-[120px] text-xs'>
                                                Resend
                                            </button>
                                        </div>

                                    </div>
                            }
                        </div>
                }

            </div>
        </div>
    );
};

export default Reset;