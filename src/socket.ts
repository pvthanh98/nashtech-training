import { Server, Socket } from "socket.io";
import { Message } from "./databases/models/message.model";
import { User } from "./databases/models/user.model";
import { SocketCustom } from "./interfaces/common.interface";
import { getUserSocketIds } from "./utils/conversation.util";
const jwt = require('jsonwebtoken');

class SocketServer {
    private io;
    constructor(httpServer:any){
        this.io = new Server(httpServer,{
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        this.initializeMiddlewares();
    }


    initializeMiddlewares = () => {
        this.io.use((socket: SocketCustom, next) => {
            if(!socket.handshake.auth.token)
                socket.disconnect();
            jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET, async (err: any, decoded:any)=>{
                if (!err) {
                    console.log("SOCKET AUTHENTICATED");
                    socket.user = decoded;
                    await User.findByIdAndUpdate(decoded.sub,{
                        socketId:socket.id
                    })
                    next();
                } else {
                    socket.disconnect();
                    console.log("SOCKET DISCONNECTED");
                }
            });
        })
    }

    connectionEvent = () => {
        this.io.on("connection", (socket: SocketCustom) => {
            socket.emit('onConnectionSuccess', `Connected ${socket.id}`)
            socket.on("sendPrivateMessage", async (data)=>{
                const { conversationId, message } = data;
                const user = await User.findById(socket.user.sub)
                const socketIds = await getUserSocketIds(conversationId);

                console.log(socketIds)
                this.io.to(socketIds).emit("severSendMessage", {
                    conversation: conversationId,
                    user: user,
                    responseTo: message.responseTo,
                    body: message.body,
                    type: message.type,
                    isRead: false,
                    created_at: new Date(),
                });
                /** Save message to DB */
                const messageDB = new Message({
                    conversation: conversationId,
                    user: user,
                    responseTo: message.responseTo,
                    body: message.body,
                    type: message.type,
                    isRead:false,
                    created_at: new Date(),
                });

                messageDB.save();
            });

            
        })
    }

    loadSocketEvent = () => {
        this.connectionEvent();
    }


}


export default SocketServer;