/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { countrys } from '../../data/countrys';
import toast from 'react-hot-toast';
import { api } from '../../Components/axios/axios.instance';
import { useNavigate } from 'react-router-dom';
import { PhoneNumberSelector } from './PhoneNumberSelector';
import { phone as validatePhone } from 'phone'
import { BlankDialog } from '../../Components/Dialog/BlankDialog';
import Logo from '../../Components/Brand/Logo';

const Signup = () => {

    const [whatsapp, setWhatsApp] = useState('')
    const [telegram, setTelegram] = useState('')

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        password: '',
        term: true,
        reference: '',
        phone: '',
    });
    const location = useLocation()
    const referCode = new URLSearchParams(location.search).get('refer')
    const missingProperties = Object.entries(values)
        .filter(([key, value]) => key !== 'reference' && (value === '' || value === undefined || value === null))
        .map(([key, value]) => key);
    const [error, setError] = useState(''); // Initialize error state with an empty string
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.term) {
            if (!missingProperties.length) {
                setError('');
                try {
                    // Perform signup logic here
                    const response = await api.post('/users/register', { ...values, whatsapp, telegram });
                    toast.success('Account created successfully');
                    setUser(response.data);
                    setOpen(true);
                    // Redirect to login page

                } catch (error) {
                    toast.error(error.response.data.message);
                    setError(error.response.data.message);
                }
            } else {
                setError(`Please fill ${missingProperties.join(', ')} ${missingProperties.length > 1 ? 'fields' : 'field'}`);
            }
        } else {
            setError('Please accept our terms and conditions'); // Set error message for not accepting terms
        }
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (referCode) {
            setValues({
                ...values,
                reference: referCode
            })
        }
    }, [referCode])
    return (
        <div>
            <div className="min-h-[100vh] bg-gray-100 py-6 flex flex-col justify-center sm:py-12 text-black bg-cover bg-center"
                style={{
                    backgroundImage: `url(/images/bg/auth-bg.jpg)`
                }}
            >
                <BlankDialog open={open} setOpen={setOpen} size={"sm"}>
                    <div className='py-5 text-black px-5'>
                        <h1 className='text-2xl font-semibold text-green-600 text-center'>Welcome to Dynamic Skillbase</h1>
                        <h1 className='text-xl mt-3'>Your Account Information</h1>
                        <div className="mt-5">
                            <h2>Name: {user?.firstName + " " + user?.lastName}</h2>
                            <h2>Userid: {user?.userId}</h2>
                            <h2>Password: {values?.password}</h2>
                        </div>
                        <button
                            className='btn btn-primary btn-md mt-5'
                            onClick={() => navigate('/login')}>Login Now</button>
                    </div>
                </BlankDialog>
                <div className="relative py-3  sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
                        <div className="lg:min-w-[500px] mx-auto">
                            <div className='flex justify-center'>
                                <Logo />
                            </div>
                            <div className="divide-y divide-gray-200">
                                <form
                                    onSubmit={handleSubmit}
                                    className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="lg:grid flex flex-col grid-cols-1 lg:grid-cols-2 gap-4">
                                        <Input
                                            onChange={handleChange}
                                            name='firstName'
                                            variant="outlined" label="First Name " placeholder="First Name"
                                            className='w-full'
                                        />
                                        <Input
                                            onChange={handleChange}
                                            name='lastName'
                                            variant="outlined" label="Last Name" placeholder="Last Name"
                                            className='w-full'
                                        />
                                        <Select
                                            onChange={(e) => setValues({ ...values, language: e })}
                                            name='language'
                                            variant="outlined"
                                            label="Select a language"
                                        >
                                            <Option value='Bangla'>
                                                Bangla
                                            </Option>
                                            <Option value='English'>
                                                English
                                            </Option>
                                            <Option value='Hindi'>
                                                Hindi
                                            </Option>
                                            <Option value='Urdu'>
                                                Urdu
                                            </Option>
                                            <Option value='Nepali'>
                                                Nepali
                                            </Option>
                                            <Option value='Assamese'>
                                                Assamese
                                            </Option>

                                        </Select>
                                        <Select
                                            onChange={(e) => setValues({ ...values, country: e })}
                                            name='country'
                                            variant="outlined"
                                            label="Select Country"
                                            className='z-10 bg-white'
                                            >
                                            {
                                                countrys.map((name, index) => (
                                                    <Option
                                                        key={index}
                                                        value={name}>
                                                        {name}
                                                    </Option>
                                                ))
                                            }
                                        </Select>
                                        {/* <Input
                                            onChange={handleChange}
                                            name='whatsapp'
                                            variant="outlined"
                                            label="Whatsapp Number" placeholder="Enter Your Whatsapp Number"

                                        /> */}

                                        <PhoneNumberSelector
                                            placeholder={'Whatsapp Number'}
                                            state={whatsapp}
                                            setState={setWhatsApp}
                                            countrySelected={values.country}
                                        />
                                        <PhoneNumberSelector
                                            placeholder={'Telegram Number'}
                                            state={telegram}
                                            setState={setTelegram}
                                            countrySelected={values.country}
                                        />
                                        <Input
                                            onChange={handleChange}
                                            name='phone'
                                            type='number'
                                            variant="outlined" label="Phone Number" placeholder="Your Phone Number"
                                            className='w-full'

                                        />
                                        <Input
                                            onChange={(e) => {
                                                if (e.target.value.includes(" ")) {
                                                    e.target.value = e.target.value.replace(" ", "")
                                                }
                                                handleChange(e)
                                            }}
                                            name='email'
                                            variant="outlined"
                                            type='email'
                                            label="Email Address" placeholder="Enter Your Phone Number"
                                        />
                                        <Input
                                            readOnly={referCode ? true : false}
                                            defaultValue={referCode}
                                            onChange={handleChange}
                                            name='reference'
                                            variant="outlined"
                                            label="Enter Reference No." placeholder="Enter Reference No."
                                        />


                                        <Input
                                            onChange={handleChange}
                                            name='password'
                                            variant="outlined"
                                            label="Enter A Secure Password"
                                            type='text'
                                            placeholder="Enter A Secure Password"
                                        />

                                    </div>
                                    <p className='text-red-500 text-sm'>
                                        {error}
                                    </p>
                                    <div className="relative">
                                        <button className="btn btn-primary btn-sm px-6 rounded-md py-2">Registration</button>
                                    </div>

                                    <div className='pt-2 text-start text-sm'>
                                        Alrady a member? <Link to={'/login'} className='text-primary'>
                                            Login
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;