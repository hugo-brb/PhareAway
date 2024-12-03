import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

        // Coordonnées sous forme de LngLat pour définir les limites
        const bounds = [
            [-1.6855971, 43.3917938], // Southwest coordinates
            [6.8601348, 51.4408039]   // Northeast coordinates
        ];

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/barbiehu/cm3yhh52400k901sig86t058b',
            maxBounds: bounds, // Limites pour empêcher le déplacement en dehors de la zone
            maxZoom: 10, // Zoom minimum par défaut (sera ajusté par fitBounds)
            dragRotate: false, // Désactive la rotation
            pitchWithRotate: false, // Désactive l'inclinaison avec la rotation
        });

        // Nettoyage de la carte à la destruction du composant
        return () => map.remove();
    }, []);

    return <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
