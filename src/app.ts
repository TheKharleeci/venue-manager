import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import seedChannels from '@/utils/seed';
import ErrorMiddleware from '@/middleware/error.middleware';
import userRouter from '@/routes/user.router'
import roomRouter from '@/routes/room.router'

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseErrorHandling();
        this.routerConfig();
    }

    private initialiseMiddleware(): void {
            this.express.use(helmet());
            this.express.use(cors());
            this.express.use(morgan('dev'));
            this.express.use(express.json());
            this.express.use(express.urlencoded({ extended: false}));
            this.express.use(compression());
    
        }
    
    private initialiseErrorHandling(): void {
           this.express.use(ErrorMiddleware);
        }
    
    private initialiseDatabaseConnection(): void {
            const { MONGO_URI } = process.env;
            mongoose.set('strictQuery', false);
            mongoose.connect(`${MONGO_URI}`)
            .then( async () => {
                console.log(`Connected to mongo ${MONGO_URI} server`);
                await seedChannels();
            })
            .catch(err => console.error(`Could not connect to MongoDB. ${err}`));
        }
    private routerConfig() {
            this.express.use('/user', userRouter);
            this.express.use('/room', roomRouter);
        }
    
    public listen(): void {
            this.express.listen(this.port, () => {
                console.log(`app is listening on port ${this.port}`);
            });
        }
    }
    
export default App;
    