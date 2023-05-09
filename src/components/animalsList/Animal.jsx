import { useContext, useEffect, useState } from "react";
import styles from "./Animal.module.css";
import AdminContext from "../../context/adminContext";
import Form from "./Form";
import { validateAnimalInput } from "../../utils/validations";
import { animalData, getAnimalImage, supabase } from "../../utils";
import useAPIError from "../../utils/useApiError";
import Modal from "../Modal";

const Animal = ({ animal, setAnimals, setRequests }) => {
  const {
    id,
    name,
    type,
    description,
    examination,
    adopted,
    chip,
    years,
    image,
    requested,
  } = animal;
  const [adopt, setAdopt]=useState(false);
  const { addError } = useAPIError();
  const status = adopted ? "Udomljen" : "Nije udomljen";
  const admin = useContext(AdminContext);
  const [edit, setEdit] = useState(false);
  const [editAnimal, setEditAnimal] = useState(animalData);

  const handleChange = (e, type) => {
    if (type === "chip" || type === "adopted") {
      setEditAnimal((prev) => ({ ...prev, [type]: e.target.checked }));
    } else {
      setEditAnimal((prev) => ({ ...prev, [type]: e.target.value }));
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    if (validateAnimalInput(animal)) {
      const { error } = await supabase
        .from("animals")
        .update({
          name: editAnimal.name,
          years: editAnimal.years,
          examination: editAnimal.examination,
          adopted: editAnimal.adopted,
          image: editAnimal.image,
          type: editAnimal.type,
          chip: editAnimal.chip,
          description: editAnimal.description,
        })
        .eq("id", id);
      if (error) {
        addError("Pogrešna izmjena podataka");
        return;
      }
    } else {
      addError("Neuspješna izmjena podataka");
    }
    const { data, error } = await supabase
      .from("animals")
      .select()
      .order("id", { ascending: true });
    if (error) {
      addError("Neuspješno dohvaćanje podataka");
    }
    if (data) {
      setAnimals(data);
    }
    setEdit(false);
  };
  useEffect(() => {
    setEditAnimal({
      name,
      type,
      description,
      examination,
      chip,
      adopted,
      years,
      image,
    });
  }, [id]);
  const handleAdopt = async () => {
    const { error } = await supabase
      .from("requests")
      .insert([{ petId: Number(id) }]);
    if (error) {
      addError("Neuspješno");
      return;
    }
    await supabase.from("animals").update({ requested: true }).eq("id", id);
    const response = await supabase
      .from("requests")
      .select()
      .order("id", { ascending: false });

    if (response.data) {
      setRequests(response.data);
    }
    setAdopt(true)
  };
  if (edit && admin) {
    return (
      <Form
        handleChange={handleChange}
        action="edit"
        animal={editAnimal}
        handleForm={handleEdit}
        setEdit={setEdit}
      />
    );
  }
  return (
    <div
      style={{ backgroundColor: !adopted ? "#F6906C" : "#8AD88F" }}
      className={styles.container}
    >
      <div className={styles.animal}>
        <div className={styles.image}>
          <img src={image || getAnimalImage(type)} />
        </div>
        <div className={styles.text}>
          <p>Ime: {name}</p>
          <p>Vrsta: {type}</p>
          <p>Status: {status}</p>
        </div>
      </div>
      <p>Opis: {description}</p>
      <div className={styles.buttons}>
        {!adopted && !requested && !admin && <button onClick={handleAdopt}>Udomi</button>}
        {admin && (
          <button onClick={() => setEdit((prev) => !prev)}>Uredi</button>
        )}
      </div>
      {adopt && <Modal><p>Poslan zahtjev za udomljavanjem.</p><button onClick={()=>setAdopt(false)}>U redu</button></Modal>}
    </div>
  );
};

export default Animal;
