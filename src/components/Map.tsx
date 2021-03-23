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

class LocationStore {
    private locations: Map<string, Location>;

    constructor() {
        this.locations = new Map<string, Location>();
    }

    public update(data: Location) {
        this.locations.set(data.user, data);
    }

    public getData() {
        return Array.from(this.locations).map(([name, value]) => ({...value}));
    }
}


export function BeeperMap() {
    const [markers, setMarkers] = useState<Location[]>();
    const { user } = useContext(UserContext);

    const mapStyles = {        
        height: "350px",
        width: "100%"
    };

    useEffect(() => {
        socket.emit("getLocations", user.token);

        const l = new LocationStore();

        socket.on("data", (data) => {
            l.update(data.new_val);
        });


        const i = setInterval(() => {
            console.log(l.getData());
            setMarkers(l.getData());
        }, 1000);

        return () => {
            if (i) clearInterval(i);
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
                markers?.map((item) => {
                    return (
                        <Marker
                            icon="/favicon.png"
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

