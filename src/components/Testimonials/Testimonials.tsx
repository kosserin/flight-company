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
  image: any;
  name: string;
  title: string;
  comment: string;
}

const DUMMY_TESTIMONIALS: Testimonial[] = [
  {
    image: "milena_danilovic.png",
    name: "Милена Даниловић",
    title: "Менаџер компаније Појтек",
    comment:
      "Први пут сам била у „најбољој авио-компанији“ и нисам разочарана. Авионик нуди висок ниво услуге и удобности од почетка до краја путовања. Била сам забринута због хаотичне ситуације на европским аеродромима овог лета, али улазак и обезбеђење у Франкфурту су били брзи и ефикасни. Трансфер у Доха Хамаду је такође био веома добар. И желим да напоменем да постоји разлика између типова авиона 777-300ER и А350-900. Дефинитивно више волим А350 јер су седишта шира, IFE има више садржаја, мапа лета и амбијент/дизајн су бољи. Свеукупно веома добро искуство за ниску цену.",
  },
  {
    image: "zoran_jankovic.png",
    name: "Зоран Јанковић",
    title: "Директор Фастека",
    comment:
      "Први пут сам резервисао економичан лет код Авионика, знајући да је лет релативно кратак. Обично летим пословном класом на дужим летовима са Катар Аирваис-ом. Квалитет услуге је био беспрекоран, а особље такође љубазно. Исто важи и за чистоћу унутрашњости кабине и тоалета. Ове године сам обавио око 10 летова са различитим авио-компанијама и Авионик се јасно истиче по квалитету, при пријави као и по искуству лета.",
  },
  {
    image: "milos_savic.png",
    name: "Милош Савић",
    title: "Оснивач Дентера",
    comment:
      "Апсолутно дивно искуство на сва 3 лета са Авиоником. Невероватна услуга пре лета, на земљи и у ваздуху. Седишта су била удобна (довољно да сам по повратку и после 40+ година редовних летова за Азију и Африку по први пут спавао, и у сваком случају по дуго времена). Сваки пут сам имао седиште у излазном реду, као што је унапред резервисано. Храна је била укусна –  пилетина је била укусна, заситна и свежа – за разлику од оброка других авио-компанија, нисам се осећао тешко или масно после оброка. Осећао сам се одморније и опуштеније него када сам летео за Аустралију из Торонта преко западне обале. Једноставно не могу рећи довољно сјајних ствари о Авионику!",
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
                    <img
                      src={require(`../../assets/testimonials/${testimonial.image}`)}
                      alt=""
                    />
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
