import { filterValues } from "../../utils";
import styles from "./Filter.module.css";
const Filter = ({ values, setFilter, name }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <h3>{name==='Filter'? 'Udomljeni': name}</h3>
      <form className={styles.filter}>
        {values.map((v) => {
          return (
            <label key={v} htmlFor="all">
              <input
                defaultChecked={v === "Svi" || (v === "Sve" && "checked")}
                type="radio"
                id="all"
                name="all"
                value={filterValues[name][v]}
                onChange={handleChange}
              />
              {v}
            </label>
          );
        })}
      </form>
    </>
  );
};

export default Filter;
