import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.post('/registration',
  body('username').isLength({ min: 3, max: 32 }),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/getInitialState/:userId', authMiddleware, UserController.getInitialState);

export default router;
