import React, {useState} from 'react';
import logo from "../../image/svg/QuestionTop.svg";
import styles from "./SpinRffect.module.scss";
import CircleContact from "../UI/icons/Contact/CircleContact";
import StarsLine from "../UI/icons/StarsLine";
import ContactName from "../UI/icons/Contact/ContactName";
import ContactLink from "../UI/icons/Contact/ContactLink";
import ContactEmail from "../UI/icons/Contact/ContactEmail";
import ContactPhone from "../UI/icons/Contact/ContactPhone";
import CustomCarousel from "../CustomCarousel/CustomCarousel";

const SpinEffect = (props) => {
  const [isActive, setActive] = useState(false);

  // const isActive = false

  const onchange = (e, type) => {
    e.preventDefault()
    console.log('onCli', type);
    if (type === 'front') {
      setActive(false)
    } else {
      setActive(true)
    }

    // e.stopPropagation()
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.contentContainer}`}>
          <div  className={`card card--front ${!isActive ? 'card--front--flip' : ''} ${styles.cardWrap}`} onClick={(e) => onchange(e, 'front')}>
            <div className={styles.cardContainer}>
            </div>
          </div>
        {/*</div>*/}

        <div className={`card card--back ${!isActive ? 'card--back--flip' : ''} ${styles.cardWrapContact}`} onClick={(e) => onchange(e, 'back')}>
          <div className={styles.contentWrap}>
          <div className={styles.cardContainerContact}>
            <div className={!isActive ? styles.blur : styles.blur__none} />
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
        </div>
        </div>

        <div className="card-shadow"/>

      </div>
    </>
  )
};

export default SpinEffect;
