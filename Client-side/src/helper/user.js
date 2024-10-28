import toast from "react-hot-toast"
import { api } from "../Components/axios/axios.instance";

export const updatUser = async (data) => {
    try {
        const res = await api.put(`/users/update/${user}`, data)
        return res
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
}