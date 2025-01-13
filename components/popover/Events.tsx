import OneEvent from "@/components/OneEvent";
import { createClient } from "@supabase/supabase-js";
import { UsePlayer } from "../model/player";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabaseData
        .from("Event")
        .select("id")
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
      <main className=" absolute top-0 z-40 flex  w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
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
          <div
            id="recherche"
            className="flex flex-row items-center self-center gap-4"
          >
            <button className=" flex items-center gap-2 bg-[--primary] ring-2 ring-[--primary] rounded-2xl duration-500 hover:bg-transparent w-fit self-center py-2 px-3 text-base">
              <svg
                className=" size-3 fill-[--text]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
              </svg>
              <span>Trier</span>
            </button>
            <div className="relative">
              <input
                type="search"
                className="w-96 h-10 px-3 ring-[--primary] ring-2 focus:ring-[--text] focus:outline-none rounded-lg"
                placeholder="Rechercher..."
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                <Image
                  width={24}
                  height={24}
                  src="/icones/loop.svg"
                  alt="Search Icon"
                />
              </button>
            </div>
          </div>
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
            className="flex flex-col gap-6 max-w-[80%] self-center"
          >
            {events.map((event) => (
              <OneEvent key={event.id} id_Event={event.id} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
