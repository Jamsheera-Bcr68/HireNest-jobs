import axiosInstance from "../../libraries/axios";


export const adminService={
    async logout(){
const res=await axiosInstance.post('/auth/logout',
        {},
        { withCredentials: true })
    
    return res.data
}
}