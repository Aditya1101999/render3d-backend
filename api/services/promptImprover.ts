import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv'

dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Function to improve the provided prompt
 * @param {string} prompt - The existing prompt that needs to be improved.
 * @returns {Promise<string>} - The improved prompt.
 */
export async function improvePrompt(prompt: string): Promise<string> {
    try {
        const result = await model.generateContent(`Improve the following prompt: "${prompt}"`);

        return result.response.text();
    } catch (error) {
        throw new Error(`Failed to improve prompt: ${(error as Error).message}`);
    }
}
