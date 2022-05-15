import { Request } from 'express';
import { Socket } from 'socket.io';

export interface RequestCustom extends Request {
    user?: any; 
}

export interface SocketCustom extends Socket {
    user?: any
}