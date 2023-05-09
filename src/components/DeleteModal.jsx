import styles from "./DeleteModal.module.css";
import Modal from "./Modal";

const DeleteModal = ({ handleDelete, setDeleting, id }) => {
  return (
    <>
      <div
        className="backdrop"
        onClick={() => {
          setDeleting(false);
        }}
      ></div>
      <Modal>
        <p>Jeste li sigurni da želite obrisati?</p>
        <div>
          <button
            onClick={(e) => {
              if (id) {
                handleDelete(e, id, "delete");
                setDeleting(false);
              } else {
                handleDelete();
                setDeleting(false);
              }
            }}
          >
            Izbriši
          </button>
          <button onClick={() => setDeleting(false)}>Odustani</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
