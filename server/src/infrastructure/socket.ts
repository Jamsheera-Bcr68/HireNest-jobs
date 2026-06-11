import { Server } from "socket.io";
let io:Server

export const setIo=(socketIO:Server)=>{
    io=socketIO
}

export const getIO=()=>{
    if(!io){
        throw new Error('Socket io not initialised')
    }

    return io
}