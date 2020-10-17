import express, { json, urlencoded } from 'express';
import routers from './routes';
import errHandler from './middleware/error.middleware';
import authHandler from './middleware/auth.middleware';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routerSetup();
    }

    private config(): void {
        this.app.use(json);
        this.app.use(urlencoded({ extended: false }));
        this.app.use(authHandler);
        this.app.use(errHandler);
    }

    private routerSetup() {
        for (const route of routers) {
            this.app.use(route.getPrefix(), route.getRouter());
        }
    }
}

export default new App().app;
