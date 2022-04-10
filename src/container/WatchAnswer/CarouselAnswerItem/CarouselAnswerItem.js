import React, {useEffect, useState} from 'react';
import styles from "./CarouselAnswerItem.module.scss";
import CircleContact from "../../../components/UI/icons/Contact/CircleContact";
import StarsLine from "../../../components/UI/icons/StarsLine";
import ContactName from "../../../components/UI/icons/Contact/ContactName";
import ContactLink from "../../../components/UI/icons/Contact/ContactLink";
import ContactEmail from "../../../components/UI/icons/Contact/ContactEmail";
import ContactPhone from "../../../components/UI/icons/Contact/ContactPhone";
import {useLocation} from "react-router-dom";
import {http} from "../../../http/http";
import AllAnswerIcon from "../../../components/UI/icons/AllAnswerIcon";
import Logo from "../../../components/UI/icons/Logo";
import {ReactComponent as LogoWhiteViolet} from '../../../image/svg/LogoWhateViolet.svg';
import {ReactComponent as StarIcon} from "../../../image/svg/StarIcon.svg";
import Slider from "react-slick";
import StarSvg from "../../../components/UI/icons/StarSvg";
import copy from "copy-html-to-clipboard";
import TriangleSearchSm from "../../../components/UI/icons/TriangleSearchSm";

const CarouselAnswerItem = ({state, item, data, ...props}) => {
    const [isActive, setActive] = useState(false);
    const [showSlide, setShowSlide] = useState(-1);
    const location = useLocation();
    const {asker_id, user_id} = location?.state;
    const [userProfile, setUserProfile] = useState();
    const [askerData, setAskerData] = useState([]);
    const [answerData, setAnswerData] = useState([]);
    // const isActive = false
    const getPaginate = (count) => {
      return <button className={(showSlide >= count) ? styles.activeSlide : ''}>
        {count}
      </button>
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      vertical: true,
      autoplay: true,
      autoplaySpeed: 15000,
      customPaging: i => (
        getPaginate(i)
      ),
      beforeChange: (current, next) => {
        if ((current + 1) === answerData?.length) {
          setShowSlide(-1);
        } else {
          setShowSlide(current)
        }
      },
    };

    useEffect(() => {
      if (data) {
        const d = [];
        const l = data.answer_list?.length > 3 ? 3 : data.answer_list?.length;

        for (let i = 0; i < l; i++) {
          if (data.answer_list[i]) {
            d.push(data.answer_list[i]);
          }
        }
        setAnswerData(d);
      }
    }, [data])

    const onchange = (e, type) => {
      e.preventDefault();
      e.stopPropagation();
      if (type === 'front') {
        setActive(false)
      } else {
        setActive(true)
      }
    }

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user) {
        setUserProfile(user);
      }
    }, [localStorage]);

    const askerDeatils = async (asker_id, user_id) => {
      http.post('viewAnswers', `user_id=${user_id}&asker_id=${asker_id}`)
        .then(res => res.data)
        .then((res) => {
          setAskerData(res.data.asker_detail[0]);
        })
        .catch((err) => {
          console.log(err);
        })
    };

    const answerList = async (asker_id, user_id) => {
      http.post('answerList', `candidate_user_id=${user_id}&asker_id=${asker_id}`)
        .then(res => res.data)
        .then((res) => {
          if (res.status === true) {
            setAnswerData(res.answer_list);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    };

    const submitRating = async (e, rating, question_id, answer_id) => {
      e.stopPropagation();
      e.preventDefault();

      // http.post('videoRating', `user_id=${user_id}&asker_id=${asker_id}&question_id=${question_id}&rating=${rating}&answer_id=${answer_id}`)
      //   .then(res => res.data)
      //   .then((res) => {
      //     console.log('submitRating', res,);
      //     answerList(asker_id, user_id)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    };

    const onCopy = (e, type) => {
      e.preventDefault();
      if (type === 'name') {
        copy(`<span>${userProfile?.name}</span>`, {
          asHtml: true,
        });
      } else if (type === 'email') {
        copy(`<span>${userProfile?.email}</span>`, {
          asHtml: true,
        });
      } else if (type === 'phone') {
        copy(`<span>${userProfile?.phone}</span>`, {
          asHtml: true,
        });
      }
    };

    return (
      <>
        <div className={styles.mainContainer}>
          <div className={`${styles.contentContainer}`}>
            <div className={`card card--back ${!isActive ? 'card--back--flip' : ''} ${styles.cardWrap}`}>
              <div className={`${styles.clickBox}`} onClick={(e) => onchange(e, 'back')}/>
              <div className={`${styles.cutBox}`}>
                <div className={`${styles.cardContainer}`}>
                  <div className={styles.logoBox}>
                    <div className={styles.infoBlockSmall}>
                      <AllAnswerIcon className={styles.infoIconSmall}/>
                      <div className={styles.infoTextSmall}>{data?.asker_title}<br/> <span className={styles.infoTextSmall__job}>{data?.asker_author}</span></div>
                    </div>
                    <LogoWhiteViolet className={styles.logo}/>
                  </div>
                  <div className={`screen`}>
                    <div className={`wth-ans-inner-slider promotionVideoSlide ${styles.promotionVideoSlide} ${styles.wthInnerSlider}`}>
                      <Slider {...settings}>
                        {answerData?.length > 0
                          ? answerData?.map((item, index) => (
                            <div key={`slide-${item.question_id}`} className={`wth-ans-inner-single-slide slide-watch`}>
                              <div className={`img-vid ${styles.imgVideo}`}>
                                <video playsInline autoPlay muted loop>
                                  <source src={item.answer} type="video/mp4"/>
                                </video>
                              </div>
                              <div className={`cont ${styles.contentStar}`}>
                                <div className={`star-rate ${styles.starsBox}`}>
                                  <button type='button' className={`material-iconss ${item.rating >= 1 ? "star-checked" : ""} ${styles.iconWrap}`}
                                          id="star_r1"
                                          onClick={(e) => submitRating(e, 1, item.question_id, item.answer_id)}>
                                    {/*{item.rating >= 1 ? (*/}
                                    <StarIcon className={item.rating >= 1 ? styles.starIcon : styles.starIcon__fill}/>
                                  </button>
                                  <span
                                    className={`material-iconss ${item.rating >= 2 ? "star-checked" : ""}`}
                                    id="star_r2"
                                    onClick={(e) => submitRating(e, 2, item.question_id, item.answer_id)}>
                                    <StarIcon className={item.rating >= 2 ? styles.starIcon : styles.starIcon__fill}/>
                                </span>
                                  <span
                                    className={`material-iconss ${item.rating >= 3 ? "star-checked" : ""}`}
                                    id="star_r2"
                                    onClick={(e) => submitRating(e, 3, item.question_id, item.answer_id)}>
                                    <StarIcon className={item.rating >= 3 ? styles.starIcon : styles.starIcon__fill}/>
                                </span>
                                  <span
                                    className={`material-iconss ${item.rating >= 4 ? "star-checked" : ""}`}
                                    id="star_r2"
                                    onClick={(e) => submitRating(e, 4, item.question_id, item.answer_id)}>
                                    <StarIcon className={item.rating >= 4 ? styles.starIcon : styles.starIcon__fill}/>
                                </span>
                                  <span
                                    className={`material-iconss ${item.rating >= 5 ? "star-checked" : ""}`}
                                    id="star_r2"
                                    onClick={(e) => submitRating(e, 5, item.question_id, item.answer_id)}>
                                    <StarIcon className={item.rating >= 5 ? styles.starIcon : styles.starIcon__fill}/>
                                </span>

                                </div>
                                <p className={styles.questioText}>{item.question}</p>
                              </div>
                            </div>
                          ))
                          : null}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
                <TriangleSearchSm className={styles.rotateT}/>
            </div>

            <div className={`card card--front ${!isActive ? 'card--front--flip' : ''} ${styles.cardWrapContact}`} onClick={(e) => onchange(e, 'front')}>
              <div className={styles.contentWrap}>
                <div className={styles.cardContainerContact}>
                  <div className={isActive ? styles.blur : styles.blur__none}/>
                  <div className={styles.contentBox}>
                    <div className={styles.iconBox}>
                      <CircleContact className={styles.circleIcon}/>
                    </div>
                    <div className={styles.nameBox}>
                      <div className={styles.name}>{userProfile?.name}</div>
                      <div className={styles.starsBox}>
                        <StarIcon className={`${styles.starIconBack}`}/>
                        <StarIcon className={`${styles.starIconBack}`}/>
                        <StarIcon className={`${styles.starIconBack}`}/>
                        <StarIcon className={`${styles.starIconBack} ${styles.starIconBack__fill}`}/>
                        <StarIcon className={`${styles.starIconBack} ${styles.starIconBack__fill}`}/>
                      </div>
                    </div>
                    <div className={styles.infoBox}>
                      <div className={styles.infoLine}>
                        <ContactName className={styles.infoIcon}/>
                        <div className={styles.contactBlock}>
                          <span className={styles.titleInfo}>Name</span>
                          <span className={styles.textInfo}>{userProfile?.name}</span>
                        </div>
                        <button type='button' onClick={(e) => onCopy(e, 'name')} className={styles.linkIconWrap}>
                          <ContactLink className={styles.linkIcon}/>
                        </button>
                      </div>
                      <div className={styles.infoLine}>
                        <ContactEmail className={styles.infoIcon}/>
                        <div className={styles.contactBlock}>
                          <span className={styles.titleInfo}>Email</span>
                          <span className={styles.textInfo}>{userProfile?.email}</span>
                        </div>
                        <button type='button' onClick={(e) => onCopy(e, 'email')} className={styles.linkIconWrap}>
                          <ContactLink className={styles.linkIcon}/>
                        </button>
                      </div>
                      <div className={styles.infoLine}>
                        <ContactPhone className={styles.infoIcon}/>
                        <div className={styles.contactBlock}>
                          <span className={styles.titleInfo}>Phone number</span>
                          <span className={styles.textInfo}>{userProfile?.phone}</span>
                        </div>
                        <button type='button' onClick={(e) => onCopy(e, 'phone')} className={styles.linkIconWrap}>
                          <ContactLink className={styles.linkIcon}/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <TriangleSearchSm className={`${styles.rotateT} ${styles.rotateT_back}`}/>
              </div>
            </div>
          </div>

        </div>
      </>
    )
  }
;

export default CarouselAnswerItem;
