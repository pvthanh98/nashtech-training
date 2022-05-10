import express, { Application } from 'express';
import bodyParser from 'body-parser';
class App {
    public app: Application;
    public port: number;

    constructor(controllers: Array<any>, port: number){
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares = () => {
        this.app.use(bodyParser.json())
    }

    private initializeControllers = (controllers: Array<any>) => {
        controllers.forEach(controller=>{
            this.app.use(controller.router)
        })
    }    

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}


export default App;