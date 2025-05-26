import express from 'express';
import cors from 'cors';
// import { initializeInterfaceLayer } from './interface/index.js';
import { initMongoDB } from './config/mongo_db_connections.js';
import authRoutes from './routes/authroutes.js';
import sellerRoutes from "./routes/sellerRoutes.js"
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


app.use(express.json());
app.use('/',authRoutes)

app.use('/seller', sellerRoutes);
initMongoDB()


const PORT = process.env.PORT || 5000;
// const HOST = '10.10.3.218'; 
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
