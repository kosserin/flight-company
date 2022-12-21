import { useEffect, useState } from "react";
import styles from "./ContactModal.module.css";
import failed from "../../assets/status/failed.png";
import success from "../../assets/status/success.png";
import axios from "axios";

const OuterModal = (props: any) => {
  return <div onClick={() => props.closeModal()} className={styles["outer-modal"]}></div>;
};

const InnerModal = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let content = (
    <div className={styles["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  if (isLoading) {
    content = (
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (error) {
    content = (
      <div className={styles["inner-modal"]}>
        <img src={failed} alt="" />
        <p>{error}</p>
        <button
          className="submit-button"
          onClick={() => {
            props.closeModal();
          }}
        >
          Затворите
        </button>
      </div>
    );
  }

  if (!isLoading && !error) {
    content = (
      <div className={styles["inner-modal"]}>
        <img src={success} alt="" />
        <p>Ваша порука је забележена. Обратићемо Вам се у најкраћем року.</p>
        <button className="submit-button" onClick={() => props.closeModal()}>
          Затворите
        </button>
      </div>
    );
  }

  const sendContactForm = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await axios.get("https://jsonplaceholder.typicode.com/users");
      setIsLoading(false);
    } catch (err) {
      setError("Ваша порука није забележена. Молимо покушајте поново касније.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendContactForm();
  }, []);

  return <div className={styles["inner-modal"]}>{content}</div>;
};

const ContactModal = (props: any) => {
  return (
    <>
      <OuterModal closeModal={props.closeModal} />
      <InnerModal closeModal={props.closeModal} />
    </>
  );
};

export default ContactModal;
