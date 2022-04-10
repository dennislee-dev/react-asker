import React, {useEffect, useRef, useState} from 'react';
import logo from "../../image/svg/QuestionTop.svg";
import styles from "./ContactCard.module.scss";
import AllAnswerIcon from "../UI/icons/AllAnswerIcon";
import CircleContact from "../UI/icons/Contact/CircleContact";
import StarsLine from "../UI/icons/StarsLine";
import QuestionSmall from "../UI/icons/QuestionSmall";
import ContactName from "../UI/icons/Contact/ContactName";
import ContactEmail from "../UI/icons/Contact/ContactEmail";
import ContactPhone from "../UI/icons/Contact/ContactPhone";
import ContactLink from "../UI/icons/Contact/ContactLink";
import {useNavigate} from "react-router-dom";
// import

const ContactCard = (props) => {
    const cardRef = useRef(null);
    let navigate = useNavigate()

    useEffect(async () => {
      if (cardRef?.current?.classList.contains("start-rotate")) {
        console.log('true');
        cardRef?.current?.classList.remove("start-rotate")
      }

      const timer = setTimeout(() => {
        cardRef?.current?.classList.add("start-rotate")
      }, 1);

      return () => clearTimeout(timer);
    }, [props]);

    const showViewAnswer = () => {
      console.log('onc');
      navigate('/watch-answer')
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.infoBlock}>
          <AllAnswerIcon className={styles.infoIcon}/>
          <div className={styles.infoText}>Brighton Art Gallery<br/> Cleaner Job in Brighton</div>
        </div>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.cardWrap} ${styles.cardLeft}`}>
            <div className={styles.cardContainer}>
            </div>
          </div>
          <div ref={cardRef} className={`default-flip flip-card-inner ${styles.cardWrapContact}`} onClick={showViewAnswer}>
            <div className={styles.cardContainerContact}>
              <div className={styles.blur}/>
              <div className={styles.contentBox}>
                <div className={styles.iconBox}>
                  <CircleContact className={styles.circleIcon}/>
                </div>
                <div className={styles.nameBox}>
                  <div className={styles.name}>Antonio Pérez</div>
                  <StarsLine className={styles.starsLine}/>
                </div>
                <div className={styles.infoBox}>
                  <div className={styles.infoLine}>
                    <ContactName className={styles.infoIcon}/>
                    <div className={styles.contactBlock}>
                      <span className={styles.titleInfo}>Name</span>
                      <span className={styles.textInfo}>Antonio Pérez</span>
                    </div>
                    <div className={styles.linkIconWrap}>
                      <ContactLink className={styles.linkIcon}/>
                    </div>
                  </div>
                  <div className={styles.infoLine}>
                    <ContactEmail className={styles.infoIcon}/>
                    <div className={styles.contactBlock}>
                      <span className={styles.titleInfo}>Email</span>
                      <span className={styles.textInfo}>antonio.p@gmail.com</span>
                    </div>
                    <div className={styles.linkIconWrap}>
                      <ContactLink className={styles.linkIcon}/>
                    </div>
                  </div>
                  <div className={styles.infoLine}>
                    <ContactPhone className={styles.infoIcon}/>
                    <div className={styles.contactBlock}>
                      <span className={styles.titleInfo}>Phone number</span>
                      <span className={styles.textInfo}>07432932937</span>
                    </div>
                    <div className={styles.linkIconWrap}>
                      <ContactLink className={styles.linkIcon}/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className={`${styles.cardWrap} ${styles.cardRight}`}>
            <div className={styles.cardContainer}>
            </div>
          </div>

        </div>
      </div>
    )
  }
;

export default ContactCard;
