import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  try {
    // 🔹 Récupérer les données envoyées depuis le frontend
    const { price } = await req.json();

    if (!price) {
      console.error("❌ Prix manquant !");
      return NextResponse.json({ error: "Prix manquant" }, { status: 400 });
    }

    console.log("💰 Prix reçu :", price);

    // 🔹 Convertir en centimes (Stripe attend les montants en centimes)
    const priceInCents = Math.round(parseFloat(price) * 100);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Achat de Beacoins" },
            unit_amount: priceInCents, // Prix dynamique
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/return?session_id={CHECKOUT_SESSION_ID}&unit_amount=${priceInCents}`,
    });

    console.log("✅ Session créée :", session.id);
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("❌ Erreur Stripe :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
