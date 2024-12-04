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
exports.generate3D = generate3D;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const promptImprover_1 = require("./promptImprover");
function generate3D(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const refinedPrompt = yield (0, promptImprover_1.improvePrompt)(prompt);
        const payload = {
            key: process.env.STABLE_API_KEY,
            prompt: refinedPrompt,
            guidance_scale: 20,
            steps: 50,
            frame_size: 256,
            output_type: "ply"
        };
        try {
            const response = yield axios_1.default.post(process.env.STABLE_API_ENDPOINT, payload, { headers: config_1.config.headers });
            return response;
        }
        catch (error) {
            throw new Error(`Failed to generate 3D model: ${error.message}`);
        }
    });
}
