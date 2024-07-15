import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', userController.registerUser); // Anyone can register
router.post('/login', userController.loginUser); // Anyone can login
router.get('/', auth(true, false), userController.getAllUsers); // Admin only
router.get('/:id', auth(false, true), userController.getUserById); // Self or Admin
router.put('/:id', auth(false, true), userController.updateUser); // Registered user only
router.patch('/:id', auth(false, true), userController.patchUser); // Registered user only
router.delete('/:id', auth(false, true), userController.deleteUser); // Admin or Self

export default router;
