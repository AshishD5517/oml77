import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'Modern fintech website hero banner showing a happy Indian family celebrating loan approval in a bright living room, father holding house keys, mother using laptop showing loan approval screen, child excited, representing home loan success',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        fs.writeFileSync('./public/hero-family.png', Buffer.from(base64EncodeString, 'base64'));
        console.log('Image saved to ./public/hero-family.png');
      }
    }
  } catch (e) {
    console.error(e);
  }
}
generate();
