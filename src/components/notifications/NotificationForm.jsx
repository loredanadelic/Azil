import { useContext, useState } from "react";
import AdminContext from "../../context/adminContext";
import { supabase } from "../../utils";
import styles from "./NotificationForm.module.css";
import useAPIError from "../../utils/useApiError";
const NotificationForm = ({ fetchNotifications, setAddNotification }) => {
  const [notification, setNotification] = useState({
    title: null,
    message: null,
    important: false,
    date: "",
  });
  const { addError } = useAPIError();
  const admin = useContext(AdminContext);

  const handleChange = (e, type) => {
    setNotification((prev) => ({
      ...prev,
      [type]: type !== "important" ? e.target.value : e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotification = {
      ...notification,
      date: new Date().toLocaleDateString(),
    };
    const {error}=await supabase.from("notifications").insert([newNotification]);
    if(error){
      addError('Pogreška kod dodavanja obavijesti')
    }
    await fetchNotifications();
    setAddNotification(false);
  };
  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label>Naslov: </label>
        <input
          type="text"
          onChange={(e) => {
            handleChange(e, "title");
          }}
           maxLength="20"
        />
        <label>Tekst: </label>
        <textarea
          onChange={(e) => {
            handleChange(e, "message");
          }}
          minLength="10" maxLength="200"
        />
        {admin && (
          <>
            <label>Važno</label>
            <input
              type="checkbox"
              onChange={(e) => {
                handleChange(e, "important");
              }}
            />
          </>
        )}
        <div className={styles.buttons}>
          <button type="submit">Spremi</button>
          <button type="button" onClick={()=>setAddNotification(false)}>Odustani</button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
