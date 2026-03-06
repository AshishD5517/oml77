
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, RefreshCw } from 'lucide-react';

interface AIImageGeneratorProps {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ 
  prompt, 
  className = "", 
  aspectRatio = "16:9" 
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          },
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No image data found in response");
      }
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateImage();
  }, [prompt]);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}>
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-10">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-sm font-medium text-gray-600 animate-pulse">Generating your custom visual...</p>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-red-500 mb-4 font-medium">{error}</p>
          <button 
            onClick={generateImage}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt="AI Generated Visual" 
          className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Ready to generate</p>
        </div>
      )}
      
      {imageUrl && !loading && (
        <button 
          onClick={generateImage}
          className="absolute bottom-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg border border-white/20"
          title="Regenerate Image"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AIImageGenerator;
