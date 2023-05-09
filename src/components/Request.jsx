import { supabase } from "../utils";

const Request = ({ animal, request, fetch, setRequests }) => {
  const handleClick = async (type) => {
    const { error } = await supabase
      .from("animals")
      .update({ adopted: type === "accept" ? true : false, requested: false })
      .eq("id", animal.id);
    await supabase.from("requests").delete().eq("id", request.id);
    fetch("requests", setRequests);
  };

  return (
    <div>
      <p>Zahtjev za udomljavanje: </p>
      <p>
        {animal.type} {animal.name}
      </p>
      <button onClick={() => handleClick("accept")}>Prihvati</button>
      <button onClick={() => handleClick("decline")}>Odbij</button>
    </div>
  );
};

export default Request;
