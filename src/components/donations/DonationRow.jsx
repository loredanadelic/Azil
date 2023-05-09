import { useContext, useState } from "react";
import AdminContext from "../../context/adminContext";
import styles from "./DonationRow.module.css";
import DeleteDonation from "./DeleteDonation";

const DonationRow = ({ donation, category, handleClick }) => {
  const [deleting, setDeleting] = useState(false);

  const admin = useContext(AdminContext);
  return (
    <>
      <tr className={styles.tr}>
        <td>{donation.type}</td>
        <td>{donation.value}</td>
        <td>{donation.description}</td>
        {admin && category === "trazi" && (
          <td>
            {deleting ? (
              <DeleteDonation
                setDeleting={setDeleting}
                handleClick={handleClick}
                id={donation.id}
              />
            ) : (
              <>
                <button onClick={(e) => handleClick(e, donation.id, "donate")}>
                  Donirano
                </button>
                <button onClick={() => setDeleting(true)}>Izbriši</button>
              </>
            )}
          </td>
        )}
        {!admin && category === "trazi" && (
          <td>
            <button onClick={(e) => handleClick(e, donation.id, "donate")}>
              Doniraj
            </button>
          </td>
        )}
        {admin && category === "nudi" && (
          <td>
            <button onClick={(e) => handleClick(e, donation.id, "donate")}>
              Prihvati
            </button>
          </td>
        )}
        {admin && category === "donirano" && (
          <td>
            {deleting ? (
              <DeleteDonation
                setDeleting={setDeleting}
                handleClick={handleClick}
                id={donation.id}
              />
            ) : (
              <>
                <button
                  onClick={(e) => handleClick(e, donation.id, "need", donation)}
                >
                  Ponovi
                </button>
                <button onClick={() => setDeleting(true)}>Izbriši</button>
              </>
            )}
          </td>
        )}
        {!admin && category !== "trazi" && <td></td>}
      </tr>
    </>
  );
};

export default DonationRow;
