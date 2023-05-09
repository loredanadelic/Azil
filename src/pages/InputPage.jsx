import { useContext, useState } from "react";
import AdminContext from "../context/adminContext";
import Form from "../components/animalsList/Form";
import { validateAnimalInput } from "../utils/validations";
import { animalData, supabase } from "../utils";
import { useNavigate } from "react-router-dom";
import useAPIError from "../utils/useApiError";
const InputPage = () => {
  const [animal, setAnimal] = useState(animalData);
  const admin = useContext(AdminContext);
  const navigate = useNavigate();
  const { addError } = useAPIError();
  const handleChange = (e, type) => {
    if (type === "chip") {
      setAnimal((prev) => ({ ...prev, [type]: e.target.checked }));
    } else {
      setAnimal((prev) => ({ ...prev, [type]: e.target.value }));
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    if (validateAnimalInput(animal)) {
      const { error } = await supabase.from("animals").insert([
        {
          name: animal.name,
          years: animal.years,
          examination: animal.examination,
          adopted: animal.adopted,
          image: animal.image,
          type: animal.type,
          chip: animal.chip,
          description: animal.description,
        },
      ]);
      if (error) {
        addError("Pogreška kod slanja podataka");
        return;
      }
      setAnimal(() => animalData);
      navigate("/list");
    } else {
      addError("Nisu uneseni potrebni podaci");
    }
  };

  if (!admin) {
    return <h1>Not authorised!</h1>;
  }

  return (
    <div>
      <div>
        <h3>Unos nove životinje</h3>
      </div>
      <div>
        <Form
          handleChange={handleChange}
          action="add"
          animal={animal}
          handleForm={handleAdd}
        />
      </div>
    </div>
  );
};

export default InputPage;
