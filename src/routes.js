const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const controllers = require('./app/controllers');
const validate = require('express-validation');
const validators = require('./app/validators');
const handle = require('express-async-handler');

const authMiddleware = require('./app/middlewares/auth');

const routes = new express.Router();
const upload = multer(uploadConfig);
//somente para testes
routes.delete('/deleteall', handle(controllers.PostController.deleteall))
routes.delete('/deleteallusers', handle(controllers.UserController.deleteall))

routes.post('/users', upload.single('avatar'), handle(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))
routes.use(authMiddleware)//apartir daqui precisa de token
/* USERS */
routes.put('/user/update', handle(controllers.UserController.update))
routes.get('/users', handle(controllers.UserController.index))
routes.get('/user/:id', handle(controllers.UserController.getuser))

/* POSTS */
routes.get('/posts', handle(controllers.PostController.index));
routes.put('/post/update', handle(controllers.PostController.update));
routes.post('/posts', upload.single('image'), controllers.PostController.store);
routes.delete('/posts/:id', controllers.PostController.destroy)
routes.get('/posts/profile/:id', controllers.PostController.getposts)

/* LIKE */

routes.get('/posts/liked', controllers.LikeController.index)
routes.post('/posts/:id/like', controllers.LikeController.store)

module.exports = routes;