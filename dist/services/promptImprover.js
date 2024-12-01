"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.improvePrompt = improvePrompt;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
/**
 * Function to improve the provided prompt
 * @param {string} prompt - The existing prompt that needs to be improved.
 * @returns {Promise<string>} - The improved prompt.
 */
function improvePrompt(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield model.generateContent(`Improve the following prompt: "${prompt}"`);
            return result.response.text();
        }
        catch (error) {
            throw new Error(`Failed to improve prompt: ${error.message}`);
        }
    });
}
