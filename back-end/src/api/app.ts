import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectToDatabase from './connection';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../../../front-end/build')));
    this.app.use(cors());
    this.app.get('/', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../../front-end/build', 'index.html'));
    });
  }

  public startServer(PORT: string | undefined = process.env.PORT): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log('Server running on MondoDB'),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
