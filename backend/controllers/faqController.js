import FAQ from '../models/faqModel.js';
import tranlationService from '../services/tranlationService.js';

export const getFaq = async (req, res) => {
    // fallback to English if translation is unavailable
    const languageCode = req.query.languageCode || 'en';
    try {
        const faqs = await FAQ.find();
        const translatedFaqs = faqs.map((faq) => ({
            id: faq._id,
            ...faq.getTranslatedText(languageCode),
        }));

        return res.json(translatedFaqs);
    } catch (error) {
        res.status(500).json({
            error: `Failed to fetch FAQs ${error.message}`,
        });
    }
};

export const createFaq = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const newFaq = new FAQ({
            question,
            answer,
            translations: {},
        });

        // currently only hindi and bangla support
        const supportedLangs = ['hi', 'bn'];
        const translation = {};

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        for (const lang of supportedLangs) {
            const tled = await tranlationService.translateContent(
                {
                    question,
                    answer,
                },
                lang
            );

            translation[lang] = {
                question: tled.question,
                answer: tled.answer,
            };
            await sleep(1000);
        }

        newFaq.translations = translation;
        await newFaq.save();
        res.status(500).json(newFaq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
