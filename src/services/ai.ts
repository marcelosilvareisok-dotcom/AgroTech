import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini API
// O AI Studio injeta a chave automaticamente no process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeProductImage(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/jpeg'
          }
        },
        "Analise esta imagem de um produto. Retorne um JSON com: name (nome do produto), category (uma destas: Sementes, Fertilizantes, Equipamentos, Defensivos), price (preço estimado em número, ex: 150.50), description (descrição curta do produto)."
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { type: Type.STRING },
            price: { type: Type.NUMBER },
            description: { type: Type.STRING }
          },
          required: ["name", "category", "price", "description"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro ao analisar produto:", error);
    throw error;
  }
}

export async function analyzeCropImage(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/jpeg'
          }
        },
        "Analise esta imagem de uma plantação, folha ou praga. Retorne um JSON com: name (nome da cultura ou praga identificada), status (Saudável, Atenção, ou Colheita), expectedYield (estimativa de produtividade em número ou 0 se não aplicável), recommendations (o que fazer, descrição curta)."
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            status: { type: Type.STRING },
            expectedYield: { type: Type.NUMBER },
            recommendations: { type: Type.STRING }
          },
          required: ["name", "status", "expectedYield", "recommendations"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Erro ao analisar plantação:", error);
    throw error;
  }
}
