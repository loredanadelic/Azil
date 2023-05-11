import { useState } from "react";
import styles from "./Form.module.css";
const Form = () => {
  const [values, setValues] = useState({ email: "", message: "" });
  const handleClick = (e) => {
    e.preventDefault();
    setValues({ email: "", message: "" });
  };
  const handleChange = (e, name) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <form className={styles.form} onSubmit={handleClick}>
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        value={values.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <label htmlFor="message">Poruka: </label>
      <textarea
        id="message"
        name="message"
        required
        value={values.message}
        onChange={(e) => handleChange(e, "message")}
      />
      <button type="submit">Pošalji</button>
    </form>
  );
};

export default Form;
