import express from 'express';
import cardController from '../controllers/cardController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth(false, false, true), cardController.createCard); // Only business users can create cards
router.get('/', auth(false, false), cardController.getAllCards); // Everyone can get all cards
router.get('/my-cards', auth(false, false, false), cardController.getMyCards); // Registered users only
router.get('/:id', auth(false, false), cardController.getCardById); // Everyone can get card by ID
router.put('/:id', auth(false, false, true), cardController.updateCard); // Only the user who created the card
router.patch('/:id', auth(false, true), cardController.patchCard); // Registered users only
router.delete('/:id', auth(false, false , true ), cardController.deleteCard); // Registered users and admin can delete

export default router;
