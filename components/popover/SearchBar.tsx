import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import OneEvent from "@/components/OneEvent";
import Image from "next/image"; // Image du bouton "loop"
import Button from "./SortButton";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date"); // Valeur par défaut pour le tri
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date().toISOString();
      if (searchTerm) {
        const { data, error } = await supabaseData
          .from("Event")
          .select("id, name")
          .gte("date", currentDate)
          .ilike("name", `%${searchTerm}%`)
          .order(sortBy, { ascending: true }); // Utilisation de sortBy pour trier
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setResults(data);
        }
        setLoading(false);
      } else if (searchTerm === "") {
        const { data, error } = await supabaseData
          .from("Event")
          .select("id, name")
          .gte("date", currentDate)
          .order(sortBy, { ascending: true }); // Utilisation de sortBy pour trier
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setResults(data);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [searchTerm, sortBy]); // Ajout de sortBy comme dépendance

  if (loading) {
    return (
      <div className="flex flex-row gap-2 absolute top-[50%] left-[50%]transform -translate-x-1/2 -translate-y-1/2">
        <div className="animate-pulse bg-gray-300 w-[14rem] h-[14rem] rounded-lg"></div>
        <div className="flex flex-col gap-2">
          <div className="animate-pulse bg-gray-300 w-[28rem] h-[5rem] rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-[36rem] h-[3rem] rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-[36rem] h-[2rem] rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col self-center'>
      <div id="recherche" className="flex mb-10 md:mt-0 items-center self-center gap-4">
        {/* Bouton trier */}
        <div>
          <button className="flex items-center gap-2 bg-[--primary] ring-2 ring-[--primary] rounded-2xl duration-500 hover:bg-transparent w-fit self-center py-2 px-3 text-base">
            <svg
              className="size-3 fill-[--text]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
            </svg>
            <span>Trier</span>
          </button>
        </div>

        {/* Composant Button pour le tri */}
        <Button onSortChange={setSortBy} />

        {/* Fin Bouton trier */}
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            className="md:w-96 h-10 px-3 ring-[--primary] ring-2 focus:ring-[--text] focus:outline-none rounded-lg"
            placeholder="Rechercher un évènement"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
            <Image
              width={24}
              height={24}
              src="../icones/loop.svg"
              alt="Search Icon"
            />
          </button>
        </div>
        {/* Fin Search Bar */}
      </div>

      <div
        id="eventListe"
        className="flex flex-col gap-6 max-w-[95vw] md:max-w-[80%] self-center align-center mb-5"
      >
        <ul className="flex flex-col gap-6">
          {results.map((event) => (
            <OneEvent key={event.id} id_Event={event.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;