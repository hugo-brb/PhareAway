import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapComponentProps = {
    center: [number, number];
    zoom: number;
    // Coordonnées sous forme de LngLat pour définir les limites
    bounds : [[number, number], [number, number]];
  };


  const Map: React.FC<MapComponentProps> = ({ center, bounds=[[-1.6855971, 43.3917938],[6.8601348, 51.4408039]], zoom=10}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<mapboxgl.Map | null>(null)

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';
        if (!mapInstance.current) {
            if (mapContainer.current) {
                mapInstance.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/barbiehu/cm3yhh52400k901sig86t058b',
                    center: center,
                    maxBounds: bounds, // Limites pour empêcher le déplacement en dehors de la zone
                    maxZoom: 10, // Zoom minimum par défaut (sera ajusté par fitBounds)
                    dragRotate: false, // Désactive la rotation
                    pitchWithRotate: false, // Désactive l'inclinaison avec la rotation
                });
            }
        }
        // Nettoyage de la carte à la destruction du composant
        return () => {
            mapInstance.current?.remove();
            mapInstance.current = null;
          };
        }, [bounds]);

    useEffect(() => {
        if (mapInstance.current) {
            mapInstance.current.flyTo({ center });
        }
    }, [center]);
  return <div ref={mapContainer} className=' w-[100vw] h-[100vh] overflow-y-hidden' />;
};

export default Map;
