import * as express from 'express';
import * as cors from 'cors';
import {config} from './controllers/routeConfig'
import * as ProductsHandlers from './routesHendlers/ProductsHendlers'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('./src/video'));
//app.use('/products/:id', ProductsHandlers.productGetSpecificHandler );
//app.use('/products/', ProductsHandlers.productPostHandler );
Object.keys(config).forEach((k) => {
    const routeConfig = config[k];
    app.use(routeConfig.prefix, routeConfig.router);
  });


export { app };
