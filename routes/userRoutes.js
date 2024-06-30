import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', auth(true), userController.getAllUsers);
router.get('/:id', auth(true), userController.getUserById);
router.put('/:id', auth(true), userController.updateUser);
router.delete('/:id', auth(true), userController.deleteUser);

export default router;
