import mongoose from "mongoose";
import { Conversation } from "../databases/models/conversation.model";
import { User } from '../databases/models/user.model';
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/today-db-2');

/**
 * Get user socket IDS from conversations
 * @param conversationId 
 * @returns 
 */
const getUserSocketIds = async (conversationId: string): Promise<any> => {
    const conversation = await Conversation.findById(conversationId);
    if (conversation) {
        const users = await User.find({
            _id: {
                $in: conversation.users
            }
        }).select("socketId");
        const socketIds: any = []
        for (const user of users){
            if (user.socketId) socketIds.push(user.socketId)
        }

        return socketIds
    }
    return [];
}

export {
    getUserSocketIds
}
