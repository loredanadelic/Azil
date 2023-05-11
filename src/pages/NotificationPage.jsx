import {  useEffect, useState } from "react";
import { supabase } from "../utils";
import Notification from "../components/notifications/Notification";
import NotificationForm from "../components/notifications/NotificationForm";
import Loading from "../components/Loading";
import useAPIError from "../utils/useApiError";
import styles from './NotificationPage.module.css'
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [addNotification, setAddNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addError } = useAPIError();
  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select()
      .order("id", { ascending: false });
    if (error) {
      addError("pogreška kod dohvata obavijesti");
    }
    if (data) {
      setNotifications(data);
    }
  };
  useEffect(() => {
    fetchNotifications();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return clearTimeout;
  }, []);
  if (notifications.length < 1 && loading) {
    return <Loading />;
  }

  return (
    <div className={styles.notifications}>
      <div className={styles.newNotification}>
        <div className="new">
          <button onClick={() => setAddNotification(true)}>
            Nova obavijesti
          </button>
        </div>
        {addNotification && (
          <NotificationForm
            fetchNotifications={fetchNotifications}
            setAddNotification={setAddNotification}
          />
        )}
      </div>
      <h2>Obavijesti</h2>
      {notifications.length < 1 ? (
        <p style={{ fontSize: "3rem" }}>Nema obavijesti</p>
      ) : (
        notifications.map((notification) => {
          return (
            <Notification
              notification={notification}
              fetchNotifications={fetchNotifications}
              key={notification.id}
            />
          );
        })
      )}
    </div>
  );
};

export default NotificationPage;
