import { GoogleGenAI, Type, SchemaType } from "@google/genai";

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface TintRecommendation {
  type: string;
  percentage: string;
  reasoning: string;
  estimatedCost: string;
}

export const getTintRecommendation = async (
  userPreferences: string,
  vehicleType: string
): Promise<TintRecommendation | null> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      User Vehicle: ${vehicleType}
      User Preferences: ${userPreferences}
      
      You are an expert automotive window tint consultant for a premium shop called SDTINT.
      Based on the user's vehicle and preferences (e.g., privacy, heat rejection, aesthetics, night visibility),
      recommend the best specific tint product (e.g., Nano-Ceramic, Carbon, Dyed) and VLT percentage (5%, 20%, 35%, 50%, 70%).
      
      Provide a concise reasoning and an estimated price range for a full car tint job (Standard Premium Pricing).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, description: "Recommended film type (e.g. Nano-Ceramic)" },
            percentage: { type: Type.STRING, description: "Recommended VLT percentage" },
            reasoning: { type: Type.STRING, description: "Short explanation why this fits the user" },
            estimatedCost: { type: Type.STRING, description: "Estimated price range (e.g. $400 - $600)" }
          },
          required: ["type", "percentage", "reasoning", "estimatedCost"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as TintRecommendation;

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
};