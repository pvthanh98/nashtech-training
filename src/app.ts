import express, { Application } from 'express';
import { createServer } from "http";
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
const cors = require("cors");

class App {
    public app: Application;
    public port: number;
    public httpServer;

    constructor(controllers: Array<any>, port: number) {
        this.app = express();
        this.port = port;
        this.httpServer = createServer(this.app);
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares = () => {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use('/public',express.static(path.join(__dirname,'..','uploads')))
    }

    private initializeControllers = (controllers: Array<any>) => {
        controllers.forEach(controller => {
            this.app.use(controller.router)
        })
    }

    public listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}


export default App;