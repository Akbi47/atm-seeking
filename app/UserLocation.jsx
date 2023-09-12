'use client'
import { useEffect, useState } from 'react'
import { UserLocationContext } from '@/context';

const UserLocation = ({ children }) => {
    const [userLocation, setUserLocation] = useState([]);

    useEffect(() => {
        getUserLocation();
    }, [])

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        })
    }
    return (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </UserLocationContext.Provider>

    )
}

export default UserLocation