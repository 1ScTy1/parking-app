import style from "./style.module.scss";
import arrow from "../../assets/arrow.svg";
import scan from "../../assets/scan.svg";
import checkMark from "../../assets/checkMark.svg";
import card from "../../assets/card.svg";
import calendar from "../../assets/calendar.svg";
import cvv from "../../assets/cvv.svg";
import masterCard from "../../assets/masterCard.svg";
import visa from "../../assets/visa.svg";
import ellipse from "../../assets/ellipse.svg"

const AddCard = () => {
  return (
    <main className={style.addCard}>
      <section className={style.addCard__top}>
        <img src={arrow} alt="arrow" />
        <h3>Добавить карту</h3>
        <img src={scan} alt="scanIcon" />
      </section>
      <section className={style.addCard__cards}>
        <div className={style.addCard__cardsLeft}>
          <img src={checkMark} className={style.checkMark} alt="checkMark" />
          <div className={style.addCard__cardsLeftMain}>
            <img src={masterCard} className={style.card} alt="masterCard" />
            <p>Mastercard</p>
          </div>
        </div>
        <div className={style.addCard__cardsRight}>
          <img src={ellipse} className={style.checkMark} alt="" />
          <div className={style.addCard__cardsRightMain}>
            <img src={visa} className={style.card} alt="visaCard" />
            <p>Visa</p>
          </div>
        </div>
      </section>
      <section className={style.addCard__inputs}>
        <section className={style.addCard__inputsGroup}>
          <p>Номер карты</p>
          <div className={style.addCard__inputsWrapper}>
            <img src={card} alt="cardIcon" />
            <input type="text" placeholder="0000 0000 0000 0000" />
          </div>
        </section>
        <section className={style.addCard__inputsGroup}>
          <p>Срок Истечения</p>
          <div className={style.addCard__inputsWrapper}>
            <img src={calendar} alt="" />
            <input type="text" placeholder="MM/YYYY" />
          </div>
        </section>
        <section className={style.addCard__inputsGroup}>
          <p>CVV Код</p>
          <div className={style.addCard__inputsWrapper}>
            <img src={cvv} alt="" />
            <input type="text" placeholder="000" />
          </div>
        </section>
      </section>
      <button>Сохранить карту</button>
    </main>
  );
};

export default AddCard;
