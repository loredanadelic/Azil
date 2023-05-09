import { useEffect } from "react";
import { useState } from "react";
import style from "./Header.module.css";
import Loading from "./Loading";
import Request from "./Request";
const Requests = ({ requests, fetch, setRequests }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("animals", setAnimals);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return clearTimeout;
  }, []);
  if (loading) {
    return (
      <div className={style.requests}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={style.requests}>
      {requests.length < 1 && <p>No requests</p>}
      {requests.map((request) => {
        const animal = animals.find((a) => a.id == request.petId);
        if (animal?.name !== undefined) {
          return (
            <Request
              key={request.id}
              animal={animal}
              request={request}
              fetch={fetch}
              setRequests={setRequests}
            />
          );
        }
      })}
    </div>
  );
};

export default Requests;
