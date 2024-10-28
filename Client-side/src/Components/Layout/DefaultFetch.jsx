/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { api } from '../axios/axios.instance';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setSettings, setWallet } from '../../redux/features/user/userSlice';
import Cookies from 'js-cookie';

const DefaultFetch = () => {
    const dispatch = useDispatch();
    const { refresh } = useSelector((state) => state.user)
    useEffect(() => {
        (
            async () => {
                try {
                    const token = Cookies.get('accessToken')
                    if (!token) {
                        return dispatch(setCurrentUser(null));
                    }
                    const response = await api.post('/users/current-user', {})
                   
                    const settings = await api.get(`/users/setting/${response.data._id}`)
                    dispatch(setSettings(settings.data));
                    dispatch(setCurrentUser(response.data));

                } catch (error) {
                    console.error(error);
                }
            }
        )()
    }, [refresh]);
    return (
        <div>

        </div>
    );
};

export default DefaultFetch;