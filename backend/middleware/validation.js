import { body, validationResult } from 'express-validator';

export const validateFaq = [
    body('question')
        .notEmpty()
        .withMessage('Question is required')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Question must be at least 10 characters long'),

    body('answer')
        .notEmpty()
        .withMessage('Answer is required')
        .trim()
        .isLength({ min: 20 })
        .withMessage('Answer must be at least 20 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
