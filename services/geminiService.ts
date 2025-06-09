import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, API_KEY_ERROR_MESSAGE } from '../constants';

const getApiKey = (): string => {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error(API_KEY_ERROR_MESSAGE);
    throw new Error(API_KEY_ERROR_MESSAGE);
  }
  return apiKey;
};

let ai: GoogleGenAI | null = null;

const getGenAIClient = (): GoogleGenAI => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: getApiKey() });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `You are an AI Prompt Engineering Co-Pilot. Your mission is to take a user's raw, potentially vague input and meticulously transform it into a comprehensive, crystal-clear, and highly effective prompt designed for advanced Large Language Models (LLMs) like GPT-4, Claude 3, or Gemini itself. The resulting prompt should be optimized to elicit the most accurate, detailed, and contextually relevant response from the target LLM.

Consider the following when crafting the enhanced prompt:
1.  **Clarify Intent:** Identify the user's core objective. If ambiguous, make reasonable assumptions or structure the prompt to ask clarifying questions within its context.
2.  **Add Context:** Incorporate relevant background information that the LLM would need.
3.  **Define Persona/Role (if applicable):** Specify the role the LLM should adopt (e.g., 'expert historian', 'creative storyteller', 'software architect').
4.  **Specify Task:** Clearly outline the specific task(s) the LLM needs to perform.
5.  **Detail Output Format:** Define the desired structure, length, style, or format of the LLM's response (e.g., 'a bulleted list', 'a 500-word blog post', 'a JSON object with keys X, Y, Z').
6.  **Include Constraints/Boundaries:** Set any limitations or specific instructions (e.g., 'avoid technical jargon', 'focus on solutions from the last 5 years', 'provide 3 distinct options').
7.  **Provide Examples (if helpful):** Illustrate the desired input/output style with brief examples if it aids clarity.
8.  **Tone & Style:** Suggest a tone (e.g., formal, conversational, persuasive).
9.  **Action-Oriented Language:** Use clear verbs and actionable instructions.
10. **Completeness:** Ensure the prompt contains all necessary information for the LLM to succeed without needing further clarification on the core request.

The final output should ONLY be the enhanced prompt itself, formatted as plain text, ready to be copied and pasted. Do not include any conversational preamble or postamble.
`;

export const enhancePromptWithGemini = async (rawMessage: string): Promise<string> => {
  try {
    const client = getGenAIClient();
    const userPrompt = `User's raw idea: "${rawMessage}"\n\nTransform this idea into an enhanced LLM prompt based on the instructions provided.`;

    const response: GenerateContentResponse = await client.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // A bit of creativity but still focused
        topP: 0.95,
        topK: 40,
        // No thinkingConfig to use default (thinking enabled for higher quality)
      }
    });
    
    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI. The prompt might be too short or unclear.");
    }
    return text.trim();

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message && error.message.includes('API_KEY')) {
        throw error; // rethrow API key error
    }
    if (error.message && error.message.toLowerCase().includes('quota')) {
         throw new Error("API quota exceeded. Please check your Google AI Studio account.");
    }
    if (error.message && error.message.toLowerCase().includes('candidate was blocked')) {
         throw new Error("The generated content was blocked due to safety settings. Try rephrasing your input.");
    }
    throw new Error(`AI service failed: ${error.message || 'Unknown error'}`);
  }
};
