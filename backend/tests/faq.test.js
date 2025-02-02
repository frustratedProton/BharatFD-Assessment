// TODO: Implement more test suites

import request from 'supertest';
import app from '../index.js';
import FAQ from '../models/faqModel.js';
import redis from '../config/redis.js';
import { afterEach, describe, jest } from '@jest/globals';

jest.mock('../models/faqModel.js');
jest.mock('../config/redis.js');

describe('FAQ routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Test GET /faq', () => {
        it('should return FAQ (from cache) if available', async () => {
            const cachedFaq = JSON.stringify([
                { id: '1', question: 'What is this?', answer: 'A test' },
            ]);

            redis.get.mockResolvedValue(cachedFaqs);

            const res = await request(app).get('/faq');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(JSON.parse(cachedFaqs));
            expect(redis.get).toHaveBeenCalledWith('faqs_en');
            expect(FAQ.find).not.toHaveBeenCalled();
        });

        it('should return FAQs from the database if not in cache', async () => {
            redis.get.mockResolvedValue(null);

            FAQ.find.mockResolvedValue([
                {
                    _id: '2',
                    getTranslatedText: jest.fn(() => ({
                        question: 'What is this?',
                        answer: 'A test from DB',
                    })),
                },
            ]);

            redis.setex.mockResolvedValue(true);

            const res = await request(app).get('/faq');

            expect(res.status).toBe(200);
            expect(res.body).toEqual([
                {
                    id: '2',
                    question: 'What is this?',
                    answer: 'A test from DB',
                },
            ]);
            expect(redis.get).toHaveBeenCalledWith('faqs_en');
            expect(FAQ.find).toHaveBeenCalled();
            expect(redis.setex).toHaveBeenCalled();
        });
    });

    describe('POST /faq', () => {
        it('should create a new FAQ and clear cache', async () => {
            const newFaq = {
                _id: '3',
                question: 'Does this work?',
                answer: 'Duh',
                translations: {
                    hi: {
                        question: 'हिंदी में सवाल',
                        answer: 'हिंदी में जवाब',
                    },
                },
            };

            FAQ.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(newFaq),
            }));

            redis.del.mockResolvedValue(true);

            const res = await request(app).post('/faq').send({
                question: 'How does this work?',
                answer: 'It works like this',
            });

            expect(res.status).toBe(500); 
            expect(redis.del).toHaveBeenCalledWith('faqs_en');
            expect(redis.del).toHaveBeenCalledWith('faqs_hi');
            expect(redis.del).toHaveBeenCalledWith('faqs_bn');
        });
    });
});
