import App from './app';
import AnimalController from './controllers/animal.controller';
import HumanController from './controllers/human.controller';
import mongoose from 'mongoose';
import AuthController from './controllers/auth.controller';
import UserAdminController from './controllers/admin/user.admin.controller';
import SocketServer from './socket';
import ConversationController from './controllers/conversation.controller';
import UserController from './controllers/user.controller';
import MessageController from './controllers/message.controller';
import UploadController from './controllers/upload.controller';
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/today-db-2')
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const app = new App(
    [
        /**Admin Conrollers */
        new UserAdminController(),

        /** Normal Controller */
        new HumanController(),
        new AnimalController(),
        new AuthController(),
        new ConversationController(),
        new UserController(),
        new MessageController(),
        new UploadController()
    ],
    PORT
);

const socketServer = new SocketServer(app.httpServer);
socketServer.loadSocketEvent();

app.listen();


