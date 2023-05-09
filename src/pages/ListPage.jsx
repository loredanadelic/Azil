import { useEffect, useMemo, useState } from "react";
import Animal from "../components/animalsList/Animal";
import Filter from "../components/animalsList/Filter";
import { filtering, supabase } from "../utils";
import Loading from "../components/Loading";
import { useContext } from "react";
import RequestContext from "../context/requestContext";
import useAPIError from "../utils/useApiError";
import { useRef } from "react";
import isDeepEqual from "fast-deep-equal/react";
import styles from "./ListPage.module.css";
const ListPage = ({ setRequests }) => {
  const [animalsList, setAnimalsList] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addError } = useAPIError();
  const requests = useContext(RequestContext);
  const animalRef = useRef(animalsList);

  if (!isDeepEqual(animalRef.current, animalsList)) {
    animalRef.current = animalsList;
  }
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("animals")
      .select()
      .order("id", { ascending: true});
    if (error) {
      addError("Neuspješno dohvaćanje podataka");
    }
    if (data) {
      setAnimalsList(data);
      setFilteredAnimals(data);
    }
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return clearTimeout;
  }, [requests.length]);
  useEffect(() => {
    setFilteredAnimals(filtering(animalsList, filter, type, search));
  }, [filter, type, requests.length, animalRef.current, search]);
  if (loading && animalsList.length < 1) {
    return <Loading />;
  }
  return (
    <div className={styles.list}>
      <div>
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <label htmlFor="search">Pretraži ljubimca</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Unesi ime"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <Filter
          values={["Svi", "Udomljen", "Nije udomljen"]}
          name={"Filter"}
          setFilter={setFilter}
        />
        <Filter
          values={["Sve", "Mačka", "Pas", "Zec"]}
          name={"Vrsta"}
          setFilter={setType}
        />
      </div>
      <div className={styles.listGrid}>
        {filteredAnimals.length < 1 ? (
          <p style={{ fontSize: "2rem" }}>Nema životinja</p>
        ) : (
          filteredAnimals.map((animal) => {
            return (
              <Animal
                key={animal.id}
                animal={animal}
                setAnimals={setAnimalsList}
                setRequests={setRequests}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListPage;
