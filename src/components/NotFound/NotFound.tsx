import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = (props: any) => {
  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className={styles["not-found"]}>
      <h1>404</h1>
      <h2>{props.message}</h2>
      <button onClick={goHomeHandler}>Вратите се на почетну</button>
    </div>
  );
};

export default NotFound;
