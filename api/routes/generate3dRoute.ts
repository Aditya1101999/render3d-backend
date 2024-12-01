import express from 'express'; 
import { generate3D } from '../services/generate3D';
import { savePrompt } from '../services/promptService';

const generate3dRouter = express.Router();

generate3dRouter.post('/generate-3d', async (req,res): Promise<any> => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required for the generation of 3D Model' });
    }

    try {
        const response = await generate3D(prompt);
        if (response.status === 200) {
            const outputUrl = response.data.output;

            const savedPrompt = await savePrompt({ prompt, output: outputUrl });

            if (savedPrompt) {
                return res.json({
                    status: "success",
                    id: savedPrompt.id,
                    prompt: savedPrompt.prompt,
                    output: savedPrompt.output
                });
            }
        } else {
            return res.status(response.status).json({ error: 'Failed to generate 3D Model' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

export default generate3dRouter;
