import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import { messageSchema } from './message.model';
import { userSchema } from './user.model';

const conversationSchema: Schema = new Schema({
    name: { type: String, lowercase: true},
    topic: String,
    users: [ObjectId],
    messages: [messageSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('conversation', conversationSchema);
export {
    conversationSchema,
    Conversation
}