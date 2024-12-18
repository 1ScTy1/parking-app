import React from "react";
import style from "./style.module.scss";
import card from "../../assets/cardBackground.svg";
import topup from "../../assets/Popolnit.svg";
import recieve from "../../assets/Poluchat.svg";
import sent from "../../assets/Otpravil.svg";
import moneyTransfer from "../../assets/moneyTransfer.svg";
import loan from "../../assets/Zaem.svg";
import apple from "../../assets/apple.svg";
import spotify from "../../assets/spotify.svg";
import netflix from "../../assets/netflix.svg";
import grocery from "../../assets/Grocery.svg";
import home from '../../assets/homeIcon.svg'
import cardFooter from '../../assets/cardFooter.svg'
import statistics from '../../assets/statistic.svg'
import settings from '../../assets/settingsIcon.svg'


const Pay = () => {
  return (
    <main className={style.pay}>
      <section className={style.pay_card}>
        <img src={card} alt="card" />
      </section>
      <section className={style.pay_actions}>
        <div className={style.pay_actions__wrapper}>
          <img src={sent} alt="Sent icon" />
          <p>Sent</p>
        </div>
        <div className={style.pay_actions__wrapper}>
          <img src={recieve} alt="recieve icon" />
          <p>Recieve</p>
        </div>
        <div className={style.pay_actions__wrapper}>
          <img src={loan} alt="Loan icon" />
          <p>Loan</p>
        </div>
        <div className={style.pay_actions__wrapper}>
          <img src={topup} alt="Topup icon" />
          <p>Topup</p>
        </div>
      </section>
      <section className={style.pay_transaction}>
        <div className={style.pay_transaction__top}>
          <h3>Transaction</h3>
          <p>Sell All</p>
        </div>
        <div className={style.pay_transaction__wrapper}>
          <img src={apple} alt="Apple icon" />
          <div>
            <h3>Apple Store</h3>
            <p>Entertainment</p>
          </div>
          <p>$300</p>
        </div>
        <div className={style.pay_transaction__wrapper}>
          <img src={spotify} alt="Spotify icon" />
          <div>
            <h3>Spotify</h3>
            <p>Music</p>
          </div>
          <p>$300</p>
        </div>
        <div className={style.pay_transaction__wrapper}>
          <img src={moneyTransfer} alt="icon" />
          <div>
            <h3>Money Transfer</h3>
            <p>Transaction</p>
          </div>
          <p>$300</p>
        </div>
        <div className={style.pay_transaction__wrapper}>
          <img src={grocery} alt="icon" />
          <div>
            <h3>Grocery</h3>
            <p>Shopping</p>
          </div>
          <p>$300</p>
        </div>
        <div className={style.pay_transaction__wrapper}>
          <img src={netflix} alt="icon" />
          <div>
            <h3>Netflix</h3>
            <p>Entertainment</p>
          </div>
          <p>$300</p>
        </div>
      </section>
      <section className={style.pay_footer}>
        <div className={style.pay_footer__wrapper}>
          <img src={home} alt="" />
          <p>Home</p>
        </div>
        <div className={style.pay_footer__wrapper}>
          <img src={cardFooter} alt="" />
          <p>My cards</p>
        </div>
        <div className={style.pay_footer__wrapper}>
          <img src={statistics} alt="" />
          <p>Statistics</p>
        </div>
        <div className={style.pay_footer__wrapper}>
          <img src={settings} alt="" />
          <p>Settings</p>
        </div>
      </section>
    </main>
  );
};

export default Pay;
