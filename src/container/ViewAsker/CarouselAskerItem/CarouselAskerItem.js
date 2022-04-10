import React, {useEffect, useRef, useState} from 'react';
import styles from "./CarouselAskerItem.module.scss";
import {ReactComponent as GrayBg} from "../../../image/svg/GrayBg.svg";
import MenuBurgerIcon from "../../../components/UI/icons/MenuBurgerIcon";
import CreateAskerIcon from "../../../components/UI/icons/Create/CreateAskerIcon";
import CircleLi from "../../../components/UI/icons/Contact/CircleLi";
import ClockIcon from "../../../components/UI/icons/ClockIcon";
import PlayIcon from "../../../components/UI/icons/PlayIcon";
import {useLocation, useNavigate} from "react-router-dom";
import {http} from "../../../http/http";
import CloseIcon from "../../../components/UI/icons/CloseIcon";
import QuestionOption from "../../../components/UI/icons/QuestionOption";
import EditCreateBtn from "../../../components/UI/icons/Create/EditCreateBtn";
import ShareIcon from "../../../components/UI/icons/ShareIcon";
import MessageIcon from "../../../components/UI/icons/MessageIcon";
import BellIcon from "../../../components/UI/icons/BellIcon";
import TwoMenIcon from "../../../components/UI/icons/TwoMenIcon";
import AskerOption from "../../AskerOption/AskerOption";
import ArrowDown from "../../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../../components/UI/icons/TriangleSearchSm";

const CarouselAskerItem = ({state, item, data, index, nextQuestionList, viewAsker , ...props}) => {
  let navigate = useNavigate();
  const location = useLocation();
  // const [viewAsker, setViewAsker] = useState()
  // const {asker_id, user_id} = location?.state;
  // const [nextQuestionList, setNextQuestionList] = useState([]);
  // const cardRef = useRef(null);
  const [isActive, setActive] = useState(null);
  const [selectPrivate, setSelectPrivate] = useState("");

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
  };

  // console.log('location.state', location.state, viewAsker);

  const onchange = (e, type) => {
    // e.preventDefault();
    // e.stopPropagation();
    if (type === 'front') {
      setActive(false)
    } else {
      setActive(true)
    }
  }



  const getNextQuestionList = async (asker_id, user_id) => {
    http.post('nextQuestionList', `user_id=${user_id}&asker_id=${asker_id}`)
      .then(resp => resp.data)
      .then((res) => {
        console.log('getNextQuestionLi', res);
        if (res.status === true) {
          // setNextQuestionList(res?.question_list)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const ViewAnswer = async (asker_id, user_id) => {
    http.post('viewAnswers', `user_id=${user_id}&asker_id=${asker_id}`)
      .then(resp => resp.data)
      .then((res) => {
        console.log('ViewAns', res);
        if (res.status === true) {
          // setViewAsker(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const showOption = (e) => {
    e.preventDefault();
    navigate(
      "/asker-option",
      {
        state: {
          asker_id: location?.state.asker_id,
          user_id: location?.state.user_id,
        }
      })
  }

  const openViewAnswers = () => {
    navigate(
      "/watch-answer",
      {
        state: {
          asker_id: location?.state.asker_id,
          user_id: location?.state.user_id,
        }
      })
  }


  // const onChangePrivate = (e) => {
  //   e.preventDefault();
  //   console.log('SelectPrivate', selectPrivate, chbox?.checked);
  //   if (chbox != null) {
  //     if (!chbox?.checked) {
  //       setSelectPrivate("");
  //       activeAsker("i");
  //     } else {
  //       activeAsker("a");
  //       setSelectPrivate("checked");
  //     }
  //   }
  // };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.contentContainer}`}>
          <div className={`card card--back ${!isActive ? 'card--back--flip' : ''} ${styles.cardWrap}`} onClick={(e) => onchange(e, 'back')}>
          {/*<div className={`card card--back ${!isActive ? 'card--back--flip' : ''} ${styles.cardWrap}`}>*/}
            <div className={`${styles.cardBg}`}>
              <GrayBg className={styles.grayBg}/>
              <div className={styles.cardContainer}>
                <button type='button' className={styles.burgerBtn} onClick={(e) => onchange(e, 'back')}>
                  <MenuBurgerIcon className={styles.burgerIcon}/>
                </button>
                <div className={styles.questionBlock}>
                  <CreateAskerIcon className={styles.createLogo}/>
                  <div className={styles.textBox}>
                    <span className={styles.text}>{item?.title}</span>
                    <span className={styles.title}>{item?.author}</span>
                  </div>
                </div>
                <div className={`${styles.infoBlock}`}>
                  {
                    nextQuestionList?.map((item, index) =>
                      <div key={index} className={`${styles.infoItem}`}>
                        <div className={styles.circleBox}><CircleLi className={styles.point}/></div>
                        <div className={styles.textInfo}>{item?.title}</div>
                        <div className={styles.iconsBox}>
                          <ClockIcon className={styles.iconClock}/>
                          <span>{item?.time}s</span>
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className={`button-box ${styles.buttonBox}`}>
                  <button type="button" className={`continue-btn  ${styles.buttonStyle}`} onClick={openViewAnswers}>
                    <span>VIEW ANSWERS</span>
                    <div className={styles.plusIconBox}>
                      <PlayIcon className={`${styles.shareIcon}`}/>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <TriangleSearchSm className={`${styles.rotateT} ${styles.whitePipka}`}/>

          </div>

          <div className={`card card--front ${!isActive ? 'card--front--flip' : ''} ${styles.cardWrapContact}`} >
            <AskerOption isActiveAsker={isActive} onChange={(e) => onchange(e, 'front')} location={location.state} viewAsker={viewAsker}/>
          </div>
        </div>

      </div>
    </>
  )
};

export default CarouselAskerItem;
