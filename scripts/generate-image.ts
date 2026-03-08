import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

async function generate() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = "Create a modern landing page hero image for a digital loan platform showing an Indian borrower and an Indian loan agent interacting professionally. The borrower can be a young Indian professional or small business owner discussing loan options with a friendly loan agent using a laptop or tablet. The scene should represent trust, financial support, and digital lending.";
    
    console.log("Generating image...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    let foundImage = false;
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const buffer = Buffer.from(base64EncodeString, 'base64');
        const outputPath = path.join(process.cwd(), 'public', 'hero-generated.png');
        fs.writeFileSync(outputPath, buffer);
        console.log("Image saved to", outputPath);
        foundImage = true;
        break;
      }
    }

    if (!foundImage) {
      console.error("No image data found in response");
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generate();
