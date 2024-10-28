import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { useSelector } from "react-redux";
import { imageUrl } from "../../../../Components/Shared/imageUrl";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Components/Shared/Loader";
import { api } from "../../../../Components/axios/axios.instance";
import { Card } from "@material-tailwind/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
export default function Slider({ type }) {
    const { data: users, isLoading } = useQuery({
        queryKey: ["best performers", type],
        queryFn: async () => {
            const response = await api.get("/performer?type=" + type);
            return response.data;
        }
    })
    const { settings } = useSelector((state) => state.user);
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full mb-10">
            <h1 className="text-center text-3xl font-semibold mt-10"> <span className="capitalize">
                {type}
            </span> Best Performers</h1>
            <Swiper
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
                spaceBetween={30}
                autoplay={{ delay: 2000 }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className=" mt-7 w-full">
                {
                    users?.map(user => {
                        return (
                            <SwiperSlide key={user?._id} className="w-full py-5">
                                <Card className="w-full p-4 text-gray-800">
                                    <div style={{
                                        backgroundImage: `url('${imageUrl(user?.image)}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "370px",
                                    }}
                                        className="w-full bg-blue-gray-100 rounded-md"
                                    />
                                    <h1 className="text-xl text-center mt-2 font-medium text-pretty text-primary">{user?.name}</h1>
                                    <h3 className="text-center mt-1 uppercase">Student</h3>
                                    <h3 className="text-center mt-1 uppercase">
                                        Good Work
                                    </h3>
                                    <hr className="my-2" />
                                    <h3 className="text-center mt-1 font-semibold uppercase">
                                        {user?.user?.userId}
                                    </h3>
                                </Card>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    );
}
