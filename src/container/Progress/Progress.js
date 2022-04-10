import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./Progress.module.scss";
import SearchBgTriangle from "../../components/UI/icons/SearchBgTriangle";
import QuestionOption from "../../components/UI/icons/QuestionOption";
import SearchIcon from "../../components/UI/icons/SearchIcon";
import AllAnswerIcon from "../../components/UI/icons/AllAnswerIcon";
import ProgressIcon from "../../components/UI/icons/ProgressIcon";

const Progress = (props) => {
  const location = useLocation();
  let { AnswerData,askerId, askerCode,currentAllInformation } = location.state;
    const cardRef = useRef(null);
    let navigate = useNavigate();
    const [search, setSearch] = useState("");

    const hendaleingFormSubmit = async () => {
      // var parameter =
      //   "&asker_code=" +
      //   encodeURIComponent(Search) +
      //   "&user_id=" +
      //   encodeURIComponent(UserProfile.id);
      //
      // await fetch(SITEURL.FULLBASE_API + "askerCode", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      //   },
      //   body: parameter,
      // })
      //   .then((resp) => resp.json())
      //   .then((respJson) => {
      //     if (respJson.status === true) {
      //       history.push({ pathname: "/SatrtAnswer", state: respJson });
      //     }
      //   });
    };

  const reloadListener = (event) => {
    event.preventDefault();
    navigate('/progress', {state: {AnswerData,askerId, askerCode,currentAllInformation}})
  }

    useEffect(() => {
      if (location?.state?.from === 'next-question') {
        cardRef?.current?.classList.add(styles.firstRotate)
      }
      if (window && location?.state?.from === 'next-question') {
        window.addEventListener('beforeunload', reloadListener);
      }

      return () => {
        window.removeEventListener('beforeunload', reloadListener);
      }
    }, [])

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
        <div className={styles.infoBlockHead}>
          <AllAnswerIcon className={styles.infoIcon}/>
          <div className={styles.infoText}>
            <span className={styles.smallText}>Brighton Art Gallery</span> Cleaner Job in Brighton
          </div>
        </div>
        <div className={`${styles.contentContainer}`} onClick={()=>{
          cardRef?.current?.classList.add("customRotate");
          setTimeout(() => {
            navigate('/asker-complete', {
              state: {
                askerId,
                askerCode,
                AnswerData,
                from: 'progress'
              }
            })
          }, 400)
        }}>
          <div ref={cardRef} className={`default-flip flip-card-inner cardWrap ${styles.cardWrapContact}`}>
            <div className={styles.cardContainerContact}>
              <div className={styles.contentBox}>
                <SearchBgTriangle className={styles.triangleBgIcon}/>
                <div className={styles.searchBox}>
                  <div className={styles.progressBox}>
                    <ProgressIcon className={styles.progressIcon}/>
                    <div className={styles.infoBox}>
                    <div className={styles.persent}>{Math.round(currentAllInformation.percentage)}%</div>
                    <div className={styles.textProgressive}>{currentAllInformation.total_answered_question} of {currentAllInformation.total_question}</div>
                    </div>
                  </div>
                  <div className={styles.titleBox}>
                    <QuestionOption className={styles.questionOption}/>
                    Awesome!
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
;

export default Progress;
