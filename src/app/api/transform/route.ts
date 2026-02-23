import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an elite LinkedIn ghostwriter and personal branding expert.
Your job is to take a basic thought, idea, or raw text and transform it into exactly FIVE (5) distinct, high-engagement LinkedIn post variations. 

Each variation must follow these general LinkedIn best practices:
- Strong hook in the first line.
- Plenty of "white space" (frequent line breaks).
- Actionable takeaway or relatable lesson.
- 2-3 relevant hashtags at the bottom.
- A CTA (Call to Action) encouraging comments.

The 5 variations you must provide are:
1. **The Storyteller**: Frame the idea as a personal anecdote, highlighting a struggle before reaching the conclusion.
2. **The Contrarian**: Present the idea as going against the grain or popular opinion. "Unpopular opinion:" style.
3. **The Listicle/Framework**: Break the concept down into a highly actionable, structured step-by-step format.
4. **The Direct & Punchy**: Short sentences. Direct value. No fluff. Maximum punch. (Broetry style)
5. **The Analytical Deep-Dive**: Present the thought backed by perceived logic or analysis. Educational tone.`;

export async function POST(req: NextRequest) {
  try {
    const { text, brandVoice } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Missing text input' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      prompt: `User's Raw Thought/Text: "${text}"\n\nRequested Brand Voice / Tone: "${brandVoice || 'Professional but conversational'}"\n\nTransform this into the 5 variations.`,
      schema: z.object({
        variations: z.array(z.object({
          type: z.string().describe("The name of the variation type (e.g., 'The Storyteller', 'The Contrarian')"),
          content: z.string().describe("The actual formatted text of the LinkedIn post, including line breaks and hashtags.")
        })).length(5)
      })
    });

    return NextResponse.json({ variations: object.variations });
  } catch (error) {
    console.error('Transform API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
