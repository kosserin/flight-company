import React from "react";
import testimonial1 from "../../assets/testimonial1.png";
import prevIcon from "../../assets/prev-black.svg";
import nextIcon from "../../assets/next.svg";
import shape from "../../assets/shape.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Testimonials.module.css";
import { Navigation } from "swiper";

interface Testimonial {
  image: string;
  name: string;
  title: string;
  comment: string;
}

const DUMMY_TESTIMONIALS: Testimonial[] = [
  {
    image: "/assets/testimonials/testimonial1.png",
    name: "Милена Даниловић",
    title: "Директор предузећа Мишлок",
    comment:
      "Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет. Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет. Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет.",
  },
  {
    image: "/assets/testimonials/testimonial1.png",
    name: "Милена Даниловић",
    title: "Директор предузећа Мишлок",
    comment:
      "Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет. Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет. Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет.",
  },
  {
    image: "/assets/testimonials/testimonial1.png",
    name: "Милена Даниловић",
    title: "Директор предузећа Мишлок",
    comment:
      "Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет. Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет. Амет миним моллит нон десерунт улламцо ест сит алиqуа долор до амет синт. Велит оффициа цонсеqуат дуис еним велит моллит. Еџерцитатион вениам цонсеqуат сунт ноструд амет.",
  },
];

const Testimonials = () => {
  return (
    <section className={styles["testimonials-section"]}>
      <h2>Рекли су о нама</h2>
      <div className={styles["testimonials-holder"]}>
        <div className={styles["another-div-for-buttons"]}>
          <Swiper
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            modules={[Navigation]}
            className={styles["testimonials-swiper"]}
            slidesPerView={1}
            breakpoints={{
              1: {
                spaceBetween: 20,
              },
              968: {
                spaceBetween: 0,
              },
            }}
          >
            {DUMMY_TESTIMONIALS.map((testimonial, index) => {
              return (
                <SwiperSlide
                  className={styles["testimonial-swiper-slide"]}
                  key={"" + testimonial + index}
                >
                  <div className={styles["testimonial-inner"]}>
                    <img src={testimonial.image} alt="" />
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.title}</span>
                    <p>{testimonial.comment}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button
            className={`${styles["testimonial-prev"]} ${styles["testimonial-button"]} testimonial-prev`}
          >
            <img src={prevIcon} alt="" />
          </button>
          <button
            className={`${styles["testimonial-next"]} ${styles["testimonial-button"]} testimonial-next`}
          >
            <img src={nextIcon} alt="" />
          </button>
        </div>
        <img className={styles.shape} src={shape} alt="" />
      </div>
    </section>
  );
};

export default Testimonials;
