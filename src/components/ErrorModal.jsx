import useAPIError from "../utils/useApiError";
import styles from "./Modal.module.css";
function ErrorModal() {
  const { error, removeError } = useAPIError();

  const handleSubmit = () => {
    removeError();
  };

  return (
    <div style={{ display: !error && "none" }}>
      <div
        className="backdrop"
        onClick={() => {
          handleSubmit();
        }}
      ></div>
      <div className={styles.modal} >
        <div>
          {error && error.message && <p>{error.message}</p>}
          <button onClick={handleSubmit}>U redu</button>
        </div>
      </div>
    </div>
  );
}
export default ErrorModal;
