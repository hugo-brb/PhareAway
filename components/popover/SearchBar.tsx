// SearchBar.js
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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
    <div>
      <input
        type="text"
        placeholder="Rechercher un évènement"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>Aucun résultat trouvé</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
