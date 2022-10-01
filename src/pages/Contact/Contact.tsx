import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <section className={styles["contact-section"]}>
      <Header color="dark" />
      <ContactForm />
      <Footer />
    </section>
  );
};

export default Contact;
