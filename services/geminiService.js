import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      gameName: { type: Type.STRING, description: "The name of the game." },
      provider: { type: Type.STRING, description: "The game provider or studio." },
      theme: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of primary themes for the game (e.g., Egypt, Buffalo, Mythology)."
      },
      features: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of special game features (e.g., Megaways, Free Spins, Cash Collect, Hold and Win)."
      },
      volatility: { type: Type.INTEGER, description: "The game's volatility on a scale from 1 to 8 (e.g., Low=2, Medium=4, High=8)." },
      rtp: { type: Type.STRING, description: "The game's Return to Player (RTP) as a percentage string (e.g., '96.5%')." },
      lines: { type: Type.STRING, description: "The number of paylines or ways to win as a string (e.g., '20', '243', '117649'). For Cluster Pays, use 'Cluster Pays'." },
      reels: { type: Type.STRING, description: "The reel configuration (e.g., '5x3', '6'). For non-standard layouts like 'Cluster Pays', use that description." },
    },
    required: ["gameName", "provider", "theme", "features", "volatility", "rtp", "lines", "reels"]
  }
};


export const fetchGameData = async (gameList) => {
  const prompt = `
    You are an expert analyst of online casino slot games.
    For the following list of games, provide the requested details.
    The input is a list of games where each line contains the game name and its provider.
    Use public sources for information. Based on your knowledge, fill in the details for each game.

    For each game, provide:
    1. volatility: A number on a scale of 1 to 8, where 1 is lowest and 8 is highest. Use these mappings: Low=2, Medium=4, Medium-High=6, High/Very High=8. Interpolate for other values (e.g. Low-Medium=3).
    2. rtp: The primary Return to Player as a percentage string (e.g., "96.5%").
    3. lines: The number of paylines or ways (e.g., "20", "117649").
    4. reels: The reel layout (e.g., "5x3", "6").
    5. theme: A list of primary themes.
    6. features: A list of key features.

    Rule Modifications:
    - If a game has a clear Chinese or other East Asian name or theme, classify its primary theme as "Asian".
    - If a game's main subject is buffalos, its themes must be 'Animals' and 'Buffalos'.
    - If a game is known to be available in land-based casinos, include "Vegas Vibes" as one of its themes.
    - If info is not available: return 0 for 'volatility', an empty string for text fields, and an empty list for list fields. Do not use "N/A".

    Games list:
    ${gameList}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("API returned an empty response.");
    }

    const data = JSON.parse(jsonText);
    return data;
  } catch (error) {
    console.error("Error fetching game data from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch or parse game data: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching game data.");
  }
};