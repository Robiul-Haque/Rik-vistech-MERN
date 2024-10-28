import { Button } from '@material-tailwind/react';
import React from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../../Components/axios/axios.instance';

const StatusChanger = ({ user, refetch, setOpen }) => {
    const updateUser = async () => {
        const confirm = window.confirm(`Are you sure you want to ${user?.status === "active" ? "deactivate" : "activate"} this user?`)
        if (!confirm) return;
        try {
            setOpen(false);
            const res = await api.put(`/users/active/${user._id}`,
                { status: user.status === "active" ? "inactive" : "active", "settings.activates": new Date() })
            toast.success("User status updated successfully")
            refetch()

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div>
            <div className='flex gap-3'>
                {
                    user?.status !== "active" ?
                        <Button color="red" size='sm' onClick={updateUser}>
                            Inactive
                        </Button>
                        :
                        <Button color="green" size='sm'>
                            Active
                        </Button>
                }

            </div>
        </div>
    );
};

export default StatusChanger;