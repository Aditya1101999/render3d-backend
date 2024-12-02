import express from 'express';
import cors from 'cors';
import generate3dRouter from './routes/generate3dRoute';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/server/v1', generate3dRouter);
const PORT = 4000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST , () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
