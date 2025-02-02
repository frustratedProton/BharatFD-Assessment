import express from 'express';
import { validateFaq } from '../middleware/validation.js';
import { createFaq, getFaq } from '../controllers/faqController.js';

const faqRouter = express.Router();

faqRouter.post('/faq', validateFaq, createFaq);
faqRouter.get('/faq', getFaq);

export default faqRouter;
