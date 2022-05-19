import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './connection';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public startServer(PORT: string | undefined = process.env.PORT): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
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
