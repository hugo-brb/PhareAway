import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapComponentProps = {
    center: [number, number]; // Coordonnées du centre de la carte
    zoom: number; //zoom de base
    bounds: [[number, number], [number, number]]; // limite d'affichage de la carte
    markers: {id:number; longitude: number; latitude: number; popupText?: string; icone?: string; lien?: string }[]; // Liste des marqueurs à afficher
    handleClickActive: (a: string) => void;
};

const Map: React.FC<MapComponentProps> = ({ center, bounds, zoom, markers, handleClickActive }) => {
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
            markers.forEach(({ id, longitude, latitude, popupText, icone, lien }) => {
                const markerElement=document.createElement('div');
                markerElement.style.backgroundImage = `url("${icone}")`;
                markerElement.style.width = '30px'; // Définir la largeur du marqueur
                markerElement.style.height = '30px'; // Définir la hauteur du marqueur
                markerElement.style.backgroundSize = 'cover'; // Assurer que l'image couvre tout l'élément

                const divElement = document.createElement('div');
                const enigmeBtn = document.createElement('button');
                enigmeBtn.innerHTML=  `<button class="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg">C'est Phar'ti<button>`;
                divElement.classList.add('flex', 'flex-col', 'gap-6', 'items-center');
                divElement.innerHTML = `<p>ID ${id}</p>`;
                divElement.innerHTML +=`<h3 class="text-xl">${popupText}</h3>`;
                divElement.innerHTML +=`<img src="https://nereoll.github.io/imagesPhare/phares/${id}.jpg" alt="Phare ${popupText}" width="200" height="200" />`;
                divElement.innerHTML +=`<a href="${lien}" target="_blank" class="text-cyan-700">Lien vers le site du phare</a>`;
                divElement.appendChild(enigmeBtn);

                enigmeBtn.addEventListener('click', (e) => {
                    handleClickActive("enigme");
                });

                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([longitude, latitude])
                    .setPopup(
                        new mapboxgl.Popup().setDOMContent(divElement)
                    )
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