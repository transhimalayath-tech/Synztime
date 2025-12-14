import { GoogleGenAI, Type } from "@google/genai";
import { AiResponse } from '../types';

// Initialize Gemini
const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateMeetingContent = async (
  topic: string,
  duration: number,
  userTime: string,
  userZone: string,
  clientTime: string,
  clientZone: string
): Promise<AiResponse | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    I am scheduling a meeting.
    Topic: ${topic}
    Duration: ${duration} minutes.
    
    My Time: ${userTime} (${userZone})
    Client Time: ${clientTime} (${clientZone})
    
    Please provide:
    1. A concise, professional meeting agenda with 3-5 bullet points suitable for this duration.
    2. A brief "Etiquette Tip" checking if this is a socially acceptable time for the client (e.g. is it too early/late?).
    
    Return the response in JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            agenda: { type: Type.STRING, description: "A markdown formatted list of agenda items." },
            etiquetteTip: { type: Type.STRING, description: "A friendly tip about the meeting time suitability." }
          },
          required: ["agenda", "etiquetteTip"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AiResponse;
    }
    return null;

  } catch (error) {
    console.error("Error generating meeting content:", error);
    return {
        agenda: "Could not generate agenda. Please try again.",
        etiquetteTip: "Could not analyze time settings."
    };
  }
};
