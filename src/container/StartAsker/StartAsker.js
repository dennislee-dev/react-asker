import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./StartAsker.module.scss";
import SearchBgTriangle from "../../components/UI/icons/SearchBgTriangle";
import QuestionOption from "../../components/UI/icons/QuestionOption";
import SearchIcon from "../../components/UI/icons/SearchIcon";
import AllAnswerIcon from "../../components/UI/icons/AllAnswerIcon";
import CreateAskerIcon from "../../components/UI/icons/Create/CreateAskerIcon";
import CircleLi from "../../components/UI/icons/Contact/CircleLi";
import ClockIcon from "../../components/UI/icons/ClockIcon";
import PlayIcon from "../../components/UI/icons/PlayIcon";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import {ReactComponent as GrayBg} from '../../image/svg/GrayBg.svg';
import {http} from "../../http/http";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";
// import {ReactComponent as ArrowDown} from "../../image/svg/arow-down.svg";

const StartAsker = (props) => {
  const location = useLocation();
  let { foundAsker,askerCode } = location.state;
  const cardRef = useRef(null);
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  const [AnswerData, setAnswerData] = useState([]);

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
      // console.log('true');
      cardRef?.current?.classList.remove("start-rotate")
    }

    const timer = setTimeout(() => {
      cardRef?.current?.classList.add("start-rotate")
    }, 1);

    return () => clearTimeout(timer);
  }, [props]);
  const bodyFormData = new FormData();
  const userID = JSON.parse(localStorage.getItem("UserID"));
  bodyFormData.append('user_id',userID)
  bodyFormData.append('asker_id',foundAsker.asker_id)

  const reloadListener = (event) => {
    event.preventDefault();
    navigate('/start-asker', {state: {foundAsker, askerCode}})
  }

  useEffect(()=>{
    if (userID) {
      setUserProfile(userID);
      http.post('nextQuestionList',bodyFormData).then(res=>res.data).then(nextQuestionList=>setAnswerData(nextQuestionList));
      // setCurrentQuestionId(res.data.question_list[res.data.question_list.length-1].question_id)
    }

    if (location?.state?.from === 'asker-search') {
      cardRef?.current?.classList.add(styles.firstRotate)
    }
    if (window && location?.state?.from === 'asker-search') {
      window.addEventListener('beforeunload', reloadListener);
    }

    return () => {
      window.removeEventListener('beforeunload', reloadListener);
    }
  },[])


  const showViewAnswer = () => {
    // console.log('onc');
    navigate('/watch-answer')
  }
  const sendCurrentQuestion =async ()=>{
    if (AnswerData.total_question != 0) {
      for (
        let index = 0;
        index < AnswerData.total_question;
        index++
      ) {
        console.log(AnswerData.question_list[index].submitted_answer)
        // const element = array[index];
        if (
          AnswerData.question_list[index].submitted_answer ===
          "n"
        ) {
          cardRef?.current?.classList.add("customRotate");
          setTimeout(() => {
            navigate('/answer',{state:{
                foundAskerId:foundAsker?.asker_id,
                askerCode,
                data: AnswerData?.question_list[index],
                AnswerData,
                from: 'start-asker'
              }})
          }, 400);




          // history.push({
          //   pathname: "/RecordAnswer",
          //   state: {
          //     data: AnswerData.question_list[index],
          //     AnswerData,
          //   },
          // });
          return AnswerData.question_list[index];
        }
      }
    }
  }


  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoBlockHead}>
        <AllAnswerIcon className={styles.infoIcon}/>
        <div className={styles.infoText}>
          <span className={styles.smallText}>Brighton Art Gallery</span>
          Cleaner Job in Brighton</div>
      </div>


      <div className={`${styles.contentContainer}`}>
        <div ref={cardRef} className={`default-flip flip-card-inner cardWrap ${styles.cardWrap}`}>
          <div className={`${styles.cardBg}`}>
            <GrayBg className={styles.grayBg}/>
            <div className={styles.cardContainer}>
              <div className={` ${styles.questionBlock}`}>
                <div className={styles.questionBox}>
                  <div className={`${styles.questionItem}`}>
                    <CreateAskerIcon className={styles.createLogo}/>
                    <div className={styles.textBox}>
                      <div className={styles.text}>{foundAsker.title}</div>
                      <div className={styles.title}>{foundAsker.author}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.infoBlock}`}>
                {foundAsker.question.map((item,index)=>{
                 return <div key={index} className={`${styles.infoItem}`}>
                    <div className={styles.circleBox}><CircleLi className={styles.point}/></div>
                    <div className={styles.textInfo}>{item.question}</div>
                    <div className={styles.iconsBox}>
                      <ClockIcon className={styles.iconClock}/>
                      <span>{item.time}s</span>
                    </div>
                  </div>
                })}
                {/*<div className={`${styles.infoItem}`}>*/}
                {/*  <div className={styles.circleBox}><CircleLi className={styles.point}/></div>*/}
                {/*  <div className={styles.textInfo}>What are your strengths and weaknesses?</div>*/}
                {/*  <div className={styles.iconsBox}>*/}
                {/*    <ClockIcon className={styles.iconClock}/>*/}
                {/*    <span>30s</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className={`${styles.infoItem}`}>*/}
                {/*  <div className={styles.circleBox}><CircleLi className={styles.point}/></div>*/}
                {/*  <div className={styles.textInfo}>What’s your idea of the perfect flatmate?</div>*/}
                {/*  <div className={styles.iconsBox}>*/}
                {/*    <ClockIcon className={styles.iconClock}/>*/}
                {/*    <span>30s</span>*/}
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
                <button onClick={sendCurrentQuestion

                  // ()=>navigate('/answer',{state:{
                  //   foundAskerId:foundAsker.asker_id,
                  //   askerCode
                  //
                  // }})
                } type="button" className={`continue-btn  ${styles.buttonStyle}`}>
                  <span>START ASKER</span>
                  <div className={styles.plusIconBox}>
                    {/*<PlayIcon className={`${styles.shareIcon}`}/>*/}
                    <ArrowBtn className={`${styles.shareIcon}`}/>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <TriangleSearchSm  className={styles.rotateT}/>
          {/*<div className={styles.rotate}>*/}
          {/*  <div className="triangle-white"/>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
};

export default StartAsker;
