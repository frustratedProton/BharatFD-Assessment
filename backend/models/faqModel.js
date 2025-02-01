import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },

    answer: {
        type: String,
        required: true,
    },

    translations: {
        hi: {
            type: String,
        },
        bn: {
            type: String,
        },
    },
});

//
faqSchema.methods.getTranslatedText = (languageCode) => {
    return this.translations[languageCode] || this.question;
};

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
