// cardRoutes.js

import express from 'express';
const router = express.Router();
import cardController from '../controllers/cardController.js'; // assuming .mjs extension for ES modules
import  auth  from '../middlewares/auth.js'; // assuming .mjs extension for ES modules

router.post('/', auth, cardController.createCard);
router.get('/', cardController.getAllCards);
router.get('/:id',cardController.getCardById);
router.put('/:id', auth,cardController.updateCard);
router.delete('/:id', auth, cardController.deleteCard);

export default router;
