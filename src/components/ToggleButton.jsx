import { useContext, useState } from "react";
import AdminContext from "../context/adminContext";
import style from "./ToggleButton.module.css";

const ToggleButton = ({ setAdmin }) => {
  const admin = useContext(AdminContext);
  return (
    <label className={style.toggle}>
      <input
        type="checkbox"
        defaultChecked={admin}
        onClick={() => {
          setAdmin((prev) => !prev);
        }}
      />
      <span />
    </label>
  );
};

export default ToggleButton;
