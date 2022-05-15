import mongoose from 'mongoose';
import { User } from './databases/models/user.model';
import { Conversation } from './databases/models/conversation.model';
import ConversationService from './services/conversation.service';
require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/today-db-2');

// const service = new ConversationService();

// service.sendMessageToConversation("627e1fb712dc84a620e07fb2");
