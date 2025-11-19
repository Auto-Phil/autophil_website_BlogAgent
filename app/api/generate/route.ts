import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateRequest {
  websiteUrl: string;
  topics?: string;
  userMessage: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export async function POST(req: NextRequest) {
  try {
    const { websiteUrl, topics, userMessage, history = [] }: GenerateRequest = await req.json();

    if (!websiteUrl) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    // Scrape website content
    let websiteContent = '';
    try {
      const response = await fetch(websiteUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        redirect: 'follow',
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Remove script and style elements
      $('script, style, nav, footer, header').remove();
      
      // Get text content
      const text = $('body').text();
      websiteContent = text.replace(/\s+/g, ' ').trim().slice(0, 8000);
    } catch (error) {
      console.error('Error scraping website:', error);
      websiteContent = 'Unable to fetch website content. Proceeding with limited context.';
    }

    // Build the prompt
    const systemPrompt = `You are the Auto-Phil Blog Agent, an AI assistant specialized in generating SEO and AEO (Answer Engine Optimization) optimized blog snippets for small and medium enterprises (SMEs) and startups.

Your purpose is to help businesses create engaging, search-friendly content that:
- Ranks well in search engines (SEO)
- Provides clear, direct answers for voice search and AI assistants (AEO)
- Reflects the business's unique value proposition
- Is professional, accessible, and action-oriented

Brand Voice (Auto-Phil):
- Professional yet approachable
- Tech-savvy but jargon-free when possible
- Focused on practical solutions
- Tagline: "Turning tech apprehension into anticipation for SME and Startups"

Always:
1. Keep snippets concise (300-500 words ideal)
2. Include relevant keywords naturally
3. Structure content with clear headings
4. Write in an engaging, conversational tone
5. End with a call-to-action when appropriate`;

    const userPrompt = `Business Website URL: ${websiteUrl}
Website Content Summary: ${websiteContent}
${topics ? `Requested Topics: ${topics}` : ''}

User Request: ${userMessage}

Generate an SEO and AEO optimized blog snippet based on the above information. Make it relevant to the business, incorporate the requested topics if provided, and ensure it's optimized for both search engines and answer engines.`;

    // Build messages array with history
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history
    history.forEach((msg) => {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    });

    // Add current user message
    messages.push({ role: 'user', content: userPrompt });

    // Call OpenAI
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const generatedContent = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      content: generatedContent,
    });
  } catch (error: any) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate content',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
