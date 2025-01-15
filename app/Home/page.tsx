"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Menu from "@/components/Menu";
import Coin from "@/components/Coin";
import BackHome from "@/components/BackHome";
import AddEvent from "@/components/popover/AddEvent";
import Events from "@/components/popover/Events";
import Enigme from "@/components/popover/Enigme";
import Store from "@/components/popover/Store";
import Pictures from "@/components/popover/Pictures";
import Account from "@/components/popover/Account";
import TopNav from "@/components/topNav";
import About from "@/components/popover/About";
import CGU from "@/components/popover/CGU";
import Contact from "@/components/popover/Contact";
import { createClient } from "@supabase/supabase-js";
import { usePlayer } from "@/components/model/player";
import Loader from "@/components/Loader"; // Importez un composant Loader
import { redirect } from "next/navigation";
import DlcList from "@/components/DlcList";

interface itemProps {
  id: number;
  coordinates: string;
  name: string;
  url: string;
  enigme: boolean;
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
    //const [bounds, setBounds] = useState<[[number, number],[number,number]]>([[-5.1535428, 42.5314237],[7.3190333, 51.0605319]]); // Initial map bounds
    const player = usePlayer(session?.user?.email ?? "");
    const dlcOwned = player.getDlcUnlocked().length > 0 ? true : false;

    const [isLoading, setIsLoading] = useState(true); // Gère l'affichage du préloader est true si le préloader doit affiché sinon il est false
    const [isMapReady, setIsMapReady] = useState(false); // Suivi du statut de la carte
    const [markersLoaded, setMarkersLoaded] = useState(false); // Suivi des marqueurs

    if (session === null) {
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
        try {
            const { data, error } = await supabaseData
            .from("Lighthouse")
            .select("coordinates, name, url, id, enigme");
            if (error) {
            console.error("Erreur de chargement des données Supabase:", error);
            return;
            }
            // Formatage des données pour Mapbox
            const formattedMarkers = data.map((item: itemProps) => ({
            id: item.id,
            longitude: parseFloat(item.coordinates.split(" ")[0]),
            latitude: parseFloat(item.coordinates.split(" ")[1]),
            popupText: item.name,
            icone: item.enigme
                ? "/icones/lightHouseIconEnigme.svg"
                : "/icones/lightHouseIcon.svg",
            lien: item.url,
            enigme: item.enigme,
            }));

            setMarkers(formattedMarkers);
            setMarkersLoaded(true); // Marqueurs chargés
        } catch (err) {
            console.error("Erreur lors du chargement des marqueurs:", err);
        }
        };

        fetchMarkers();
    }, []);

    // Callback pour signaler que la carte est chargée
    const handleMapLoaded = () => {
        setIsMapReady(true); // La carte est prête
    };

    // Mise à jour de l'état global lorsque tout est prêt
    useEffect(() => {
        if (isMapReady && markersLoaded) {
        setIsLoading(false); // Désactiver le préloader
        }
    }, [isMapReady, markersLoaded]);

    // Afficher le préloader tant que tout n'est pas chargé
    return (
        <>
        {isLoading && <Loader />} {/* Affiche le préloader */}
        <Menu active={active} handleClickActive={handleClickActive} />
        {dlcOwned && <DlcList onCenterChange={updateCenter} player={player} />}
        {active === "home" && <TopNav onCenterChange={updateCenter} />}
        <Map
            zoom={6}
            /*bounds={[
            [bounds[0][0], bounds[0][1]],
            [bounds[1][0], bounds[1][1]],
            ]}*/
            center={center}
            markers={markers}
            handleClickActive={handleClickActive}
            handleClickActiveId={handleClickActiveId}
            onMapLoaded={handleMapLoaded} // Transmet la fonction callback
        />
        {active === "calendar" && (
            <Events handleClickActive={handleClickActive} player={player} />
        )}
        {active === "addEvent" && player.getIsAsso() && (
            <AddEvent handleClickActive={handleClickActive} />
        )}
        {active === "coin" && (
            <Store handleClickActive={handleClickActive} player={player} />
        )}
        {active === "picture" && (
            <Pictures handleClickActive={handleClickActive} player={player} />
        )}
        {active === "enigme" && (
            <Enigme
            handleClickActive={handleClickActive}
            id={activeID}
            player={player}
            />
        )}
        {active === "account" && (
            <Account handleClickActive={handleClickActive} player={player} />
        )}
        {active === "about" && <About handleClickActive={handleClickActive} />}
        {active === "cgu" && <CGU handleClickActive={handleClickActive} />}
        {active === "contact" && (
            <Contact handleClickActive={handleClickActive} player={player} />
        )}
        <BackHome />
        <Coin handleClickActive={handleClickActive} player={player} />
        <Image
            src="/images/soupex.png"
            width={75}
            height={75}
            alt="Logo Soupex"
            className="hidden md:block absolute z-50 bottom-3 right-3 "
        />
        </>
    );
    }
