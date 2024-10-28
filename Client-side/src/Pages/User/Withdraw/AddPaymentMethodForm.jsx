import { Button, Input, Option, Select } from '@material-tailwind/react';
import React, { useState } from 'react';
import { PaymentMethods } from './Withdraw';
import { useSelector } from 'react-redux';
import { api } from '../../../Components/axios/axios.instance';
import toast, { Toaster } from 'react-hot-toast';

const AddPaymentMethodForm = () => {
    const { user } = useSelector((state) => state.user)
    const [values, setValues] = useState({
        method: "",
        account: "",
    })
    const handleSubmit = async () => {
        if (values.method && values.account) {
            try {
                const response = await api.post('/payment', { ...values, user: user._id });
                toast.success(response?.data.message);
                setValues({ method: "", account: "" });
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong");
            }
        }
        else {
            toast.error('Please fill all the fields');
        }
    }

    return (
        <div className='w-full text-black pt-5 px-5'>
            <h1 className='text-xl font-semibold text-center'>Add a Payment Method</h1>
            <Toaster />
            <div className="mt-5">
                <Select
                    value={values.method}
                    onChange={(e) => setValues((prev) => ({ ...prev, method: e }))}
                    size="lg"
                    label="Select Payment Method"
                    selected={(element) =>
                        element &&
                        React.cloneElement(element, {
                            disabled: true,
                            className:
                                "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                        })
                    }
                >
                    {PaymentMethods.map(({ name, icon }) => (
                        <Option key={name} value={name} className="flex items-center gap-2">
                            <img
                                src={icon}
                                alt={name}
                                className="h-5 w-5 rounded-full object-cover"
                            />
                            {name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className='mt-4'>
                <Input
                    name='phone'
                    label="Account Number"
                    value={values.account}
                    onChange={(e) => setValues((prev) => ({ ...prev, account: e.target.value }))}
                />
            </div>
            <Button onClick={handleSubmit} className='mt-5'>Add Payment Method</Button>
        </div>
    );
};

export default AddPaymentMethodForm;