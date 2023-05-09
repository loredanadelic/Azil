import { useContext, useEffect, useState } from "react";
import { actionTypes, supabase } from "../utils";
import DonationTable from "../components/donations/DonationTable";
import DonationForm from "../components/donations/DonationForm";
import AdminContext from "../context/adminContext";
import Loading from "../components/Loading";
import useAPIError from "../utils/useApiError";
import styles from './DonationPage.module.css'
const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [addDonation, setAddDonation] = useState(false);
  const [loading, setLoading] = useState(true);
  const admin = useContext(AdminContext);
  const { addError} = useAPIError();
  const fetchDonations = async () => {
    const { data, error } = await supabase
      .from("donations")
      .select()
      .order("id", { ascending: true });

    if (error) {
      addError("Pogreška kod dohvata podataka.");
    }
    if (data) {
      setDonations(data);
    }
  };

  const handleDonation = () => {
    setAddDonation(true);
  };

  const handleAddDonation = async (e, donation) => {
    e.preventDefault();
    const newDonation = { ...donation, category: admin ? "trazi" : "nudi" };
    
    const response = await supabase.from("donations").insert([newDonation]);
    if (response.error) {
      addError("Pogreška kod unosa nove donacije");
    } else {
      await fetchDonations();
    }
    setAddDonation(false);
  };
  const handleClick = async(e, id, action, donation) => {
    const error =await  actionTypes[action](id, donation);
    if (error !== null) {
      addError("Pogreška");
    }
    await fetchDonations();
  };
  useEffect(() => {
    fetchDonations();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return clearTimeout;
  }, []);
  if (loading && donations.length < 1) {
    return <Loading />;
  }
  return (
    <>
      <div className="new" style={{ marginTop: "2.5rem" }}>
        <button onClick={handleDonation}>Nova donacija</button>
      </div>
      {addDonation && (
        <>
          <div
            className="backdrop"
            onClick={() => {
              setAddDonation(false);
            }}
          ></div>
          <DonationForm
            handleAddDonation={handleAddDonation}
            setAddDonation={setAddDonation}
          />
        </>
      )}
      <div className={styles.donation}>
        <h3>Tražimo</h3>
        <DonationTable
          category="trazi"
          donations={donations}
          setDonations={setDonations}
          handleClick={handleClick}
        />
      </div>
      <div className={styles.donation}>
        <h3>Nudi se</h3>
        <DonationTable
          category="nudi"
          donations={donations}
          setDonations={setDonations}
          handleClick={handleClick}
        />
      </div>
      <div className={styles.donation}>
        <h3>Donirano</h3>
        <DonationTable
          category="donirano"
          donations={donations}
          setDonations={setDonations}
          handleClick={handleClick}
        />
      </div>
    </>
  );
};

export default DonationPage;
