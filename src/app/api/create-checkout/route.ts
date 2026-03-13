import { NextRequest, NextResponse } from "next/server";

// Stripe integration - placeholder keys until real ones are provided
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_PLACEHOLDER";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { street, town, postcode, band, propertyType, bedrooms, yearBuilt, extensions } = body;

  // Build metadata to pass property details through to success page
  const metadata = { street, town, postcode, band, propertyType, bedrooms, yearBuilt, extensions };

  // If no real Stripe key, skip to success page directly (dev mode)
  if (STRIPE_SECRET_KEY === "sk_test_PLACEHOLDER") {
    const params = new URLSearchParams(metadata);
    return NextResponse.json({
      url: `/success?${params.toString()}`,
    });
  }

  try {
    const origin = req.nextUrl.origin;
    const successParams = new URLSearchParams(metadata);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "payment_method_types[0]": "card",
        mode: "payment",
        "line_items[0][price_data][currency]": "gbp",
        "line_items[0][price_data][product_data][name]": "VOA Council Tax Appeal Letter",
        "line_items[0][price_data][product_data][description]": `Appeal letter for ${street}, ${town}`,
        "line_items[0][price_data][unit_amount]": "499",
        "line_items[0][quantity]": "1",
        success_url: `${origin}/success?${successParams.toString()}`,
        cancel_url: `${origin}/check`,
        ...Object.fromEntries(
          Object.entries(metadata).map(([k, v]) => [`metadata[${k}]`, v])
        ),
      }),
    });

    const session = await res.json();

    if (session.error) {
      throw new Error(session.error.message);
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
