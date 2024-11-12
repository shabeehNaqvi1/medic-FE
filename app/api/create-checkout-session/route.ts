import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const {
      priceId,
      doctor_id,
      patient_id,
      amount,
      customer_email,
      doctor_email,
    } = await request.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email,
      mode: "payment",
      success_url: `https://medic-chat-front-end.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}&doctor_id=${doctor_id}&patient_id=${patient_id}&amount=${amount}&doctor_email=${doctor_email}`,
      cancel_url: `https://medic-chat-front-end.vercel.app/payment-declined`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    NextResponse.json({ error: error.message });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
