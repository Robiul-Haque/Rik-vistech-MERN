import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../../Components/axios/axios.instance';
import Loader from '../../../../Components/Shared/Loader';
import UsersTable from './UsersTable';


const SingleConsultant = ({ page }) => {
    const { id } = useParams()

    const { isLoading, data: consultant, refetch } = useQuery({
        queryKey: ["consultant", id],
        queryFn: async () => {
            if (page === "gl") {
                const passbook = await api.get(`/users/id/${id}?role=gl`);
                return passbook.data
            }
            else if (page === "trainer") {
                const passbook = await api.get(`/users/id/${id}?role=trainer`);
                return passbook.data
            }
            else {
                const passbook = await api.get(`/users/id/${id}?role=consultant`);
                return passbook.data
            }
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='p-5'>
            <UsersTable consultant={consultant} page={page} />
        </div>
    );
};

export default SingleConsultant;