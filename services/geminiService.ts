import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.NUMBER,
      description: "A realistic aesthetic score out of 10 based on symmetry, harmony, and grooming. Be strict but fair.",
    },
    potentialScore: {
      type: Type.NUMBER,
      description: "The potential score out of 10 if the user follows all advice.",
    },
    summary: {
      type: Type.STRING,
      description: "A short, professional summary of the person's appearance.",
    },
    faceShape: {
      type: Type.STRING,
      description: "The estimated face shape (e.g., Oval, Square, Heart).",
    },
    skinQuality: {
      type: Type.STRING,
      description: "Assessment of skin health and texture.",
    },
    bestFeature: {
      type: Type.STRING,
      description: "The person's most attractive feature.",
    },
    features: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          feature: { type: Type.STRING, description: "Name of the feature (e.g., Eyes, Jawline, Hair)" },
          score: { type: Type.NUMBER, description: "Score out of 10 for this specific feature" },
          comment: { type: Type.STRING, description: "Brief analysis of this feature" },
        },
        required: ["feature", "score", "comment"],
      },
    },
    improvements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3-5 specific, actionable steps to improve appearance (grooming, style, skincare, fitness).",
    },
  },
  required: ["overallScore", "potentialScore", "summary", "faceShape", "skinQuality", "features", "improvements", "bestFeature"],
};

const getLanguageName = (lang: Language): string => {
  switch (lang) {
    case 'ar': return 'Arabic';
    case 'fr': return 'French';
    case 'es': return 'Spanish';
    case 'ja': return 'Japanese';
    default: return 'English';
  }
};

export const analyzeImage = async (base64Image: string, mimeType: string, language: Language): Promise<AnalysisResult> => {
  const languageName = getLanguageName(language);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: `Act as a world-class aesthetic consultant, dermatologist, and stylist. 
            Analyze the person in this image. 
            Provide a realistic, objective rating of their facial aesthetics, grooming, and style.
            Focus on constructive, actionable advice. 
            Do not be overly flattering; be honest but polite. 
            
            IMPORTANT: Return the response in ${languageName} language.
            Translate the summary, faceShape, skinQuality, bestFeature, feature comments, and improvements into ${languageName}.
            
            Identify their face shape, skin quality, and best features.
            Suggest specific improvements (e.g., hairstyle changes, skincare ingredients, beard shaping, makeup tips, fashion advice).`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: `You are Aesthetica, a high-end beauty and style AI consultant. Your tone is professional, clinical, yet encouraging. You must communicate in ${languageName}.`,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
