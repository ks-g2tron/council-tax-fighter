import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { street, town, postcode, band, propertyType, bedrooms, yearBuilt, extensions } = body;

  const prompt = `Write a formal appeal letter to the Valuation Office Agency challenging a council tax band assessment.

Property: ${street}, ${town}, ${postcode}
Current band: ${band}
Property type: ${propertyType}
Bedrooms: ${bedrooms}
Year built: ${yearBuilt || "Unknown"}
Extensions since 1991: ${extensions}

The letter should:
- Be addressed to "The Listing Officer, Valuation Office Agency"
- Cite the right to appeal under the Council Tax (Alteration of Lists and Appeals) Regulations 1993
- Reference comparable properties in the ${town} area (use realistic but illustrative examples)
- Request a formal review of the banding
- Be formal, professional, and persuasive
- Include [YOUR NAME] and [YOUR ADDRESS] placeholders at the top for the sender
- Include today's date
- Be ready to print, sign, and post

Write only the letter, no preamble or explanation.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4 },
        }),
      }
    );

    const data = await res.json();
    const letter = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ letter });
  } catch (e) {
    console.error("Letter generation error:", e);
    return NextResponse.json(
      { error: "Failed to generate letter" },
      { status: 500 }
    );
  }
}
