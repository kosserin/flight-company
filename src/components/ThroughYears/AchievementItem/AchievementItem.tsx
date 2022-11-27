import { useRef, useState } from "react";
import styles from "./AchievementItem.module.css";
import arrowUpIcon from "../../../assets/arrow-up.svg";

const AchievementItem = () => {
  const [showContent, setShowContent] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const headerClickHandler = () => {
    setShowContent((prev) => {
      return !prev;
    });
  };

  return (
    <li
      className={`${styles["item-holder"]} ${
        showContent ? styles["item-active"] : ""
      }`}
      ref={itemRef}
    >
      <div className={styles["item-header"]} onClick={headerClickHandler}>
        <div className={styles["header-holder"]}>
          <h4>1927 - 1947: Оснивање, раст и престанак рада Аеропута</h4>
          <img src={arrowUpIcon} alt="" />
        </div>
      </div>
      <div className={`${styles["item-content"]}`}>
        <div className={styles["content-div"]}>
          <h5>1927</h5>
          <p>
            У јуну је основано Друштво за ваздушни саобраћај Аеропут. Национални
            авио-превозник Краљевине Срба, Хрвата и Словенаца, а потом Краљевине
            Југославије, Аеропут је био међу првим цивилним авио-компанијама -
            10. у Европи и 21. у свету.
          </p>
        </div>
        <div className={styles["content-div"]}>
          <h5>1927</h5>
          <p>
            У јуну је основано Друштво за ваздушни саобраћај Аеропут. Национални
            авио-превозник Краљевине Срба, Хрвата и Словенаца, а потом Краљевине
            Југославије, Аеропут је био међу првим цивилним авио-компанијама -
            10. у Европи и 21. у свету.
          </p>
        </div>
        <div className={styles["content-div"]}>
          <h5>1927</h5>
          <p>
            У јуну је основано Друштво за ваздушни саобраћај Аеропут. Национални
            авио-превозник Краљевине Срба, Хрвата и Словенаца, а потом Краљевине
            Југославије, Аеропут је био међу првим цивилним авио-компанијама -
            10. у Европи и 21. у свету.
          </p>
        </div>
        <div className={styles["content-div"]}>
          <h5>1927</h5>
          <p>
            У јуну је основано Друштво за ваздушни саобраћај Аеропут. Национални
            авио-превозник Краљевине Срба, Хрвата и Словенаца, а потом Краљевине
            Југославије, Аеропут је био међу првим цивилним авио-компанијама -
            10. у Европи и 21. у свету.
          </p>
        </div>
        <div className={styles["content-div"]}>
          <h5>1927</h5>
          <p>
            У јуну је основано Друштво за ваздушни саобраћај Аеропут. Национални
            авио-превозник Краљевине Срба, Хрвата и Словенаца, а потом Краљевине
            Југославије, Аеропут је био међу првим цивилним авио-компанијама -
            10. у Европи и 21. у свету.
          </p>
        </div>
        <div className={styles["content-div"]}>
          <h5>1927</h5>
          <p>
            У јуну је основано Друштво за ваздушни саобраћај Аеропут. Национални
            авио-превозник Краљевине Срба, Хрвата и Словенаца, а потом Краљевине
            Југославије, Аеропут је био међу првим цивилним авио-компанијама -
            10. у Европи и 21. у свету.
          </p>
        </div>
      </div>
    </li>
  );
};

export default AchievementItem;
