import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import Marker from "@/components/OneMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom";

type MapComponentProps = {
  center: [number, number]; // Coordonnées du centre de la carte
  zoom: number; //zoom de base
  bounds: [[number, number], [number, number]]; // limite d'affichage de la carte
  markers: {
    id: number;
    longitude: number;
    latitude: number;
    popupText?: string;
    icone?: string;
    lien?: string;
    enigme?: boolean;
  }[]; // Liste des marqueurs à afficher
  handleClickActive: (a: string) => void;
  handleClickActiveId: (id: number) => void;
};

const Map: React.FC<MapComponentProps> = ({
  center,
  bounds,
  zoom,
  markers,
  handleClickActive,
  handleClickActiveId,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
/* creation de la carte */
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/barbiehu/cm5nzmenf00d401pk6xlhb7di",
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
/* affichage du niveau de zoom dans la console (OSEF TIER)
  useEffect(() => {
    if (mapInstance.current) {
      const handleZoom = () => {
        console.log(mapInstance.current?.getZoom().toString());
      };
  
      mapInstance.current.on('zoom', handleZoom);
  
      // Cleanup on unmount
      return () => {
        mapInstance.current?.off('zoom', handleZoom);
      };
    }
  }, [mapInstance.current]);
*/
/* creation des markers */
  useEffect(() => {
    if (mapInstance.current) {
      // Supprimer les anciens marqueurs avant d'ajouter les nouveaux
      const map = mapInstance.current;
      const markersOnMap: mapboxgl.Marker[] = [];

      // Ajouter les marqueurs
      markers.forEach(({ id, longitude, latitude, popupText, icone, lien, enigme }) => {
        const markerElement = document.createElement("div");
        markerElement.style.backgroundImage = `url("${icone}")`;
        markerElement.style.width = "30px"; // Définir la largeur du marqueur
        markerElement.style.height = "30px"; // Définir la hauteur du marqueur
        markerElement.style.backgroundSize = "cover"; // Assurer que l'image couvre tout l'élément
        const container = document.createElement("div");
        container.classList.add("flex", "flex-col", "gap-6", "items-center");
        const root = createRoot(container); // Crée un root pour React

        // Rendu du composant React dans ce conteneur
        root.render(
          <Marker
            id={id}
            popupText={popupText}
            icone={icone}
            lien={lien}
            enigme={enigme}
            handleClickActive={handleClickActive}
            handleClickActiveId={handleClickActiveId}
          />,
        );


        // Créez le popup Mapbox en utilisant le conteneur avec le contenu React
        const popup = new mapboxgl.Popup().setDOMContent(container);
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);

        markersOnMap.push(marker);
      });

      // Nettoyage : supprimer les marqueurs lorsque le composant est démonté
      return () => {
        markersOnMap.forEach((marker) => marker.remove());
      };
    }
  }, [markers, handleClickActive, handleClickActiveId]);

  return (
    <div ref={mapContainer} className="w-[100vw] h-[100vh] overflow-y-hidden" />
  );
};

export default Map;


