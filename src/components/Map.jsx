import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import styles from "../pages/Homepage.module.css";
const Map = () => {
  const center = useMemo(() => ({ lat: 43.511448, lng: 16.449386 }), []);
  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName={styles["map-container"]}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default Map;
