"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price"); // 🔹 Récupérer le prix

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }), // 🔹 Envoyer le prix
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [price]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className=" bg-white">
      <h1 className=" text-center font-bold text-4xl py-4">Paiement</h1>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
