import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapComponentProps = {
    center: [number, number]; // Coordonnées du centre de la carte
    zoom: number; //zoom de base
    bounds: [[number, number], [number, number]]; // limite d'affichage de la carte
    markers: { longitude: number; latitude: number; popupText?: string; icone?: string }[]; // Liste des marqueurs à afficher
};

const Map: React.FC<MapComponentProps> = ({ center, bounds, zoom, markers }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';
        if (!mapInstance.current && mapContainer.current) {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/barbiehu/cm3yhh52400k901sig86t058b',
                center: center,
                zoom: zoom,
                maxZoom: 10,
                maxBounds: bounds,
                dragRotate: false,
                pitchWithRotate: false,
            });
        }
        return () => {
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []);

    useEffect(() => {
        if (mapInstance.current) {
            mapInstance.current.flyTo({ center });
        }
    }, [center]); // Update map center when `center` changes

    useEffect(() => {
        if (mapInstance.current) {
            // Supprimer les anciens marqueurs avant d'ajouter les nouveaux
            const map = mapInstance.current;
            const markersOnMap: mapboxgl.Marker[] = [];

            // Ajouter les marqueurs
            markers.forEach(({ longitude, latitude, popupText, icone }) => {
                const markerElement=document.createElement('div');
                markerElement.style.backgroundImage = `url("${icone}")`;
                markerElement.style.width = '30px'; // Définir la largeur du marqueur
                markerElement.style.height = '30px'; // Définir la hauteur du marqueur
                markerElement.style.backgroundSize = 'cover'; // Assurer que l'image couvre tout l'élément

                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([longitude, latitude])
                    .setPopup(
                        new mapboxgl.Popup().setHTML(popupText || '')
                    ) // Ajouter un popup facultatif
                    .addTo(map);

                markersOnMap.push(marker);
            });

            // Nettoyage : supprimer les marqueurs lorsque le composant est démonté
            return () => {
                markersOnMap.forEach(marker => marker.remove());
            };
        }
    }, [markers]); // Réagir lorsque les marqueurs changent

    return <div ref={mapContainer} className='w-[100vw] h-[100vh] overflow-y-hidden' />;
};

export default Map;