import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { useParams } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

const LeafletMap = () => {
    
    const { id } = useParams();
    const [mapInitialized, setMapInitialized] = useState(false);
    const mapContainerRef = useRef(null);

    
    const getAddressFromEventsTable = async () => {
        try {
            const response = await axios.get(`/api/events/${id}/address`);
            
            if (response.data && response.data.address) {
                return response.data.address;
            }
            return null;
        } catch (error) {
            console.error("Error fetching address from events table:", error);
            return null;
        }
    };

    const getAddressCoordinates = async (address) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    address
                )}`
            );

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return {
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                };
            }

            return null;
        } catch (error) {
            console.error("Error fetching address coordinates:", error);
            return null;
        }
    };

    const initMap = async () => {
        const mapContainer = mapContainerRef.current;
    
        if (!mapContainer) {
            return;
        }
    
        const fetchedAddress = await getAddressFromEventsTable();

        console.log('Address: ', fetchedAddress);
    
        if (fetchedAddress) {
            const coordinates = await getAddressCoordinates(fetchedAddress);
    
            if (coordinates && coordinates.latitude && coordinates.longitude) {
                const { latitude, longitude } = coordinates;
    
                const map = L.map(mapContainer).setView([latitude, longitude], 15);
    
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);

                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                    iconUrl: require('leaflet/dist/images/marker-icon.png'),
                    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
                });

                
                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup("Event Location")
                    .openPopup();
    
                setMapInitialized(true);
            }
        }
    };
    

    useEffect(() => {
        initMap();
    }, []);

    return (
        <div
            id="leaflet-map"
            ref={mapContainerRef}
            style={{ height: "300px", marginTop: "20px" }}
        >
        </div>
    );
}

export default LeafletMap;
