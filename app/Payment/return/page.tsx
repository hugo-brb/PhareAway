"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ReturnPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Vérification en cours...");

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout_sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "complete") {
            setStatus("Paiement réussi ! 🎉");
          } else {
            setStatus("Le paiement a échoué ou a été annulé.");
          }
        })
        .catch(() => setStatus("Erreur de vérification du paiement."));
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
}

export default function ReturnPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ReturnPageContent />
    </Suspense>
  );
}
