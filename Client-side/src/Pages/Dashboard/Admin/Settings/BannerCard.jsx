import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { imageUrl } from "../../../../Components/Shared/imageUrl";
import { api } from "../../../../Components/axios/axios.instance";
import toast from "react-hot-toast";

export function BannerCard({ banner, refetch }) {
    const deleteBanner = async () => {
        try {

            const response = await api.delete(`/performer/${banner?._id}`,);
            toast.success(response?.data?.message);
            refetch();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <Card className="mt-6 w-full p-5">
            <img
                src={imageUrl(banner?.image)}
                className="max-h-[300px] w-auto object-cover"
                alt="card-image"
            />
            <h1 className="text-lg mt-2">Name : {banner?.name}</h1>
            <h1 className="text-lg mt-2">UserId : {banner?.user?.userId}</h1>

            <CardFooter className="pt-4 px-3 pb-3">
                <button onClick={deleteBanner} className="btn btn-error text-white btn-sm">Delete</button>
            </CardFooter>
        </Card>
    );
}