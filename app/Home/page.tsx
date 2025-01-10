"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Menu from "@/components/Menu";
import Coin from "@/components/Coin";
import YourAccount from "@/components/BackHome";
import AddEvent from "@/components/popover/AddEvent";
import Events from "@/components/popover/Events";
import Enigme from "@/components/popover/Enigme";
import Store from "@/components/popover/Store";
import Pictures from "@/components/popover/Pictures";
import Account from "@/components/popover/Account";
import TopNav from "@/components/topNav";
import { createClient } from "@supabase/supabase-js";
import { usePlayer } from "@/components/model/player";

interface itemProps {
  XYcoord: string;
  nom: string;
  url: string;
}

// Dynamically import the Map component without server-side rendering (SSR)
const Map = dynamic(() => import("../../components/Map"), { ssr: false });
// Initialize Supabase client for data
const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default function Home() {
  const { data: session } = useSession();
  const [active, setActive] = useState("home");
  const [activeID, setActiveID] = useState(64);
  const [center, setCenter] = useState<[number, number]>([
    -1.6282904, 49.6299822,
  ]); // Initial map center
  const player = usePlayer(session?.user?.email ?? "");

  // Redirect to login if the session is not available
  if (!session) {
    redirect("/Login");
  }

  const handleClickActive = (a: string) => {
    setActive(a);
  };
  const handleClickActiveId = (id: number) => {
    setActiveID(id);
  };
  const updateCenter = (newCenter: [number, number]) => {
    setCenter(newCenter);
  };
  const [markers, setMarkers] = useState<
    { id: number; longitude: number; latitude: number; popupText: string }[]
  >([]);
  // Charger les données de Supabase
  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabaseData
        .from("pharesData")
        .select("XYcoord, nom, url");
      if (error) {
        console.error("Erreur de chargement des données Supabase:", error);
        return;
      }

      // Formatage des données pour Mapbox
      const formattedMarkers = data.map((item: itemProps, index: number) => ({
        id: index, // Identifiant unique
        longitude: parseFloat(item.XYcoord.split(" ")[0]),
        latitude: parseFloat(item.XYcoord.split(" ")[1]),
        popupText: item.nom,
        icone: "/icones/lightHouseIcon.svg",
        lien: item.url,
      }));

      setMarkers(formattedMarkers);
    };

    fetchMarkers();
  }, []);

  return (
    <>
      <Menu active={active} handleClickActive={handleClickActive} />
      {active === "home" && <TopNav onCenterChange={updateCenter} />}
      <Map
        zoom={2}
        bounds={[
          [-5.1535428, 42.5314237],
          [7.3190333, 51.0605319],
        ]}
        center={center}
        markers={markers}
        handleClickActive={handleClickActive}
        handleClickActiveId={handleClickActiveId}
      />
      {active === "calendar" && (
        <Events handleClickActive={handleClickActive} player={player} />
      )}
      {active === "addEvent" && player.getIsAsso() && (
        <AddEvent handleClickActive={handleClickActive} />
      )}
      {active === "coin" && <Store handleClickActive={handleClickActive} />}
      {active === "picture" && (
        <Pictures handleClickActive={handleClickActive} player={player} />
      )}
      {active === "enigme" && (
        <Enigme handleClickActive={handleClickActive} id={activeID} />
      )}
      {active === "account" && (
        <Account handleClickActive={handleClickActive} player={player} />
      )}
      <YourAccount />
      <Coin handleClickActive={handleClickActive} player={player} />
      <Image
        src="/images/soupex.png"
        width={75}
        height={75}
        alt="Logo Soupex"
        className="absolute z-50 bottom-3 right-3"
      />
    </>
  );
}
