import { useRef, useState } from "react";
import styles from "./AchievementItem.module.css";
import arrowUpIcon from "../../../assets/arrow-up.svg";

const AchievementItem = (props: any) => {
  const [showContent, setShowContent] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const headerClickHandler = () => {
    setShowContent((prev) => {
      return !prev;
    });
  };

  return (
    <li className={`${styles["item-holder"]} ${showContent ? styles["item-active"] : ""}`} ref={itemRef}>
      <div className={styles["item-header"]} onClick={headerClickHandler}>
        <div className={styles["header-holder"]}>
          <h4>{props.item.title}</h4>
          <img src={arrowUpIcon} alt="" />
        </div>
      </div>
      <div className={`${styles["item-content"]}`}>
        {props.item.content.map((subcontent: any, index: number) => {
          return (
            <div key={"achievement-item__subcontent" + index} className={styles["content-div"]}>
              <h5>{subcontent.header}</h5>
              <p>{subcontent.text}</p>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default AchievementItem;
