import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import React, {useContext, useEffect, useState} from "react";
import socket from "../utils/Socket";
import { UserContext } from "../UserContext";

interface Location {
    id: string;
    latitude: number;
    longitude: number;
    user: string;
}

export function Map() {
    const [markers, setMarkers] = useState<Location[]>([]);
    const { user } = useContext(UserContext);

    const mapStyles = {        
        height: "350px",
        width: "100%"
    };

    useEffect(() => {
        socket.emit("getLocations", user.token);

        socket.on("data", (data) => {
            let temp = markers;
            temp = [...temp, data.new_val];
            setMarkers([...temp]);
        });

        return () => {
            socket.emit("stopLocations");
        };
    }, []);

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBgabJrpu7-ELWiUIKJlpBz2mL6GYjwCVI'
        >
            <GoogleMap
                zoom={13}
                center={{ lat: 36.2146, lng: -81.67326 }}
                mapContainerStyle={mapStyles}
            >
            {
                markers.map((item) => {
                    return (
                        <Marker
                            key={item.user}
                            title={item.user} 
                            label={item.user}
                            position={{
                                lat: item.latitude,
                                lng: item.longitude
                            }}
                        />
                    );
                })
            }
            </GoogleMap>
        </LoadScript>
    );
}

