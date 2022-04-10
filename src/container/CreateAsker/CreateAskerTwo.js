import React, {useEffect, useRef, useState} from 'react';
import styles from "./CreateAsker.module.scss";
import QuestionSmall from "../../components/UI/icons/QuestionSmall";
import ClockIcon from "../../components/UI/icons/ClockIcon";
import AddQuestion from "../../components/UI/icons/AddQuestion";
import CreateAskerIcon from "../../components/UI/icons/Create/CreateAskerIcon";
import EditCreateBtn from "../../components/UI/icons/Create/EditCreateBtn";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import PlusIcon from "../../components/UI/icons/Create/PlusIcon";
import {Modal} from "react-bootstrap";
import {http} from "../../http/http";
import EmailIcon from "../../components/UI/icons/EmailIcon";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const CreateAskerTwo = (props) => {
  const [questions,setQuestions] = useState([]);

  const [show, setShow] = useState(false);
  const [activeQuestion,setActiveQuestion]=useState('');
  const [disabledTitle,setDisabledTitle]=useState(true);
  const [disabledAuthor,setDisabledAuthor]=useState(true);
  const elRef = useRef();
  const elRefFade = useRef();
  const userID = localStorage.getItem('UserID')
  const bodyFormData = new FormData();
  bodyFormData.append('user_id', userID)
  bodyFormData.append('asker_id', props.activeAskerId)
  bodyFormData.append('question', activeQuestion)
  const handleContinue = () => {
    http.post('askerQuestion',bodyFormData)

  };

  const removeEffect = () => {
    handleContinue()
    // elRef.current?.classList.add("ease-out-effect")
    elRefFade.current?.classList.add("ease-in-effect")
    elRef.current?.classList.add("fade-out");
    const timer = setTimeout(() => {
      props.nextStep()
    }, 300);
    return timer;
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const firstBlockQuestions = [
    'Tell me about your strengths & weaknesses',
    'Tell me about yourself in 30 seconds',
    'Tell me why you’re perfect for this role',
    'Tell me what makes you unique',
    'Tell me what you most enjoy about work'
  ]
  const secondBlockQuestions = [
    'Tell me about your relevant experience',
    'Tell me what makes you a great candidate',
    'Tell me where you see yourself in 5 years',
    'Tell me about a time you face adversity',
    'Tell me what you’d like to ask about the position'
  ]

  useEffect(()=>{
    http.post('questionList').then(res=>res.data).then(questionData=>setQuestions(questionData.question))

  },[])
  // const renderQuestionList = (text) => {
  //   re
  // }

  return (
    <div  className={`${styles.askerWrapper}`}>
    {/*<div ref={elRef} className={` ease-in-effect ${styles.askerWrapper}`}>*/}
      {/*<div className={styles.contantWrap}>*/}
      {/*<div className={`${styles.askerWrapper}`}>*/}
      <div className={`${styles.askerRow}`}>

        {/*<div ref={elRefFade} className={` ease-in-effect ${styles.askerCol} `}>*/}
        <div ref={elRefFade} className={` ease-out-effect ${styles.askerCol} `}>
          <div className={`${styles.contantWrapTwo}`}>
            <div className={` ${styles.questionBlock}`}>
              <CreateAskerIcon className={styles.createLogo}/>
              <div className={styles.questionBox}>
                <div className={`${styles.questionItem} ${styles.questionItemSolid}    ${disabledTitle? styles.questionItemDisabled : '' }`}>
                  <div className={styles.textBox}>
                    <label className={styles.title}>Who’s Asking?</label>
                    <input name={'name-3'} defaultValue={props.currentAsker.job_title} disabled={disabledTitle} placeholder='e.g Recruitment Agency'/>
                    {/*<span className={styles.text}>e.g Recruitment Agency</span>*/}
                  </div>
                  <div onClick={(prevState)=>setDisabledTitle(!prevState)} className={styles.iconWrap}>
                    <EditCreateBtn className={styles.editIcon}/>
                  </div>
                </div>
                <div className={`${styles.questionItem} ${styles.questionItemSolid} ${disabledAuthor? styles.questionItemDisabled : '' }`}>
                  <div className={styles.textBox}>
                    <label className={styles.title}>What’s it About?</label>
                    <input name={'name-4'} defaultValue={props.currentAsker.job_author} disabled={disabledAuthor} placeholder='e.g Questions for Candidates'/>
                    {/*<span className={styles.text}>e.g Questions for Candidates</span>*/}
                  </div>
                  <div onClick={(prevState)=>setDisabledAuthor(!prevState)} className={styles.iconWrap}>
                    <EditCreateBtn className={styles.editIcon}/>
                  </div>
                </div>
              </div>
            </div>
              <div className={`${styles.questionItemEmpty}`}>
                <button type="button" className={styles.iconWrap} onClick={handleShow}>
                  <PlusIcon className={styles.editIcon}/>
                </button>
                <div className={styles.activeQuestionText}>{activeQuestion}</div>
                <ClockIcon className={styles.iconClock}/>
              </div>

            <div className={`button-box ${styles.buttonBox}`}>
              <button type="button" className={`continue-btn ${styles.buttonStyle}`} onClick={removeEffect} disabled={activeQuestion === ''? true : false}>
                <span>PUBLISH ASKER</span>
                <ArrowBtn className={`arrow-btn ${styles.arrowTop}`}/>
              </button>
            </div>
            <TriangleSearchSm className={`${styles.rotateT} ${styles.rotateT_two}`}/>
            {/*</div>*/}
          </div>
        </div>

        <div ref={elRef} className={` fade-in  ${styles.askerScrol} `}>
          <div className={`${styles.questionsWrap}`}>
            <div className={`${styles.questionsCol}`}>
              {
                questions.map((item, index) =>
                  <div key={index} className={styles.questionBoxList} onClick={()=>setActiveQuestion(item.question)}>
                    <QuestionSmall className={styles.questionIcon}/>
                    <div className={styles.questionText}>{item.question}</div>
                    <ClockIcon className={styles.clockIcon}/>
                  </div>
                )
              }
              <button type='button' className={styles.createBox} onClick={handleShow}>
                <div className={styles.questionText}>CREATE QUESTION</div>
                <AddQuestion className={styles.addIcon}/>
              </button>
              {
                questions.map((item, index) =>
                  <div key={index} className={styles.questionBoxList} onClick={()=>setActiveQuestion(item.question)}>
                    <QuestionSmall className={styles.questionIcon}/>
                    <div className={styles.questionText}>{item.question}</div>
                    <ClockIcon className={styles.clockIcon}/>
                  </div>
                )
              }
              {/*{*/}
              {/*  secondBlockQuestions.map((item, index) =>*/}
              {/*    <div key={index} className={styles.questionBoxList}>*/}
              {/*      <QuestionSmall className={styles.questionIcon}/>*/}
              {/*      <div className={styles.questionText}>{item}</div>*/}
              {/*      <ClockIcon className={styles.clockIcon}/>*/}
              {/*      /!*<ClockIcon className={styles.clockIcon}/>*!/*/}
              {/*    </div>*/}
              {/*  )*/}
              {/*}*/}

            </div>
          </div>
        </div>

      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="add-question-modal"
      >
        <Modal.Body>
          <div id="shareAskerModal" className={`add-question-modal ${styles.addQuestionModal}`}>
            <div className={`${styles.contantWrapTwoModal}`}>
              <div className={` ${styles.questionBlock}`}>
                <CreateAskerIcon className={styles.createLogo}/>
                <div className={styles.questionBox}>
                  <div className={`${styles.questionItem} ${styles.questionItemSolid}  ${disabledTitle? styles.questionItemDisabled : '' }`}>
                    <div className={styles.textBox}>
                      <label className={styles.title}>Who’s Asking?</label>
                      <input name={'name-3'} defaultValue={props.currentAsker.job_title} disabled={disabledTitle} placeholder='e.g Recruitment Agency'/>
                      {/*<span className={styles.text}>e.g Recruitment Agency</span>*/}
                    </div>
                    <div onClick={(prevState)=>setDisabledTitle(!prevState)} className={styles.iconWrap}>
                      <EditCreateBtn className={styles.editIcon}/>
                    </div>
                  </div>
                  <div className={`${styles.questionItem} ${styles.questionItemSolid} ${disabledAuthor? styles.questionItemDisabled : '' }`}>
                    <div className={styles.textBox}>
                      <label className={styles.title}>What’s it About?</label>
                      <input name={'name-4'} defaultValue={props.currentAsker.job_author} disabled={disabledAuthor} placeholder='e.g Questions for Candidates'/>
                      {/*<span className={styles.text}>e.g Questions for Candidates</span>*/}
                    </div>
                    <div  onClick={(prevState)=>setDisabledAuthor(!prevState)} className={styles.iconWrap}>
                      <EditCreateBtn className={styles.editIcon}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.questionItemEmpty}`}>
                <button type="button" className={styles.iconWrap} onClick={removeEffect}>
                  <PlusIcon className={styles.editIcon}/>
                </button>
                <input className={styles.activeQuestionText} onChange={(e)=>{setActiveQuestion(e.target.value)}} type='text' placeholder='Add new question please' />
                {/*<div className={styles.activeQuestionText}>{activeQuestion}</div>*/}
                <ClockIcon className={styles.iconClock}/>
              </div>

              <div className={`button-box ${styles.buttonBox}`}>
                <button type="button" className={`continue-btn ${styles.buttonStyle}`} onClick={handleClose} disabled={activeQuestion === ''? true : false}>
                  <span>Save question</span>
                  <ArrowBtn className={`arrow-btn ${styles.arrowTop}`}/>
                </button>
              </div>
              {/*<ArrowDown  className={styles.rotateT}/>*/}
              <TriangleSearchSm className={`${styles.rotateT} ${styles.rotateT_two}`}/>
              {/*</div>*/}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateAskerTwo;
