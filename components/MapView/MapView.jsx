'use client'
import { SelectedBusinessContext, UserLocationContext } from "@/context";
import { DirectionsRenderer, GoogleMap, MarkerF, DirectionsService } from "@react-google-maps/api"
import { useContext, useState, useEffect } from "react";
import { Marker } from "..";

const MapView = ({ businessList }) => {

    const directionsService = new google.maps.DirectionsService(); // Initialize DirectionsService
    const directionsRenderer = new google.maps.DirectionsRenderer(); // Initialize DirectionsRenderer
    const { userLocation, setUserLocation } = useContext(UserLocationContext)
    const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext)
    const [map, setMap] = useState(null);
    const [directions, setDirections] = useState(null);
    const containerStyle = {
        width: '100%',
        height: '70vh',
    };

    const getDirection = () => {
        const directionsService = DirectionsService();
        const directionsRenderer = DirectionsRenderer();
        if (map && selectedBusiness) {
            directionsService.route(
                {
                    origin: userLocation,
                    destination: selectedBusiness.geometry.location,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {

                    directionsRenderer.setOptions({
                        map: map, // Your Google Map instance

                        suppressMarkers: true, // Hide the default markers
                        routeIndex: 0
                    });

                    directionsRenderer.setDirections(result);
                }
            );
        }
    }
    useEffect(() => {
        getDirection();
    }, [selectedBusiness]);

    // getDirection();

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
                suppressMarkers={true}
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
                    directions &&
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