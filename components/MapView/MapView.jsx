'use client'
import { SelectedBusinessContext, UserLocationContext } from "@/context";
import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api"
import { useContext, useState, useEffect, useRef } from "react";
import { Marker } from "..";

const MapView = ({ businessList, token }) => {

    const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);
    const [map, setMap] = useState(null);
    const [directions, setDirections] = useState(null);
    const directionsRendererRef = useRef(null);
    const previousBusinessListRef = useRef(null);

    const containerStyle = {
        width: '100%',
        height: '70vh',
    };

    const getDirection = () => {
        if (map && selectedBusiness) {
            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: userLocation,
                    destination: selectedBusiness.geometry.location,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === 'OK') {
                        if (directionsRendererRef.current) {
                            // Update existing DirectionsRenderer with new directions
                            directionsRendererRef.current.setDirections(result);
                        } else {
                            // Create a new DirectionsRenderer and attach it to the map
                            directionsRendererRef.current = new google.maps.DirectionsRenderer({
                                map,
                                suppressMarkers: true,
                                routeIndex: 0,
                            });
                            directionsRendererRef.current.setDirections(result);
                        }
                    }
                }
            );
        } else {
            // Clear directions if selectedBusiness is null
            if (directionsRendererRef.current) {
                directionsRendererRef.current.setDirections({ routes: [] }); // Clear directions by passing an empty DirectionsResult object
            }
        }
    };

    useEffect(() => {
        if (token && previousBusinessListRef.current && previousBusinessListRef.current !== token) {
            if (directionsRendererRef.current) {
                directionsRendererRef.current.setDirections({ routes: [] });
                setSelectedBusiness('');
            }
            previousBusinessListRef.current = token;
        } else if (token && !previousBusinessListRef.current) {
            previousBusinessListRef.current = token;
        }
    }, [token])

    useEffect(() => {
        getDirection();
    }, [selectedBusiness]);

    useEffect(() => {
        (map && selectedBusiness) ? map.panTo(selectedBusiness.geometry.location) : '';
    }, [selectedBusiness])

    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={
                    !selectedBusiness?.name ? userLocation : selectedBusiness.geometry.location
                }
                options={{ mapId: '327f00d9bd231a33' }}
                zoom={13}
                onLoad={map => setMap(map)}
            >
                <MarkerF
                    position={userLocation}
                    icon={{
                        url: '/flaticon-map-marker.png',
                        scaledSize: {
                            width: 40,
                            height: 40
                        }
                    }}
                />
                {
                    directions && token &&
                    <DirectionsRenderer
                        directions={directions}
                    />
                }
                {
                    businessList.map((item, idx) => idx <= 7 && (
                        <Marker business={item} key={idx} />
                    ))
                }
            </GoogleMap>
        </div>
    )
}

export default MapView