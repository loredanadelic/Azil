import styles from "./Form.module.css";
const Form = ({
  handleChange,
  action,
  animal,
  handleForm,
  setEdit,
  setAnimal,
  animalOld,
}) => {
  return (
    <form className={styles[action]} onSubmit={handleForm}>
      <div className={styles.firstDiv}>
        <label htmlFor="name">
          Ime: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={animal.name}
          required
          onChange={(e) => {
            handleChange(e, "name");
          }}
        />
        <label htmlFor="animalType">
          Vrsta: <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="animalType"
          name="animalType"
          required
          defaultValue={animal.type}
          onChange={(e) => {
            handleChange(e, "type");
          }}
        >
          <option value="">--Izaberi vrstu--</option>
          <option value="pas">Pas</option>
          <option value="macka">Mačka</option>
          <option value="zec">Zec</option>
          <option value="ostalo">Ostalo</option>
        </select>
        <label htmlFor="animalYears">
          Godine: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="number"
          id="animalYears"
          name="animalYears"
          defaultValue={animal.years}
          required
          onChange={(e) => {
            handleChange(e, "years");
          }}
        />
        <label htmlFor="animalDescription">Opis: </label>
        <input
          id="animalDescription"
          name="animalDescription"
          className={styles.description}
          type="text"
          defaultValue={animal.description}
          required
          onChange={(e) => {
            handleChange(e, "description");
          }}
        />
      </div>
      <div className={styles.secondDiv}>
        <div>
          <label htmlFor="chip">Čipiran</label>
          <input
            id="chip"
            name="chip"
            type="checkbox"
            defaultValue={animal.chip}
            checked={animal.chip && "checked"}
            onChange={(e) => {
              handleChange(e, "chip");
            }}
          />
        </div>
        <label htmlFor="examination">
          Pregled: <span style={{ color: "red" }}>*</span>
        </label>
        <input
          name="examination"
          id="examination"
          type="date"
          defaultValue={animal.examination}
          required
          onChange={(e) => {
            handleChange(e, "examination");
          }}
        />
        <label htmlFor="animalImage">Image: </label>
        <input
          type="url"
          name="animalImage"
          id="animalImage"
          defaultValue={animal.image}
          onChange={(e) => {
            handleChange(e, "image");
          }}
        />
        {action === "edit" && (
          <div>
            <label htmlFor="adopted">Udomljen</label>
            <input
              name="adopted"
              id="adopted"
              type="checkbox"
              defaultValue={animal.adopted}
              checked={animal.adopted && "checked"}
              onChange={(e) => {
                handleChange(e, "adopted");
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <button type="submit" onClick={handleForm}>
          Spremi
        </button>
        {action === "edit" && (
          <button
            type="button"
            onClick={() => {
              setEdit(false);
              setAnimal(animalOld);
            }}
          >
            Odustani
          </button>
        )}
        {action !== "edit" && (
          <p>
            <span style={{ color: "red" }}>*</span> obavezna polja
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
