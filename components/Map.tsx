import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapComponentProps = {
    center: [number, number];
    zoom: number;
    bounds: [[number, number], [number, number]];
};

const Map: React.FC<MapComponentProps> = ({ center, bounds, zoom }) => {
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
                maxBounds: bounds,
                dragRotate: false,
                pitchWithRotate: false,
            });
        }
        // Cleanup function to remove the map on component unmount
        return () => {
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        if (mapInstance.current) {
            mapInstance.current.flyTo({ center });
        }
    }, [center]); // Update map center when `center` changes

    return <div ref={mapContainer} className='w-[100vw] h-[100vh] overflow-y-hidden' />;
};

export default Map;