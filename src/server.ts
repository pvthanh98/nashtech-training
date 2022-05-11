import App from './app';
import AnimalController from './controllers/animal.controller';
import HumanController from './controllers/human.controller';
import mongoose from 'mongoose';
import AuthController from './controllers/auth.controller';
import UserAdminController from './controllers/admin/user.admin.controller';
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/nashtech-training')
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const app = new App(
    [
        /**Admin Conrollers */
        new UserAdminController(),

        /** Normal Controller */
        new HumanController(),
        new AnimalController(),
        new AuthController(),
    ],
    PORT
);

app.listen();


