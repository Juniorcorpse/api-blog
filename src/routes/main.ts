import { Router } from "express";
import * as mainController from '../controllers/main'

export const mainRouters = Router();

mainRouters.get('/ping', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

//mainRouters.get('/posts', mainController.all);
//mainRouters.get('/posts/:slug', mainController.post);
//mainRouters.get('/posts/:slug/related', mainController.related);
