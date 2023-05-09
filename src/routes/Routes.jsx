import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import ListPage from "../pages/ListPage";
import DonationPage from "../pages/DonationPage";
import NotificationPage from "../pages/NotificationPage";
import InputPage from "../pages/InputPage";
const AppRoutes = ({setRequests}) => {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/list" element={<ListPage setRequests={setRequests} />} />
        <Route path="/donations" element={<DonationPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/input" element={<InputPage />} />
      </Routes>
  );
};

export default AppRoutes;
