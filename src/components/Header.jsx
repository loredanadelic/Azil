import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { useContext } from "react";
import AdminContext from "../context/adminContext";
import ToggleButton from "./ToggleButton";
const Header = ({ setAdmin, setShowRequests, requests, setRequests }) => {
  const admin = useContext(AdminContext);
  const active = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#8AD88F" : "",
      color: isActive ? "#676767" : "",
    };
  };

  return (
    <div className={style.header}>
      <div className={style.headerWrapper}>
        <h1>Azil za životinje</h1>
        <div className={style.toggle}>
          <p>Admin</p>
          <ToggleButton label="Admin" setAdmin={setAdmin} />
        </div>
      </div>
      <nav className={style.headerWrapper}>
        <NavLink style={active} className={style.link} to="/">
          O nama
        </NavLink>
        <NavLink style={active} className={style.link} to="/list">
          Popis
        </NavLink>
        <NavLink style={active} className={style.link} to="/donations">
          Donacije
        </NavLink>
        <NavLink style={active} className={style.link} to="/notifications">
          Obavijesti
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            backgroundColor: !admin ? "#8F8F8F" : isActive ? "#8AD88F" : "",
            color: isActive ? "#676767" : "",
            cursor: !admin && "not-allowed",
          })}
          className={style.link}
          to={admin && "/input"}
          title={!admin ? "Morate biti prijavljeni kao administrator" : ""}
          onClick={
            !admin &&
            (() => {
              alert("morate biti prijavljeni kao administrator");
            })
          }
        >
          Unos
        </NavLink>
        {admin && (
          <div className={style.image}>
            <img
              src="notification.png"
              onClick={async () => {
                setShowRequests((prev) => !prev);
              }}
            />
            {requests !== 0 && <span>{requests}</span>}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
