import DonationRow from "./DonationRow";
import styles from "./DonationTable.module.css";
const DonationTable = ({ category, donations, handleClick }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Tip</th>
          <th>Vrijednost</th>
          <th>Opis</th>
        </tr>
      </thead>
      <tbody>
        {donations.map((donation) => {
          if (donation.category === category) {
            return (
              <DonationRow
                key={donation.id}
                donation={donation}
                category={category}
                handleClick={handleClick}
              />
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default DonationTable;
