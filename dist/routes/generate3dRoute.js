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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generate3D_1 = require("../services/generate3D");
const promptService_1 = require("../services/promptService");
const generate3dRouter = express_1.default.Router();
generate3dRouter.post('/generate-3d', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required for the generation of 3D Model' });
    }
    try {
        const response = yield (0, generate3D_1.generate3D)(prompt);
        if (response.status === 200) {
            console.log(response);
            const outputUrl = response.data.output[0];
            console.log(outputUrl);
            const savedPrompt = yield (0, promptService_1.savePrompt)({ prompt, output: outputUrl });
            console.log(savedPrompt);
            if (savedPrompt) {
                return res.json({
                    status: "success",
                    id: savedPrompt.id,
                    prompt: savedPrompt.prompt,
                    output: savedPrompt.output
                });
            }
        }
        else {
            return res.status(response.status).json({ error: 'Failed to generate 3D Model' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
exports.default = generate3dRouter;
