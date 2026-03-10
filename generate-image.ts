import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A smiling Indian woman looking at her smartphone, wearing a light patterned shirt, isolated on a clean white background, professional studio lighting, portrait photography.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });
    
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        fs.writeFileSync(path.join(publicDir, 'woman-phone.png'), Buffer.from(base64EncodeString, 'base64'));
        console.log('Image saved to ./public/woman-phone.png');
      }
    }
  } catch (e) {
    console.error(e);
  }
}
generate();
