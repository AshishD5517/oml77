import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A happy Indian middle-class family sitting together at a table celebrating loan approval, father holding a smartphone showing a green screen with "Loan Approved" and a checkmark, a laptop on the table also displaying "Loan Approved", mother smiling beside him, two children cheering happily, small house model and toy car placed on the table symbolizing home and car loan, bright modern living room background, natural lighting, professional fintech advertisement style, realistic photography, sharp focus, high resolution, clean composition, website landing page hero image',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      }
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      const dir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(path.join(dir, 'hero-image.png'), Buffer.from(base64EncodeString, 'base64'));
      console.log('Image saved to public/hero-image.png');
    }
  }
}

generate().catch(console.error);
