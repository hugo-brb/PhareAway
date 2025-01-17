"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePlayer } from "@/components/model/player";

function ReturnPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const unitAmount = searchParams.get("unit_amount");
  const [status, setStatus] = useState("Vérification en cours...");
  const [nbBeacoins, setNbBeacoins] = useState(0);
  const { data: session } = useSession();
  const player = usePlayer(session?.user?.email ?? "");

  if (unitAmount) {
    if (unitAmount === "490") {
      setNbBeacoins(200);
    } else if (unitAmount === "1090") {
      setNbBeacoins(600);
    } else if (unitAmount === "2490") {
      setNbBeacoins(1750);
    } else {
      setNbBeacoins(3500);
    }
  }
  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout_sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "complete") {
            player.setBeacoins(player.getBeacoins() + nbBeacoins);
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
      <Link href="/Home" className=" absolute top-0 left-0 px-7 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className=" size-7"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </Link>
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
