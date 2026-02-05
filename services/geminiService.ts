
import { GoogleGenAI, Type } from "@google/genai";
import { HSKLevel, MaterialType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TUTOR_NAME = "Suun Yi Yang";
const SYSTEM_INSTRUCTION = `Anda adalah ${TUTOR_NAME}, seorang tutor Bahasa Mandarin profesional asal Indonesia yang mengenakan jilbab resmi. 
Gunakan Bahasa Indonesia yang sopan, ramah, dan sangat menyemangati (encouraging). 
Tugas Anda adalah membantu siswa Indonesia menguasai HSK tingkat 1 sampai 4.
Setiap penjelasan harus mencakup Hanzi, Pinyin, dan Arti dalam Bahasa Indonesia.`;

export const getLessonContent = async (level: HSKLevel, type: MaterialType) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatkan materi pembelajaran Bahasa Mandarin untuk HSK level ${level} dengan fokus pada kategori ${type}.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          translation: { type: Type.STRING },
          content: { type: Type.STRING },
          tips: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "pinyin", "translation", "content", "tips"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateQuizQuestions = async (level: HSKLevel, count: number = 5) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatkan ${count} soal pilihan ganda untuk latihan HSK level ${level}. Sertakan Hanzi, Pinyin, dan terjemahan.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            pinyin: { type: Type.STRING },
            translation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};
