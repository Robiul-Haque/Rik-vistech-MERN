import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { api } from "../../../Components/axios/axios.instance";
import Loader from "../../../Components/Shared/Loader";
import { Card } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeftAlt } from "@fortawesome/free-solid-svg-icons";
export default function Notice() {
    const { data: users, isLoading } = useQuery({
        queryKey: ["notice"],
        queryFn: async () => {
            const response = await api.get("/notice");
            return response.data;
        }
    })
    const { settings } = useSelector((state) => state.user);
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full mb-10">
            <h1 className="text-center text-3xl font-semibold mt-10">Notification</h1>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{ delay: 5000 }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className=" mt-7 w-full">
                {
                    users?.map(user => {
                        return (
                            <SwiperSlide key={user?._id} className="w-full">
                                <Card className="w-full lg:px-10 px-5 bg-primary h-[220px] pt-5 overflow-y-auto relative flex justify-center items-center">
                                    <FontAwesomeIcon icon={faQuoteLeftAlt}
                                        className="text-5xl text-blue-900 absolute left-20 top-10"
                                    />
                                    <p className="text-white z-20 text-center">
                                        {(user?.text).slice(0, 350)}
                                    </p>
                                </Card>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    );
}
