import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./EditAsker.module.scss";
import CreateAskerIcon from "../../components/UI/icons/Create/CreateAskerIcon";
import ClockIcon from "../../components/UI/icons/ClockIcon";
import EditCreateBtn from "../../components/UI/icons/Create/EditCreateBtn";
import CheckIcon from "../../components/UI/icons/Create/CheckIcon";
import {http} from "../../http/http";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const EditAsker = ({setType, setIsLeft, setAskerCode, type, location, ...props}) => {

  // const location = useLocation();
  const {asker_id, user_id, viewAsker} = location;
  const [nextQuestionList, setNextQuestionList] = useState([]);
  const [currentAsker, setCurrentAsker] = useState();
  const [newAuthor, setNewAuthor] = useState();
  const [newTitle, setNewTitle] = useState();
  const [EditQuestion, SetEditQuestion] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [selectedQuestionText, setSelectedQuestionText] = useState('');
  const [editField, setEditField] = useState(null)
  const [isRotate, setIsRotate] = useState(false)
  const [sendedRequestTitle, setSendedRequestTitle] = useState(false)
  const [changedQuestion, setChangedQuestion] = useState('');
  let navigate = useNavigate();
  const cardRef = useRef(null);

  // console.log('edit location', location);
  const getNextQuestionList = async (asker_id, user_id) => {
    http.post('nextQuestionList', `user_id=${user_id}&asker_id=${asker_id}`)
      .then(resp => resp.data)
      .then((res) => {
        console.log('getNextQuestionLi', res);
        if (res.status === true) {
          setNextQuestionList(res?.question_list)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  const sendChangedQuestion = async (asker_id, user_id, question_id, question) => {

    http.post('askerEditQuestion', `user_id=${user_id}&asker_id=${asker_id}&question_id=${question_id}&question=${question}`)
      .then(resp => resp.data)
      .then((res) => {
        // console.log('askerEditQuestion', res);
        if (res.status === true) {
          setChangedQuestion(res.updated_question)
          // console.log('askerEditQuestion', res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  const getCurrentAsker = async (asker_id, user_id) => {

    http.post('viewAnswers', `user_id=${user_id}&asker_id=${asker_id}`)
      .then(resp => resp.data)
      .then((res) => {
        // console.log('askerEditQuestion', res);
        if (res.status === true) {
          setCurrentAsker(res.data)
          // console.log('askerEditQuestion', res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  const sendChangedTitleOrAuthors = async (asker_id, user_id, asker_title = currentAsker?.asker_title, asker_author = currentAsker?.asker_author) => {

    http.post('askerTitle', `user_id=${user_id}&asker_id=${asker_id}&asker_title=${asker_title}&asker_author=${asker_author}`)
      .then(resp => resp.data)
      .then((res) => {
        // console.log('askerEditQuestion', res);
        if (res.status === true) {
          setSendedRequestTitle(prevState => !prevState)
          setNewAuthor(res.asker_author)
          setNewTitle(res.asker_title)

        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  useEffect(async () => {
    if (cardRef?.current?.classList.contains("start-rotate")) {
      cardRef?.current?.classList.remove("start-rotate")
    }

    const timer = setTimeout(() => {
      cardRef?.current?.classList.add("start-rotate")
      setIsRotate(true)
    }, 1);

    console.log('timer', timer);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    getCurrentAsker(asker_id, user_id)
    getNextQuestionList(asker_id, user_id)

  }, [])


  const showContact = () => {
    navigate('/contact-card')
  }

  const handleEdit = (e, type) => {
    // if (type === 'name') {
    setEditField(type)
    setSendedRequestTitle(false)
    // }
  }
  const changeType = (e, type) => {
    e.preventDefault();
    setType(type)
    if(type === 'edit-share'){
      setIsLeft(false);
    }
    SetEditQuestion(prevState => !prevState)
  }

  return (
    <>
      <div ref={cardRef} className={`card card--back bg-color ${styles.cardBg} ${type === 'edit' ? styles.activeEdit : ''} `}>
        <div className={styles.cardContainer}>
          <div className={` ${styles.questionBlock}`}>
            <CreateAskerIcon className={styles.createLogo}/>
            <div className={styles.questionBox}>
              <div className={`${styles.questionItem} ${editField === 'job' ? styles.questionItemSolid : ''}`}>
                <div className={styles.textBox}>
                  {editField == null || editField === 'job' ?
                    <div className={styles.titleSmall}>{newTitle ? newTitle : currentAsker?.asker_title}</div> :
                    <input name={'job'} onChange={(e) => setNewTitle(e.target.value)} defaultValue={currentAsker?.asker_title} placeholder=''/>
                  }
                </div>
                {editField == null || editField === 'job' ?
                  <button type='button' className={`${styles.iconWrap}`} onClick={(e) => handleEdit(e, 'name')}>
                    <EditCreateBtn className={styles.editIcon}/>
                  </button> :
                  <button type='button' className={`${styles.iconWrap} ${sendedRequestTitle ? styles.iconWrapCheck : ''}`}
                          onClick={(e) => sendChangedTitleOrAuthors(asker_id, user_id, newTitle, newAuthor)}>
                    {/*<EditCreateBtn className={styles.editIcon}/>*/}
                    <CheckIcon className={`${styles.checkIcon} `}/>
                  </button>
                }

              </div>
              <div className={`${styles.questionItem} ${editField === 'name' ? styles.questionItemSolid : ''}`}>
                <div className={styles.textBox}>
                  {editField == null || editField === 'name' ?
                    <div className={styles.title}>{newAuthor ? newAuthor : currentAsker?.asker_author}</div> :
                    <input name={'name'} onChange={(e) => setNewAuthor(() => e.target.value)} defaultValue={currentAsker?.asker_author} placeholder=''/>
                  }
                </div>
                {editField == null || editField === 'name' ?
                  <button type='button' className={`${styles.iconWrap}`} onClick={(e) => handleEdit(e, 'job')}>
                    <EditCreateBtn className={styles.editIcon}/>
                  </button> :
                  <button type='button' className={`${styles.iconWrap} ${sendedRequestTitle ? styles.iconWrapCheck : ''}`}
                          onClick={(e) => sendChangedTitleOrAuthors(asker_id, user_id, newTitle, newAuthor)}>
                    {/*<EditCreateBtn className={styles.editIcon}/>*/}
                    <CheckIcon className={styles.checkIcon}/>
                  </button>
                }
              </div>

            </div>
          </div>
          <div  className={styles.contentBlockContainer}>
          {nextQuestionList && nextQuestionList.map((item, index) => {
            return (selectedQuestionId === item.question_id && EditQuestion ?

                <div key={item.question_id} className={`${styles.questionItem} ${styles.questionItemDash}`}>
                  <div onClick={() => {
                    setSelectedQuestionText(item.title)
                    sendChangedQuestion(asker_id, user_id, selectedQuestionId, selectedQuestionText)
                    // await getNextQuestionList(asker_id,user_id)
                    SetEditQuestion(prevState => !prevState)
                    setNextQuestionList((prevState) => [...prevState.map((selectedQuest) => {
                      if (selectedQuestionId === selectedQuest.question_id) {
                        return {
                          ...selectedQuest,
                          title: selectedQuestionText || item.title
                        }

                      }
                      return selectedQuest
                    })])
                    setSelectedQuestionText('')
                  }} className={`${styles.iconWrap} ${styles.iconWrapCheck}`}>
                    <CheckIcon className={styles.checkIcon}/>
                  </div>
                  <div className={styles.textBox}>
                    {/*<div className={styles.textEdit}>{item.title}</div>*/}
                    <input type='text' className={styles.textEdit} onChange={(e) => setSelectedQuestionText(e.target.value)} defaultValue={item.title}/>
                    {/*<input name={'name-4'} placeholder='e.g Questions for Candidates'/>*/}
                    {/*<span className={styles.text}>e.g Questions for Candidates</span>*/}
                  </div>
                  <div className={styles.timesBox}>
                    {/*<span>30s</span>*/}
                    <span className={styles.active}>{item.time}s</span>
                    <span>90s</span>
                  </div>
                </div>
                :
                <div key={item.question_id} className={styles.contentBlock}>
                  <div className={`${styles.questionItemEmpty}`}>
                    <button type="button" onClick={() => {
                      setSelectedQuestionId(item.question_id)
                      SetEditQuestion(prevState => !prevState)
                    }} className={styles.iconWrap}>
                      <EditCreateBtn className={styles.editIcon}/>
                    </button>
                    <input className={styles.textEdit} disabled={true} type='text' onChange={(e) => e.target.value} defaultValue={item.title}/>
                    {/*<div className={styles.textEdit}>{item.title}</div>*/}
                    <div className={styles.iconsBox}>
                      <ClockIcon className={styles.iconClock}/>
                      <span>{item.time}s</span>
                    </div>
                  </div>
                </div>


              )
          })}
          </div>
          <div className={`button-box ${styles.buttonBox}`}>
            <button type="button"
                    onClick={(e) => {
                      setAskerCode(currentAsker.asker_code)
                      changeType(e, 'edit-share')
                    }}
                    className={`continue-btn  ${styles.buttonStylePublich}`}>
              <span>SAVE CHANGES</span>
              <div className={styles.plusIconBox}>
                <CheckIcon className={`${styles.shareIcon}`}/>
              </div>
            </button>

          </div>
          {/*<div className={styles.rotate}>*/}
          {/*  <div className="triangle-white"/>*/}
          {/*</div>*/}

        </div>
        <TriangleSearchSm className={`${styles.rotateT}`}/>
        {/*<ArrowDown className={styles.rotateT}/>*/}


      </div>

    </>
  )
};

export default EditAsker;
