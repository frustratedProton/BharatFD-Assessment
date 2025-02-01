import express from 'express';
import { getFaq } from '../controllers/faqController';

const faqRouter = express.Router();

faqRouter.get('/', getFaq);

export default faqRouter;
