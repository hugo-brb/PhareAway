"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentPageContent() {
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
    <div id="checkout" className=" bg-white scrollbarhidden">
      <Link href="/Home" className=" absolute top-0 left-0 px-7 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className=" size-7"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </Link>
      <h1 className=" text-center font-bold text-4xl py-4">Paiement</h1>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      <Image
        src="/icones/logoBaniere.png"
        alt="Logo PhareAway"
        width={350}
        height={350}
        className=" absolute bottom-[20vh] left-[20vw] hidden md:block"
      />
      <Image
        src="/icones/logoBaniere.png"
        alt="Logo PhareAway"
        width={100}
        height={100}
        className=" absolute top-[10vh] right-[5vw] md:hidden"
      />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
