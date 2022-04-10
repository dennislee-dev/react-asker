import React, {useRef, useState} from 'react';
import styles from "./CreateAsker.module.scss";
import CreateAskerIcon from "../../components/UI/icons/Create/CreateAskerIcon";
import EditCreateBtn from "../../components/UI/icons/Create/EditCreateBtn";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import CheckIcon from "../../components/UI/icons/Create/CheckIcon";
import PlusIcon from "../../components/UI/icons/Create/PlusIcon";
import {http} from "../../http/http";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const CreateAskerOne = ({...props}) => {
  const elRef = useRef();
  const userID = localStorage.getItem('UserID')


  const removeEffect = () => {
    props.setCurrentAsker(asker)
    handleContinue()
    // elRef.current?.classList.add("ease-out-effect")
    elRef.current?.classList.add("fade-out")
    const timer = setTimeout(() => {
      props.nextStep()
    }, 300);
    return timer;
  };
  const [asker,setAsker] =useState({
    job_title:'',
    job_author:'',
  })

  console.log('asker', asker, userID);

  const handleChange = e => {
    const { name, value } = e.target;
    setAsker(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const bodyFormData = new FormData();
  bodyFormData.append('job_title', asker.job_title)
  bodyFormData.append('job_author', asker.job_author)
  bodyFormData.append('user_id',userID)
  const handleContinue = () => {
   http.post('createAsker',bodyFormData).then(res=>res.data).then(askerId => props.setActiveAskerId(askerId?.asker?.id))

  };

  return (
    <div ref={elRef} className={` fade-in ${styles.createContainer}`}>
    {/*<div ref={elRef} className={` ease-in-effect ${styles.createContainer}`}>*/}
      <div className={styles.contantWrap}>
        <div className={` ${styles.questionBlock}`}>
          <CreateAskerIcon className={styles.createLogo}/>
          <div className={styles.questionBox}>
            <div className={`${styles.questionItem} ${styles.questionItemSolid}`}>
              <div className={styles.textBox}>
                <label className={styles.title}>Who’s Asking?</label>
                <input name='job_title'  placeholder='e.g Recruitment Agency' onChange={handleChange}/>
              </div>
              <div className={`${styles.iconWrap}`}>
                <EditCreateBtn className={styles.editIcon}/>
              </div>
            </div>

            <div className={`${styles.questionItem} ${styles.questionItemDash}`}>
              <div className={styles.textBox}>
                <label className={styles.title}>What’s it About?</label>
                <input name='job_author' placeholder='e.g Questions for Candidates' onChange={handleChange}/>
              </div>
              <div className={`${styles.iconWrap} ${styles.iconWrapCheck}`}>
                <CheckIcon className={styles.checkIcon}/>
              </div>
            </div>
          </div>
        </div>
        <div className={`button-box ${styles.buttonBox}`}>
          <button type="button" className={`continue-btn  ${styles.buttonStyle}`}  onClick={removeEffect}>
            <span>ADD QUESTIONS</span>
            <div className={styles.plusIconBox}>
              <PlusIcon className={` ${styles.plusIcon}`}/>
            </div>
          </button>
        </div>
        <TriangleSearchSm  className={styles.rotateT}/>
      </div>
    </div>
  )
};

export default CreateAskerOne;
