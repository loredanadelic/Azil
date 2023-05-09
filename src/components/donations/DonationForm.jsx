import { useState } from "react";
import styles from "./DonationForm.module.css";
import Modal from "../Modal";
const DonationForm = ({ handleAddDonation, setAddDonation }) => {
  const [donation, setDonation] = useState({
    type: "",
    value: null,
    description: null,
  });
  const handleChange = (e, key) => {
    setDonation((prev) => ({ ...prev, [key]: e.target.value }));
  };
  return (
    <Modal>
      <form
        onSubmit={(e) => {
          if (
            donation.type !== null &&
            donation.type !== "" &&
            donation.value !== null
          ) {
            handleAddDonation(e, donation);
          }
        }}
      >
        <label htmlFor="type">Vrsta donacije</label>
        <select
          id="type"
          name="type"
          required
          onChange={(e) => handleChange(e, "type")}
        >
          <option value="">--Izaberi tip donacije--</option>
          <option value="Hrana">Hrana</option>
          <option value="Lijekovi">Lijekovi</option>
          <option value="Igracke">Igračke</option>
          <option value="Veterinarski troškovi">Veterinarski troškovi</option>
          <option value="Ostalo">Ostalo</option>
        </select>
        <label htmlFor="years">Vrijednost: </label>
        <input
          type="number"
          id="years"
          name="years"
          required
          onChange={(e) => handleChange(e, "value")}
        />
        <label htmlFor="description">Opis: </label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => handleChange(e, "description")}
        />
        <div className={styles.buttons}>
          <button type="submit">Pošalji</button>
          <button type="button" onClick={(e) => setAddDonation(false)}>
            Odustani
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default DonationForm;
