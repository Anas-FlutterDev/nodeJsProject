// cardRoutes.js

import express from 'express';
const router = express.Router();
import cardController from '../controllers/cardController.js'; // assuming .mjs extension for ES modules
import  auth  from '../middlewares/auth.js'; // assuming .mjs extension for ES modules

router.post('/', cardController.createCard);
router.get('/',auth(true), cardController.getAllCards);
router.get('/:id',cardController.getCardById);
router.put('/:id', auth(true),rdController.updateCard);
router.delete('/:id', auth(true), cardController.deleteCard);

export default router;
