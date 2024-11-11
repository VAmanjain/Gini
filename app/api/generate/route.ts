import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const data = await req.json();
        const userPrompt = data.body;

        const context_instructions =("You are a Freind assistant chatbot. Keep your response breif, accurate, and speficic to talk. ")

        // // Customize the prompt to reflect GINI's personality
        // const giniPrompt = `As GINI, a friendly and knowledgeable AI assistant, provide a comprehensive and informative response to the following query: "${userPrompt}". Remember to maintain a helpful and engaging tone.`;

        const giniPrompt = `${context_instructions} User:${userPrompt}`;

        const result = await model.generateContent(giniPrompt);
        const response = await result.response.text();

        return NextResponse.json({ output: response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate content' });
    }
}