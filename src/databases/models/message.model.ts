import mongoose, { Schema } from 'mongoose';
import { userSchema } from './user.model';
import { ObjectId } from 'mongodb';
import { MessageTypeConstant } from '../../constants/job-title.constant';

const messageSchema = new Schema({
    conversation: ObjectId,
    user: userSchema,
    type: {
        type:String,
        default: MessageTypeConstant.TEXT
    },  
    responseTo: ObjectId,
    body: String,
    isRead:{type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
});
const Message = mongoose.model('message', messageSchema);
 
export {
    messageSchema,
    Message
}