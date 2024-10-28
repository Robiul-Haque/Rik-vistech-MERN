import React from 'react';
import { InputFeild } from '../Components/UserProfileDialog';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../Components/Shared/Loader';
import { api } from '../../../../Components/axios/axios.instance';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import Banners from './Banners';

const Settings = () => {
    const { isLoading, data: setting, refetch } = useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const passbook = await api.get(`/users/setting/app-setting`);
            return passbook.data
        }
    })
    const formHandler = async (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
        try {
            const res = await api.put(`/users/setting/app-setting`, values);
            if (res) {
                toast.success("Settings updated successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='lg:p-5'>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                <div className='gradint-bg-2 p-5 rounded flex flex-col items-center w-full py-10'>
                    <h1 className='text-2xl font-semibold'>Settings</h1>
                    <form onSubmit={formHandler} className="pt-5 max-w-[500px] w-full mt-10">
                        <InputFeild
                            type={"number"}
                            name={"active_fee"}
                            value={setting?.active_fee}
                            label={"Activation Fee"}
                        />
                        <InputFeild
                            type={"number"}
                            name={"pending_fee"}
                            value={setting?.due}
                            label={"Due"}
                        />
                        <InputFeild
                            type={"number"}
                            name={"refer_bonus"}
                            value={setting?.refer_bonus}
                            label={"Refer Bonus"}
                        />
                        <InputFeild
                            type={"number"}
                            name={"active_bonus"}
                            value={setting?.active_bonus}
                            label={"Activation Bonus for User"}
                        />
                        <InputFeild
                            type={"number"}
                            name={"counsultant_bonus"}
                            value={setting?.counsultant_bonus}
                            label={"Bonus for counselor"}
                        />
                        <InputFeild
                            type={"number"}
                            name={"gl_bonus"}
                            value={setting?.gl_bonus}
                            label={"Bonus for Team Leader"}
                        />
                        <InputFeild
                            type={"number"}
                            name={"trainer_bonus"}
                            value={setting?.trainer_bonus}
                            label={"Trainer Bonus"}
                        />
                        <InputFeild
                            name={"support_link"}
                            value={setting?.support_link}
                            label={"Support Link"}
                        />
                        <InputFeild
                            name={"helpyou_link"}
                            value={setting?.helpyou_link}
                            label={"May i help you link"}
                        />
                        <InputFeild
                            name={"whatsapp"}
                            value={setting?.whatsapp}
                            label={"Whatsapp Group"}
                        />
                        <Button type='submit' variant='filled' color='orange'>
                            Update
                        </Button>
                    </form>
                </div>
                <Banners />
            </div>
        </div>
    );
};

export default Settings;

