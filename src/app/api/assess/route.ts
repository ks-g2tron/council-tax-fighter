import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { street, town, postcode, band, propertyType, bedrooms, yearBuilt, extensions } = body;

  const prompt = `You are a UK council tax band assessment expert. A homeowner has provided these property details:
- Address: ${street}, ${town}, ${postcode}
- Current Band: ${band}
- Property Type: ${propertyType}
- Bedrooms: ${bedrooms}
- Approximate Year Built: ${yearBuilt || "Unknown"}
- Extensions/changes since 1991: ${extensions}

Based on typical VOA band assessments for ${propertyType} properties in the ${town} area, assess whether they might be in the wrong band. Consider that bands were set in 1991 based on 1991 property values, and many properties have been mis-banded since then.

Be honest — don't oversell the chance of success.

Respond in this exact JSON format (no markdown, just raw JSON):
{
  "likelihood": "LIKELY in the wrong band" or "You MAY be in the wrong band" or "Your band appears correct",
  "summary": "A 1-2 sentence plain English summary of the assessment",
  "factors": ["factor 1", "factor 2", "factor 3"],
  "comparables": [
    {"address": "realistic nearby address", "band": "X", "type": "property type", "value": "£XX,000"},
    {"address": "realistic nearby address", "band": "X", "type": "property type", "value": "£XX,000"},
    {"address": "realistic nearby address", "band": "X", "type": "property type", "value": "£XX,000"}
  ]
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON in response");
    }

    const assessment = JSON.parse(jsonMatch[0]);
    return NextResponse.json(assessment);
  } catch (e) {
    console.error("Assessment error:", e);
    return NextResponse.json(
      { error: "Failed to generate assessment" },
      { status: 500 }
    );
  }
}
