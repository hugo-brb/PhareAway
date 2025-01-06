"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Menu from "@/components/Menu";
import Coin from "@/components/Coin";
import Event from "@/components/popover/Event";
import Store from "@/components/popover/Store";
import Pictures from "@/components/popover/Pictures";
import Account from "@/components/popover/Account";
import TopNav from "@/components/topNav";
import { createClient } from "@supabase/supabase-js";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

// Initialisation de Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ''
  );

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/Login");
  } else {
    const [active, setActive] = useState("home");
    const [center, setCenter] = useState<[number, number]>([
      -1.6282904, 49.6299822,
    ]); // Coordonnées initiales
    const [markers, setMarkers] = useState<
    { longitude: number; latitude: number; popupText: string }[]
  >([]);

  // Charger les données de Supabase
  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase
        .from("pharesData")
        .select("XYcoord, nom");

      if (error) {
        console.error("Erreur de chargement des données Supabase:", error);
        return;
      }

      // Formatage des données pour Mapbox
      const formattedMarkers = data.map((item: any) => ({

        longitude: item.XYcoord.split(" ")[0],
        latitude: item.XYcoord.split(" ")[1],
        popupText: `<h3>${item.nom}</h3>`,
      }));

      setMarkers(formattedMarkers);
    };

    fetchMarkers();
  }, []);

    

    const handleClickActive = (a: string) => {
      setActive(a);
    };
    // Fonction pour changer le centre de la carte
    const updateCenter = (newCenter: [number, number]) => {
      setCenter(newCenter);
    };

    return (
      <>
        <Menu active={active} handleClickActive={handleClickActive} />
        {active === "home" && (
          <TopNav
            onCenterChange={(newCenter: [number, number]) =>
              setCenter(newCenter)
            }
          />
        )}
        <Map
          zoom={2}
          bounds={[
            [-5.1535428, 42.5314237],
            [7.3190333, 51.0605319],
          ]}
          center={center}
          markers={markers}
        />
        {active === "calendar" && <Event />}
        {active === "coin" && <Store />}
        {active === "picture" && <Pictures />}
        {active === "account" && (
          <Account active={active} handleClickActive={handleClickActive} />
        )}
        <Coin active={active} handleClickActive={handleClickActive} />
        <Image
          src="/images/soupex.png"
          width={75}
          height={75}
          alt="Logo Soupex"
          className=" absolute z-50 bottom-3 right-3"
        />
      </>
    );
  }
}
