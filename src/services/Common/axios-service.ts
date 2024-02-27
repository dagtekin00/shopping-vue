/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE } from "@/config/settings"
import router from "@/router"
import { useToast } from "vue-toast-notification"
import axios from "axios"

const toast = useToast()

const axiosConf = axios.create({ baseURL: API_BASE })
axiosConf.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem("token") || ""
        if (userToken !== "") {
            if (config.headers) {
                config.headers["Authorization"] = `Bearer ${userToken}`
            }
        }
        return config
    },
    function (error) {
        console.log("REQ ERROR ", error)
    }
)

axiosConf.interceptors.response.use(
    (response: any) => {
        return response
    },
    (error: any) => {
        if (error.name === "AxiosError" && error.message !== "Request failed with status code 400") {
            toast.clear()
            toast.warning("Tekrar giriş yapmanız gerekmekte")
            localStorage.removeItem("token")
            router.push({ path: "/login" })
            return Promise.reject(error)
        }
    }
)

export default axiosConf
