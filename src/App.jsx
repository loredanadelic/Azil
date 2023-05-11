import "./App.css";
import AppRoutes from "./routes/Routes";
import Header from "./components/Header";
import AdminContext from "./context/adminContext";
import { useState } from "react";
import Requests from "./components/Requests";
import { useEffect } from "react";
import { supabase } from "./utils";
import RequestContext from "./context/requestContext";
import APIErrorProvider from "./context/errorContext";
import ErrorModal from "./components/ErrorModal";

function App() {
  const [admin, setAdmin] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);
  const [length, setLength] = useState(requests.length);
  const fetch = async (name, setData) => {
    const { data } = await supabase
      .from(name)
      .select()
      .order("id", { ascending: false });

    if (data) {
      setData(data);
    }
  };
  useEffect(() => {
    fetch("requests", setRequests);
    setLength(requests.length);
  }, [requests.length]);
 
  return (
    <>
      <AdminContext.Provider value={admin}>
        <APIErrorProvider>
          <RequestContext.Provider value={requests}>
            <Header
              setShowRequests={setShowRequests}
              setAdmin={setAdmin}
              requests={length}
              setRequests={setRequests}
            />
            {showRequests && admin && (
              <>
                <div
                  className="backdrop"
                  onClick={() => {
                    setShowRequests(false);
                  }}
                ></div>
                <Requests
                  requests={requests}
                  fetch={fetch}
                  setRequests={setRequests}
                />
              </>
            )}
            <AppRoutes setRequests={setRequests} />
            <ErrorModal />
          </RequestContext.Provider>
        </APIErrorProvider>
      </AdminContext.Provider>
    </>
  );
}

export default App;
