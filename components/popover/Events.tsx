import OneEvent from "@/components/OneEvent";
import { createClient } from "@supabase/supabase-js";
import { UsePlayer } from "../model/player";
import { useEffect, useState } from "react";
import { count } from "console";

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
        .gte("date", currentDate);

      if (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      } else {
        setEvents(data); // Stocke les événements récupérés dans l'état
      }

      setLoading(false); // Fin du chargement
      console.log(" info ", data);
    };

    fetchEvents(); // Appel de la fonction pour récupérer les événements
  }, []); // L'effet est exécuté une seule fois lorsque le composant est monté

  if (loading) {
    return <div>Chargement des événements...</div>;
  }
  return (
    <>
      <main className=" absolute top-0 z-40 flex  w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 left-5 transform transition-transform duration-300 hover:-rotate-90"
            onClick={() => handleClickActive("home")}
          >
            <img
              src="/icones/xmark-solid.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>
          <div
            id="recherche"
            className="flex flex-row items-center self-center"
          >
            <button className="flex flex-row items-center gap-2 bg-[--primary] px-4 py-2 rounded-lg mr-8">
              <svg
                className="w-3 h-3"
                width="211"
                height="361"
                viewBox="0 0 211 361"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="211" height="47" fill="#D9D9D9" />
                <path
                  d="M129 150V291C129 329.66 97.6599 361 59 361V361V150H129Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M59.5646 150L0 47H211L129.225 150H59.5646Z"
                  fill="#D9D9D9"
                />
              </svg>
              <span>Trier</span>
            </button>
            <div className="relative">
              <input
                type="search"
                className="w-96 h-10 px-3 border-slate-700 border-2 rounded-lg"
                placeholder="Search..."
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                <img
                  className="w-6 h-6"
                  src="/icones/loop.svg"
                  alt="Search Icon"
                />
              </button>
            </div>
          </div>
          {player.getIsAsso() && (
            <button
              onClick={() => handleClickActive("addEvent")}
              className=" bg-[--primary] ring-2 ring-[--primary] rounded-2xl duration-500 hover:bg-transparent w-fit self-center py-2 px-3 text-lg font-bold"
            >
              + Ajouter un événement
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
