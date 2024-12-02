import prisma from '../db';

interface PromptData {
  prompt: string;
  output: string;
}

export async function savePrompt(data: PromptData): Promise<{ id: number; prompt: string; output: string } | null> {
  try {
    const existingPrompt = await prisma.prompt.findUnique({
      where: { prompt: data.prompt },
    });
    if (existingPrompt) {
      return existingPrompt;
    }
  

    const newPrompt = await prisma.prompt.create({
      data: {
        prompt: data.prompt,
        output: data.output, 
      },
    });

    return newPrompt;
  } catch (error) {
    console.error('Error saving prompt:', error);
    return null;
  }
}
