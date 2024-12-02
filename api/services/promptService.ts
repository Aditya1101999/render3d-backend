import prisma from '../db';

interface PromptData {
  prompt: string;
  output: string[];
}

export async function savePrompt(data: PromptData): Promise<{ id: number; prompt: string; output: string } | null> {
  try {
    if (!Array.isArray(data.output) || data.output.length === 0) {
      throw new Error('Output must be a non-empty array of strings.');
  }  
    const existingPrompt = await prisma.prompt.findUnique({
      where: { prompt: data.prompt },
    });
    if (existingPrompt) {
      return existingPrompt;
    }
    if (!Array.isArray(data.output) || data.output.length === 0) {
      throw new Error('Output must be a non-empty array of strings.');
  }
  

    const newPrompt = await prisma.prompt.create({
      data: {
        prompt: data.prompt,
        output: data.output[0], 
      },
    });

    return newPrompt;
  } catch (error) {
    console.error('Error saving prompt:', error);
    return null;
  }
}
