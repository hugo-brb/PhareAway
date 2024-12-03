import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/barbiehu/cm3yhh52400k901sig86t058b',
      center: [-0.6867931, 45.7461798],
      zoom: 5.7,
      pitch: 45,
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className=' w-[100vw] h-[100vh] overflow-y-hidden' />;
};

export default Map;
