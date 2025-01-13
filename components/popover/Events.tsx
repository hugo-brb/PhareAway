import OneEvent from "@/components/OneEvent";
import { createClient } from "@supabase/supabase-js";
import { UsePlayer } from "../model/player";
import { useEffect, useState } from "react";
import Image from "next/image";

import React from "react";
import SearchBar from "./SearchBar";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Events({ handleClickActive, player }: MenuProps) {
  const currentDate = new Date().toISOString();
  // State pour stocker les événements
  interface Event {
    id: string;
    date: string;
    // Add other event properties here
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabaseData
        .from("Event")
        .select("id, date")
        .gte("date", currentDate)
        .order("date", { ascending: true });

      if (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      } else {
        setEvents(data); // Stocke les événements récupérés dans l'état
      }

      setLoading(false); // Fin du chargement
    };

    fetchEvents(); // Appel de la fonction pour récupérer les événements
  }, [currentDate]); // L'effet est exécuté une seule fois lorsque le composant est monté

  if (loading) {
    return <div>Chargement des événements...</div>;
  }
  return (
    <>
      <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center mb-5 md:mb-0 gap-12 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
            onClick={() => handleClickActive("home")}
          >
            <Image
              src="/icones/xmark-solid.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>

          <div id="TODO SearchBar a mettre au propre">
            <SearchBar />
          </div>

            {/** Filtre seulement pour les évènements qui ont la string dans leur nom
            const filteredEvents = events.filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            */}

          {player.getIsAsso() && (
            <button
              onClick={() => handleClickActive("addEvent")}
              className=" flex items-center gap-2 bg-[--primary] ring-2 ring-[--primary] rounded-2xl duration-500 hover:bg-transparent w-fit self-center py-2 px-3 text-lg font-bold"
            >
              <svg
                className=" size-5 fill-[--text]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>{" "}
              Ajouter un événement
            </button>
          )}
          <div
            id="eventListe"
            className="flex flex-col gap-6 max-w-[95vw] md:max-w-[80%] self-center"
          >
            {events.map((event) => (
              <OneEvent key={event.id} id_Event={parseInt(event.id, 10)} />
            ))}

            {/** Appelle de la fonction pour afficher seulement les évènements qu'ils faut
            {  filteredEvents.map((event) => (
                <OneEvent key={event.id} id_Event={parseInt(event.id, 10)} />
              ))
            }
            */}

          </div>
        </section>
      </main>
    </>
  );
}
