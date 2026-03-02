// export type BackendError={
//     statusCode:number,
//     message:string,
//     success:boolean
// }
// export const normalizeError=(error:any)=>{
//     const response=error.response
//     return {
//         statusCode:response?.status??500,
//         message:response?.data?.message??'Some thing went wrong',
//         success:response?.success??false
//     }
// }
