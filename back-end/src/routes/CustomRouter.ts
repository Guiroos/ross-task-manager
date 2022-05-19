import { Router } from 'express';
import Controller from '../controllers';

export default class CustomRouter<T> {
  public router: Router;

  constructor() { this.router = Router(); }

  public addRoute(controller: Controller<T>, route: string = controller.route) {
    this.router.post(route, controller.create);
  }
}
