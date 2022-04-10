import React, {useEffect, useRef, useState} from 'react';
import styles from "../../../../container/CreateAsker/CreateAsker.module.scss";
import CreateAskerIcon from "./CreateAskerIcon";
import EditCreateBtn from "./EditCreateBtn";
import CheckIcon from "./CheckIcon";
import PlusIcon from "./PlusIcon";
import ClockIcon from "../ClockIcon";
import ArrowBtn from "../ArrowBtn";
import {useNavigate} from "react-router-dom";
import {http} from "../../../../http/http";
import ArrowDown from "../ArrowDown";
import TriangleSearchSm from "../TriangleSearchSm";

const CreateAskerThird = (props) => {
  const elRef = useRef();
  const userID = localStorage.getItem('UserID')
  const [sharedAskerId,setSharedAskerId] = useState('');
  const [disabledTitle,setDisabledTitle]=useState(true);
  const [disabledAuthor,setDisabledAuthor]=useState(true);
  let navigate = useNavigate();
  const [timer, setTimer] = useState()
  const [selectedQuestions,setSelectedQuestions]= useState([]);


  const showContact = () => {
    navigate('/contact-card')
  }



  const bodyFormData = new FormData();
  bodyFormData.append('asker_id', props.activeAskerId);
  bodyFormData.append('user_id', userID);

  useEffect(()=>{
    http.post('nextQuestionList',bodyFormData).then(res=>res.data).then(dataSelectedQuestions =>setSelectedQuestions(dataSelectedQuestions.question_list))
    return publishAsker()
  },[])
  const publishAsker = () => {
    http.post('publishAsker',bodyFormData).then(res=>res.data).then(sharedID=>setSharedAskerId(sharedID.asker.asker_code))
  }
  const removeEffect = () => {
    // elRef.current?.classList.add("ease-out-effect")
    elRef.current?.classList.add("fade-out")
    const timer = setTimeout(() => {
      navigate('/share-asker',{
        state: { sharedAskerId: sharedAskerId } })
    }, 300);
    return timer;
  };
  return (
    <div ref={elRef} className={`fade-in ${styles.createContainer}`}>
    {/*<div ref={elRef} className={`ease-in-effect  ${styles.createContainer}`}>*/}
      <div className={styles.contantWrap}>
        <div className={` ${styles.questionBlock}`}>
          <CreateAskerIcon className={styles.createLogo}/>
          <div className={styles.questionBox}>
            <div className={`${styles.questionItem} ${styles.questionItemSolid}  ${disabledTitle? styles.questionItemDisabled : '' }`}>
              <div className={styles.textBox}>
                <label className={styles.title}>Who’s Asking?</label>
                <input name={'name-3'} defaultValue={props.currentAsker.job_title} disabled={disabledTitle} placeholder='e.g Recruitment Agency'/>
              </div>
              <button onClick={(prevState)=>setDisabledTitle(!prevState)} className={`${styles.iconWrap}`}>
                <EditCreateBtn className={styles.editIcon}/>
              </button>
            </div>
            <div className={`${styles.questionItem} ${styles.questionItemSolid} ${disabledAuthor? styles.questionItemDisabled : '' }`}>
              <div className={styles.textBox}>
                <label className={styles.title}>What’s it About?</label>
                <input name={'name-4'} defaultValue={props.currentAsker.job_author} disabled={disabledAuthor} placeholder='e.g Questions for Candidates'/>
              </div>
              <div onClick={(prevState)=>setDisabledAuthor(!prevState)} className={`${styles.iconWrap}`}>
                <EditCreateBtn className={styles.editIcon}/>
              </div>
            </div>

          </div>
        </div>
        {selectedQuestions.map((item,index)=>{
         return  <div key={item.question_id} className={`${styles.questionItem} ${styles.questionItemDash}`}>
            <div className={`${styles.iconWrap} ${styles.iconWrapCheck}`}>
              <CheckIcon className={styles.checkIcon}/>
            </div>
            <div className={styles.textBox}>
              {/*<label className={styles.title}>{item.title}</label>*/}
              <input name={'name-4'} defaultValue={item.title} placeholder='e.g Questions for Candidates'/>
              {/*<span className={styles.text}>e.g Questions for Candidates</span>*/}
            </div>
            <div className={styles.timesBox}>
              {/*<span>30s</span>*/}
              <span className={styles.active}>{item.time}s</span>
              {/*<span>90s</span>*/}
            </div>
          </div>
        })}
        <div className={`${styles.questionItemEmpty}`}>
          <button type="button" className={styles.iconWrap} onClick={removeEffect}>
            <PlusIcon className={styles.editIcon}/>
          </button>
          <ClockIcon className={styles.iconClock}/>
        </div>
        <div className={`button-box ${styles.buttonBox}`}>
          <button type="button" className={`continue-btn  ${styles.buttonStylePublich}`} onClick={removeEffect}>
            <span>PUBLISH ASKER</span>
            <ArrowBtn className={`arrow-btn ${styles.arrowTopGreen}`}/>
          </button>
        </div>
        {/*<div className={styles.rotate}>*/}
        <TriangleSearchSm className={`${styles.rotateT} ${styles.rotateT_two}`}/>
        {/*<ArrowDown  className={styles.rotateT}/>*/}
        {/*</div>*/}
      </div>
    </div>
  )
};

export default CreateAskerThird;
