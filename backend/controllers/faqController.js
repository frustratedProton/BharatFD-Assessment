import FAQ from '../models/faqModel';

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
