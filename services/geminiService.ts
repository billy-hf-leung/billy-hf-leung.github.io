import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AITimerResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Define the schema for the expected response
const timerSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    durationSeconds: {
      type: Type.INTEGER,
      description: "The recommended duration in seconds for the requested task.",
    },
    label: {
      type: Type.STRING,
      description: "A short, concise label for the timer (max 20 chars).",
    },
    confidence: {
      type: Type.NUMBER,
      description: "A value between 0 and 1 indicating confidence in the time estimation.",
    }
  },
  required: ["durationSeconds", "label", "confidence"],
};

export const suggestTimerConfig = async (userPrompt: string): Promise<AITimerResponse | null> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // We use a lighter model for quick JSON tasks
    const modelId = "gemini-2.5-flash"; 

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Suggest a timer duration for: "${userPrompt}". 
                 If the request is vague, make a best guess (e.g. 'egg' -> 600s). 
                 If the request is absurd or impossible to time, return 0 seconds.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: timerSchema,
        temperature: 0.3, // Low temperature for more deterministic/factual answers
      },
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text) as AITimerResponse;
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
