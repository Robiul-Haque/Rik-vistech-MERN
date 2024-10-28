import { Input } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { api } from '../../Components/axios/axios.instance';
import Cookies from 'js-cookie';
import Logo from '../../Components/Brand/Logo';
const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const missingProperties = Object.entries(values)
        .filter(([key, value]) => (value === '' || value === undefined || value === null))
        .map(([key, value]) => key);

    const [error, setError] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        if (!missingProperties.length) {
            setError('');
            try {
                // Perform signup logic here
                const response = await api.post('/users/login', values);
                toast.success(response?.data.message);
                Cookies.set('accessToken', response?.data.accessToken, { expires: 365 });
                // Redirect to login page
                navigate(`/${response.data.role || 'user'}`);
                window.location.reload();
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong");
                setError(error.response.data.message || "Something went wrong");
            }
        } else {
            setError(`Please fill ${missingProperties.join(', ')} ${missingProperties.length > 1 ? 'fields' : 'field'}`);
        }

    }
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center bg-center bg-cover "
            style={{
                backgroundImage: `url(/images/bg/auth-bg.jpg)`
            }}
            >
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-7 lg:min-w-[550px]">
                        <div className="flex justify-center p-5">
                            <Logo width={"w-[140px]"} link={'/'} />
                        </div>
                        <div className="w-full mx-auto">
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <Input
                                        onChange={handleChange}
                                        name='email'
                                        variant="outlined"
                                        label="Email address / Phone number"
                                        placeholder="Your Email address / Phone number"
                                    />
                                    <Input
                                        onChange={handleChange}
                                        name='password'
                                        type='password'
                                        variant="outlined"
                                        label="Enter Password"
                                        placeholder="Enter Password"
                                    />
                                    <p className='text-red-500 text-sm'>
                                        {error}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <button onClick={handleSubmit} className="btn btn-primary btn-sm px-6 rounded-md py-2">Login</button>
                                            </div>
                                            <div className="relative">
                                                <Link to={'/'}  className="btn btn-secondary btn-sm px-6 rounded-md py-2">Back To Home</Link>
                                            </div>
                                        </div>
                                        <div className='mt-2'>
                                            <Link to={'/reset'} className='hover:text-primary text-sm btn btn-link'>
                                                Forget Password ?
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='pt-5 text-start text-sm'>
                                        Don’t have an account? 
                                        <Link to={'/signup'} className='text-primary ml-1'>
                                            Register Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;