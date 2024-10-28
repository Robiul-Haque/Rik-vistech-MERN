import React, { useState } from 'react';
import PaymentMethod from './PaymentMethod';
import { Button, Input } from '@material-tailwind/react';
import { BlankDialog } from '../../../Components/Dialog/BlankDialog';
import AddPaymentMethodForm from './AddPaymentMethodForm';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../Components/axios/axios.instance';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Shared/Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserDue from './UserDue';
import { refreshUser } from '../../../redux/features/user/userSlice';

const Withdraw = () => {
    const [active, setActive] = useState(null)
    const [open, setOpen] = useState(false)
    const { user } = useSelector((state) => state.user)
    const [dueModal, setDueModal] = useState(false)
    const [error, setError] = useState('')
    const { isLoading, data } = useQuery({
        queryKey: ['paymetmethods', user?._id],
        queryFn: async () => {
            const res = await api.get('/payment/' + user?._id)
            return res.data
        }

    })
    const [values, setValues] = useState({
        amount: 0,
    })
    const dispatch = useDispatch();
    const submitWithdraw = async () => {
        try {
            if (!active) {
                return toast.error('Please select a payment method');
            }
            if (user.due) {
                setDueModal(true)
                return
            }
            const response = await api.post('/withdraw', { ...values, user: user._id, ...active });
            toast.success(response?.data.message);
            setValues({ amount: 0 });
            dispatch(refreshUser(response.data));
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-full py-10 px-5 text-black'>
            <h1 className='text-3xl text-center'>Withdraw Balance</h1>
            <p className='text-center mt-3'>
                Your Current Balance : {user?.balance}
            </p>
            <h2 className='mt-10 text-xl text-center '>
                Select Payment Method
            </h2>
            <div className="grid lg:grid-cols-3 lg:gap-5 gap-2">
                {
                    data.map((method, index) => (
                        <PaymentMethod
                            onClick={() => setActive(method)}
                            key={index}
                            icon={PaymentMethods.filter((p) => p.name === method.method)[0].icon}
                            name={method.method}
                            number={method.account}
                            active={active?._id === method._id}
                        />
                    ))
                }
            </div>
            <Button onClick={() => setOpen(true)} className='mt-5'>Add a new payment method</Button>
            <div className='mt-10 max-w-96'>
                {
                    active && <PaymentMethod
                        icon={PaymentMethods.filter((p) => p.name === active.method)[0].icon}
                        name={active.method}
                        number={active.account}
                        active={false}
                    />
                }
                <div className='mt-8'>
                    <Input
                        label="Enter Amount"
                        type='number'
                        value={values.amount}
                        onChange={(e) => {
                            if (e.target.value > user?.balance) {
                                return setError(`Insufficient balance, you have ${user?.balance} only`)
                            }
                            setValues((prev) => ({ ...prev, amount: e.target.value }))
                            setError('')
                        }}
                        size="lg"
                        max={user?.balance}
                    />
                    <p className='mt-3 text-sm text-red-500'>{error}</p>
                </div>
                <button onClick={submitWithdraw} disabled={!active || !values.amount} className='mt-5 btn btn-primary disabled:bg-black'>Withdraw</button>

            </div>
            <BlankDialog open={open} setOpen={setOpen} >
                <AddPaymentMethodForm />
            </BlankDialog>
            {/* Dialog Box for due */}
            <BlankDialog open={dueModal} setOpen={setDueModal} >
                <UserDue />
            </BlankDialog>
        </div>
    );
};

export default Withdraw;

export const PaymentMethods = [
    {
        icon: "https://freelogopng.com/images/all_img/1656234782bkash-app-logo.png",
        name: "Bkash",
    },
    {
        icon: "https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png",
        name: "Nagad",
    },
    {
        icon: "https://i.pinimg.com/736x/60/5a/bd/605abdb7af3405c6b20a426b1e128322.jpg",
        name: "Google Pay",

    },
    {
        icon: "https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png",
        name: "Paytm",

    },
    {
        icon: "https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png",
        name: "Rocket",
    },
]