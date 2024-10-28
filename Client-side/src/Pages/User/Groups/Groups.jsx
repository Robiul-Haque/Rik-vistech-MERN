import React from 'react';
import GroupCard from './GroupCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../Components/axios/axios.instance';
import Loader from '../../../Components/Shared/Loader';

const Groups = () => {
    const { data: groups, isLoadingGroup, refetchGroup } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const response = await api.get("/group");
            return response.data;
        }
        ,
    })
    if (isLoadingGroup) {
        return <Loader />
    }
    return (
        <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3'>
            {
                groups?.map(group => <GroupCard
                    key={group?._id}
                    title={group?.name}
                    link={group?.link}
                />)
            }
        </div>
    );
};

export default Groups;