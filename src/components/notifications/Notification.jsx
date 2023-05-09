import { useContext } from "react";
import styles from "./Notification.module.css";
import AdminContext from "../../context/adminContext";
import { supabase } from "../../utils";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import useAPIError from "../../utils/useApiError";
const Notification = ({ notification, fetchNotifications }) => {
  const { title, date, message, important, id } = notification;
  const [deleting, setDeleting] = useState(false);
  const { addError } = useAPIError();
  const admin = useContext(AdminContext);
  const handleDelete = async () => {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);
    if (error) {
      addError( 'Pogreška kod brisanja');
    }
    await fetchNotifications();
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.notification}
        style={
          important
            ? { backgroundColor: "#F6906C" }
            : { backgroundColor: "#8AD88F" }
        }
      >
        <p>{title}</p>
        <p>{important && "VAŽNO!!"}</p>
        <p>{date}</p>
      </div>
      <div className={styles.message}>
        <p>{message}</p>
        {admin && (
          <div className={styles.img}>
            <img src="delete.png" onClick={() => setDeleting(true)} />
          </div>
        )}
      </div>
      {deleting && (
        <DeleteModal handleDelete={handleDelete} setDeleting={setDeleting} />
      )}
    </div>
  );
};

export default Notification;
