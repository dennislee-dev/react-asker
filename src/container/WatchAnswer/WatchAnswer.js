import React, {useEffect, useRef, useState} from 'react';
import styles from "./WatchAnswer.module.scss";
import AllAnswerIcon from "../../components/UI/icons/AllAnswerIcon";
import {useLocation, useNavigate} from "react-router-dom";
import {Carousel} from "react-bootstrap";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import {http} from "../../http/http";
// import { Carousel } from 'react-responsive-carousel';
// import Slider from 'react-touch-drag-slider'


const WatchAnswer = (props) => {
    let navigate = useNavigate();
    const cardRef = useRef(null);
    const location = useLocation();
    const {asker_id, user_id} = location?.state;
    const [userProfile, setUserProfile] = useState([]);
    const [askerData, setAskerData] = useState([]);
    const [answerData, setAnswerData] = useState([]);

    // const carouselMembers = [1, 2, 3, 4];

    // console.log('askerDat',  answerData, askerData, userProfile);
    // useEffect(async () => {
    //   if (cardRef?.current?.classList.contains("start-rotate")) {
    //     cardRef?.current?.classList.remove("start-rotate")
    //   }
    //
    //   const timer = setTimeout(() => {
    //     cardRef?.current?.classList.add("start-rotate")
    //   }, 1);
    //
    //   return () => clearTimeout(timer)
    // }, []);

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user) {
        setUserProfile(user);
      }

      askerDeatils(asker_id, user_id);
      answerList(asker_id, user_id);
    }, []);

    const askerDeatils = async (asker_id, user_id) => {
      http.post('viewAnswers', `user_id=${user_id}&asker_id=${asker_id}`)
        .then(res => res.data)
        .then((res) => {
          console.log('resOption', res, res.data.asker_detail[0]);
          setAskerData(res.data.asker_detail[0]);
        })
        .catch((err) => {
          console.log(err);
        })
    };
//
//  const askerDeatilsAll = async (user_id) => {
//       http.post('viewAnswers', `user_id=${user_id}`)
//         .then(res => res.data)
//         .then((res) => {
//           console.log('skerDeatilsAll', res, res.data.asker_detail[0]);
//           // setAskerData(res.data.asker_detail[0]);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     };
//
// const askerDeatilsAsker = async (asker_id) => {
//       http.post('viewAnswers', `asker_id=${asker_id}`)
//         .then(res => res.data)
//         .then((res) => {
//           console.log('skerDeatilsAll', res, res.data.asker_detail[0]);
//           // setAskerData(res.data.asker_detail[0]);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     };
//
//   useEffect(async () => {
//     askerDeatilsAll(user_id)
//     askerDeatilsAsker(asker_id)
//   }, []);

  const answerList = async (asker_id, user_id) => {
    // http.post('answerList', `asker_id=${asker_id}`)
    http.post('answerList', `candidate_user_id=${user_id}&asker_id=${asker_id}`)
      .then(res => res.data)
      .then((res) => {
          console.log('answerList', res, res.answer_list);
        if (res.status === true) {
          setAnswerData(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

    const showContact = () => {
      navigate('/contact-card')
    }

    const images = [1, 2, 3,]

    return (
      <div className={styles.mainContainer}>
        <div className={styles.infoBlock}>
          <AllAnswerIcon className={styles.infoIcon}/>
          <div className={styles.infoText}>Brighton Art Gallery<br/> Cleaner Job in Brighton</div>
        </div>
        <div className={`${styles.contentContainer}`}>

          <CustomCarousel
            data={images}
            answerData={answerData}
            autoPlay={false}
            state={location?.state}
            interval={5000}
            type={'watchAnswer'}
          />
        </div>
      </div>
      // </div>
    )
  }
;

export default WatchAnswer;
