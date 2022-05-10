import App from './app';
import AnimalController from './controllers/animal.controller';
import HumanController from './controllers/human.controller';
require('dotenv').config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const app = new App(
    [
        new HumanController(),
        new AnimalController()
    ],
    PORT
);

app.listen();


