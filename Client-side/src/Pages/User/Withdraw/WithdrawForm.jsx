import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';

const WithdrawForm = () => {
    const [values, setValues] = useState({
        amount: 0,
    })
    return (
        <div className='mt-10 max-w-96'>
            <Input
                label="Enter Amount"
                type='number'
                value={values.amount}
                onChange={(e) => setValues((prev) => ({ ...prev, amount: e.target.value }))}
                size="lg"
            />
        </div>
    );
};

export default WithdrawForm;