// SearchBar.js
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
//import Image from "next/image"; // Image du bouton "loop"

const supabase =createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  interface Event {
    id: number;
    name: string;
  }

  const [results, setResults] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        const { data, error } = await supabase
          .from('Event')
          .select('*')
          .ilike('name', `%${searchTerm}%`);
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setResults(data);
        }
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div
     className='self-center'
    >

            <div
            id="recherche"
            className="flex mt-5 md:mt-0 items-center self-center gap-4"
            >
            {/*Bouton trier */}
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
            {/*Fin Bouton trier */}
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                className="  md:w-96 h-10 px-3 ring-[--primary] ring-2 focus:ring-[--text] focus:outline-none rounded-lg"
                placeholder="Rechercher un évènement"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/**
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                <Image
                  width={24}
                  height={24}
                  src="/icones/loop.svg"
                  alt="Search Icon"
                />
              </button>
               */}

            </div>
            {/* Fin Search Bar */}
          </div>

      <ul>
        {
          results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default SearchBar;
