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
import About from "@/components/popover/About";
import CGU from "@/components/popover/CGU";
import Contact from "@/components/popover/Contact";
import { createClient } from "@supabase/supabase-js";
import { usePlayer } from "@/components/model/player";
import Loader from "@/components/Loader"; // Importez un composant Loader
import { redirect } from "next/navigation";
import DlcList from "@/components/DlcList";
import Tips from "@/components/popover/Tips";
import AudioPlayer from "@/components/AudioPlayer";
import Legend from "@/components/Legend";

interface itemProps {
  id: number;
  coordinates: string;
  name: string;
  url: string;
  enigme: boolean;
  description: string;
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
    2.451967398919588,47.06938852063802
  ]); // Initial map center
  // Initial map bounds
  const [bounds, setBounds] = useState<[[number, number], [number, number]]>([
    [ -14.637792105651805,34.50915037983],
    [13.253221239308171,54.05642397818343],
  ]); // Initial map bounds
  const [zoom, setZoom] = useState(5); // initial map zoom

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
  const updateBounds = (newBounds: [[number, number], [number, number]]) => {
    setBounds(newBounds);
  };
  const updateZoom = (newzoom: number) => {
    setZoom(newzoom);
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
          .select("coordinates, name, url, id, enigme, description");
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
          descriptionTag: item.description,
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

  

  const [tips, setTips] = useState("0");
  const handleClickTips = (a: string) => {
    setTips(a);
  };

  useEffect(() => {
    handleClickTips("start");
  }, []);

  return (
    <>
      {isLoading && <Loader />} {/* Affiche le préloader */}
      <AudioPlayer />
      <Menu
        active={active}
        handleClickActive={handleClickActive}
        handleClickTips={handleClickTips}
      />
      {(active === "home" || active === "coin") && dlcOwned && (
        <DlcList
          onBoundsChange={updateBounds}
          onCenterChange={updateCenter}
          onZoomChange={updateZoom}
          player={player}
        />
      )}
      <Map
        zoom={zoom}
        bounds={[
          [bounds[0][0], bounds[0][1]],
          [bounds[1][0], bounds[1][1]],
        ]}
        center={center}
        markers={markers}
        handleClickActive={handleClickActive}
        handleClickActiveId={handleClickActiveId}
        onMapLoaded={handleMapLoaded} // Transmet la fonction callback
      />
      {active === "calendar" && (
        <Events
          handleClickActive={handleClickActive}
          handleClickTips={handleClickTips}
          player={player}
        />
      )}
      {active === "addEvent" && player.getIsAsso() && (
        <AddEvent handleClickActive={handleClickActive} />
      )}
      {active === "coin" && (
        <Store handleClickActive={handleClickActive} player={player} />
      )}
      {active === "picture" && (
        <Pictures
          handleClickActive={handleClickActive}
          player={player}
          handleClickTips={handleClickTips}
        />
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
      {active === "home" && <Legend />}
      <Image
        src="/images/soupex.png"
        width={75}
        height={75}
        alt="Logo Soupex"
        className="hidden md:block absolute z-50 bottom-3 right-3 "
      />
      {/* Bouton d'affichage des tips sur téléphone */}
      <button
        className=" md:hidden absolute left-3 top-[10vh]"
        onClick={() => handleClickTips("1")}
      >
        <Image
          src="/mascotte/help.png"
          alt="Fenêtre d'aide"
          width={50}
          height={50}
        />
      </button>
      {/*Affichage des astuces*/}
      {tips === "start" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Comment jouer ?"
          cx="50%"
          cy="50%"
          text={`Salut à toi, jeune moussaillon ! Je m'appelle Pharah et je vais t'accompagner dans ton aventure. Sur toutes les pages de ce site, tu pourras me demander de t'aider à progresser. Pour cela, il te suffit de cliquer sur ma tête. Bonne chance !`}
          img="/mascotte/temp.png"
          next="0"
        />
      )}
      {tips === "1" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Page principale"
          cx="50%"
          cy="50%"
          text={`Bienvenue sur la page principale ! C'est depuis cet endroit que tu pourras accéder à toutes les fonctionnalités du site. Tu pourras notamment accéder à la carte, aux énigmes, aux événements, à la boutique, aux photos, à ton compte, et à bien d'autres choses encore.`}
          img="/mascotte/chokbar.png"
          next="2"
        />
      )}
      {tips === "2" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Barre de navigation"
          cx="30%"
          cy="20vw"
          text={`Tu peux utiliser la barre de navigation pour accéder rapidement à certaines fonctionnalités du site.`}
          img="/mascotte/happy.png"
          next="3"
        />
      )}
      {tips === "3" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Phares"
          cx="50%"
          cy="50%"
          text={`La carte est composée de plusieurs phares. Ceux disposant d'une énigme sont plus grands et en couleur. Pour résoudre une énigme, il te suffit de cliquer sur le phare correspondant et de suivre les instructions. Une fois l'énigme résolue, tu gagneras des Beacoins.`}
          img="/mascotte/mad.png"
          next="4"
        />
      )}
      {tips === "4" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Beacoins"
          cx="70%"
          cy="20%"
          text={`Les Beacoins sont la monnaie du jeu. Tu en gagnes en résolvant des énigmes, en partageant des photos ou en achetant des packs dans la boutique. Tu peux les dépenser dans la boutique pour acheter des objets exclusifs ou des indices pour les énigmes. (Clique sur ton nombre de Beacoins pour ouvrir également la boutique.)`}
          img="/mascotte/struggle.png"
          next="5"
        />
      )}
      {tips === "5" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Extensions"
          cx="70%"
          cy="70%"
          text={`Les extensions sont des contenus additionnels que tu peux débloquer pour accéder à de nouveaux phares. Tu peux les acheter dans la boutique en échange de Beacoins, et elles apparaîtront sur la carte une fois débloquées.`}
          img="/mascotte/uwu.png"
          next="6"
        />
      )}
      {tips === "6" && (
        <Tips
          handleClickTips={handleClickTips}
          title="Fin"
          cx="50%"
          cy="50%"
          text={`Tu sais tout ! Plus qu'à découvrir des phares incroyables et à résoudre des énigmes. N'hésite pas à me redemander de l'aide si tu es bloqué. Bonne chance !`}
          img="/mascotte/temp.png"
          next="0"
        />
      )}
    </>
  );
}
