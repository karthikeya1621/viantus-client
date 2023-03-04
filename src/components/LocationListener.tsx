import { useLocation } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const LocationListener = (props: any) => {
    const location = useLocation();
    const { setLocation } = useContext(AppContext);

    useEffect(() => {
        setLocation(location);
    }, [location]);

    return <>{props.children}</>;
}

export default LocationListener;