import React, {useEffect, useRef, useState,useLayoutEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./NextQuestion.module.scss";
import AllAnswerIcon from "../../components/UI/icons/AllAnswerIcon";
import CreateAskerIcon from "../../components/UI/icons/Create/CreateAskerIcon";
import CircleLi from "../../components/UI/icons/Contact/CircleLi";
import ClockIcon from "../../components/UI/icons/ClockIcon";
import CheckIcon from "../../components/UI/icons/Create/CheckIcon";
import ReloadIcon from "../../components/UI/icons/ReloadIcon";
import CheckNextIcon from "../../components/UI/icons/CheckNextIcon";
import {ReactComponent as GrayBg} from '../../image/svg/GrayBg.svg';
import {http} from "../../http/http";
import CloseIcon from "../../components/UI/icons/CloseIcon";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import PlayIcon from "../../components/UI/icons/PlayIcon";
import {ReactComponent as LogoNext} from "../../image/svg/LogoNextQuestion.svg";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const NextQuestion = (props) => {
  const location = useLocation();
  let {activeQuestion, askerId, askerCode, AnswerData} = location.state;
  const cardRef = useRef(null);
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [currentAllInformation, setCurrentAllInformation] = useState('')
  const [showSubmitPanelButton, setShowSubmitPanelButton] = useState(true)
  const [currentAsker, setCurrentAsker] = useState('')
  const [clickedQuestionId, setClickedQuestionId] = useState('')

  const reloadListener = (event) => {
    event.preventDefault();
    navigate('/next-question', {state: {activeQuestion, askerId, askerCode, AnswerData}})
  }

  useEffect(() => {
    http.post('askerCode', `asker_code=${askerCode}&user_id=${localStorage.getItem("UserID")}`)
      .then(resp => setCurrentAsker(resp.data.asker))
    const bodyFormData = new FormData();
    const userID = JSON.parse(localStorage.getItem("UserID"));
    bodyFormData.append('user_id', userID)
    bodyFormData.append('asker_id', askerId)

    setTimeout(()=>{
      http.post('nextQuestionList', bodyFormData).then(res => res.data).then(nextQuestionList => {
        setCurrentAllInformation(nextQuestionList)
        setCurrentQuestions(nextQuestionList.question_list)
      });
    }, 1300)

    if (location?.state?.from === 'answer') {
      cardRef?.current?.classList.add(styles.firstRotate)
    }
    if (window && location?.state?.from === 'answer') {
      window.addEventListener('beforeunload', reloadListener);
    }

    return () => {
      window.removeEventListener('beforeunload', reloadListener);
    }

  }, [])

  const findClickedQuestion = () => {

  }
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


      <div className={`${styles.contentContainer}`}>
        <div ref={cardRef} className={`default-flip flip-card-inner cardWrap ${styles.cardWrapp}`}>
          <div className={`${styles.cardBg}`}>
            <GrayBg className={styles.grayBg}/>
            <div className={styles.cardContainer}>
              <div className={` ${styles.questionBlock}`}>
                <div className={styles.questionBox}>
                  <div className={`${styles.questionItem}`}>
                    <LogoNext className={styles.createLogo}/>
                    <div className={styles.textBox}>
                      <div className={styles.text}>{currentAsker.title}</div>
                      <div className={styles.title}>{currentAsker.author}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.infoBlock}`}>
                {currentQuestions && currentQuestions.map((item, index) => {
                  return <div key={item.question_id} className={`${styles.infoItem}`}>
                    {clickedQuestionId === item.question_id ? <div className={`${styles.recordItem}`}>
                        {/*<div className={styles.circleBox}>*/}
                        <div className={styles.textInfo}>Record this response again?</div>
                        <div className={styles.iconsBoxRecord}>
                          <button onClick={() => setClickedQuestionId(null)} type='button' className={styles.closeBtn}><CloseIcon className={styles.closeIcon}/></button>
                          <button onClick={() => {
                            navigate('/answer', {
                              state: {
                                foundAskerId: askerId,
                                askerCode,
                                data: currentQuestions.find(element => element === item),
                                AnswerData,
                              }
                            })

                          }} type='button' className={styles.yesBtn}><CheckIcon className={styles.checkIconYes}/></button>

                        </div>
                      </div>
                      :
                      <>
                        <div className={styles.circleBox}>
                          {item.submitted_answer !== 'n' ? <CheckNextIcon className={styles.checkIcon}/> : <CircleLi className={styles.point}/>}
                        </div>
                        <div className={styles.textInfo}>{item.title}</div>
                        <div className={styles.iconsBox}>
                          {item.submitted_answer !== 'n' ? <button className={styles.reloadButton} onClick={() => {
                            setClickedQuestionId(item.question_id)
                          }
                          }><ReloadIcon className={styles.iconReload}/></button> : <ClockIcon className={styles.iconClock}/>}
                        </div>
                      </>
                    }

                  </div>
                })}
                {/*<div className={`${styles.infoItem}`}>*/}
                {/*  <div className={styles.circleBox}>*/}
                {/*    <CheckNextIcon className={styles.checkIcon}/></div>*/}
                {/*  <div className={styles.textInfo}>What are your strengths and weaknesses?</div>*/}
                {/*  <div className={styles.iconsBox}>*/}
                {/*    <ReloadIcon className={styles.iconReload}/>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className={`${styles.infoItem}`}>*/}
                {/*  <div className={styles.circleBox}>*/}
                {/*    <CheckNextIcon className={styles.checkIcon}/></div>*/}
                {/*  <div className={styles.textInfo}>What’s your idea of the perfect flatmate?</div>*/}
                {/*  <div className={styles.iconsBox}>*/}
                {/*    <ReloadIcon className={styles.iconReload}/>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className={`${styles.infoItem}`}>*/}
                {/*  <div className={styles.circleBox}><CircleLi className={styles.point}/></div>*/}
                {/*  <div className={styles.textInfo}>Tell me what makes you perfect for this role</div>*/}
                {/*  <div className={styles.iconsBox}>*/}
                {/*    <ClockIcon className={styles.iconClock}/>*/}
                {/*    <span>30s</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              <div className={`button-box ${styles.buttonBox}`}>
                <button type="button" className={`continue-btn  ${styles.buttonStyle}`} onClick={() => {
                  cardRef?.current?.classList.add("customRotate");
                  setTimeout(() => {
                    navigate('/progress', {
                      state: {
                        AnswerData,
                        askerId,
                        askerCode,
                        currentAllInformation,
                        from: 'next-question'
                      }
                    })
                  }, 400);
                }}>
                  <span>NEXT QUESTION</span>
                  <div className={styles.plusIconBox}>
                    <PlayIcon className={`${styles.shareIcon}`}/>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <TriangleSearchSm  className={styles.rotateT}/>
        </div>
      </div>
    </div>
  )
};

export default NextQuestion;
