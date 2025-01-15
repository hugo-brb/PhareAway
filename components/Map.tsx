/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import Marker from "@/components/OneMarker";
import "mapbox-gl/dist/mapbox-gl.css";

type MapComponentProps = {
  center: [number, number];
  zoom: number;
  //bounds: [[number, number], [number, number]];
  markers: {
    id: number;
    longitude: number;
    latitude: number;
    popupText?: string;
    icone?: string;
    lien?: string;
    enigme?: boolean;
  }[];
  handleClickActive: (a: string) => void;
  handleClickActiveId: (id: number) => void;
  onMapLoaded: () => void; // Callback pour signaler que la carte est prête
};

const Map: React.FC<MapComponentProps> = ({
  center,
  //bounds,
  zoom,
  markers,
  handleClickActive,
  handleClickActiveId,
  onMapLoaded,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  // Initialisation de la carte
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/barbiehu/cm5nzmenf00d401pk6xlhb7di",
        center: center,
        zoom: zoom,
        maxZoom: 10,
        //maxBounds: bounds,
        dragRotate: false,
        pitchWithRotate: false,
      });
      // Événement déclenché lorsque la carte est entièrement chargée
      mapInstance.current.on("load", () => {
        onMapLoaded(); // Appelle la fonction callback pour signaler que la carte est prête
      });
    }
    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []); // On veut que ça ne s'exécute qu'une fois au montage

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.flyTo({ center });
    }
  }, [center]);

  useEffect(() => {
    if (mapInstance.current) {
      const map = mapInstance.current;
      const markersOnMap: mapboxgl.Marker[] = [];

      markers.forEach(
        ({ id, longitude, latitude, popupText, icone, lien, enigme }) => {
          const markerElement = document.createElement("div");
          markerElement.style.backgroundImage = `url("${icone}")`;
          markerElement.style.width = enigme ? "50px" : "30px";
          markerElement.style.height = enigme ? "50px" : "30px";
          markerElement.style.backgroundSize = "cover";
          const container = document.createElement("div");
          container.classList.add("flex", "flex-col", "gap-6", "items-center");
          const root = createRoot(container);

          root.render(
            <Marker
              id={id}
              popupText={popupText}
              icone={icone}
              lien={lien}
              enigme={enigme}
              handleClickActive={handleClickActive}
              handleClickActiveId={handleClickActiveId}
            />
          );

          const popup = new mapboxgl.Popup().setDOMContent(container);
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);

          markersOnMap.push(marker);
        }
      );

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
