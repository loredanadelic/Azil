import styles from "./Form.module.css";
const Form = () => {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <form className={styles.form} onSubmit={handleClick}>
      <label htmlFor="email">E-mail:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="message">Poruka: </label>
      <textarea id="message" name="message" required />
      <button type="submit">Pošalji</button>
    </form>
  );
};

export default Form;
