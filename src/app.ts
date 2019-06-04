import * as express from 'express';
import * as cors from 'cors';
import {setup} from './controllers/controllers'
import * as ProductsHandlers from './routes/ProductsHendlers'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('./src/video'));
//app.use('/products/:id', ProductsHandlers.productGetSpecificHandler );
//app.use('/products/', ProductsHandlers.productPostHandler );

setup(app);

export { app };
