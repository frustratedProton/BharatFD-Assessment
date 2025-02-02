import express from 'express';
import { createFaq, getFaq } from '../controllers/faqController.js';

const faqRouter = express.Router();

faqRouter.post('/faq', createFaq);
faqRouter.get('/faq', getFaq);

export default faqRouter;
