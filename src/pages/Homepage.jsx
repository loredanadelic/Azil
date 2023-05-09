import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/Map";
import Form from "../components/homepage/Form";
import Loading from "../components/Loading";
import styles from './Homepage.module.css'
const Homepage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBftISkUmzgpVj6Wr28W5eb4jIoiuzNeYA",
  });
  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className={styles.homepage}>
      <Map />
      <div>
        <p>Azil za životinje Split</p>
        <p>Adresa: Vukovarska 33, Split</p>
        <p>Kontakt: azil@example.com</p>
        <Form />
      </div>
    </div>
  );
};

export default Homepage;
