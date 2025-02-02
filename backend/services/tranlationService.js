import { translate } from '@vitalets/google-translate-api';
import { HttpProxyAgent } from 'http-proxy-agent';

const agent = new HttpProxyAgent('http://210.165.227.43:8080');

const translateContent = async ({ question, answer }, targetLang) => {
    try {
        const translatedQuestion = await translate(question, {
            to: targetLang,
            fetchOptions: { agent },
        });
        const translatedAnswer = await translate(answer, {
            to: targetLang,
            fetchOptions: { agent },
        });

        return {
            question: translatedQuestion.text,
            answer: translatedAnswer.text,
        };
    } catch (error) {
        console.error(`Translation error for ${targetLang}:`, error);
        return { question, answer };
    }
};

export default { translateContent };
