import React, {useEffect, useState} from 'react';
import styles from './AllAnswers.module.scss'
import AllAnswerIcon from "../../components/UI/icons/AllAnswerIcon";
import {useNavigate} from "react-router-dom";
import {http} from "../../http/http";

const AllAnswers = (props) => {
  let navigate = useNavigate();
  const [arrAsker, setArrAsker] = useState([])
  const answersArray = arrAsker;
  const userID = JSON.parse(localStorage.getItem("UserID"));
  useEffect(()=>{
    http.post('allAsker', `user_id=${userID}`).then(resp => resp.data).then(askersData => setArrAsker(askersData.asker.filter(o => o.watch_answer === 'y')))
  },[userID])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoBlock}>
        <AllAnswerIcon className={styles.infoIcon}/>
        <div className={styles.infoText}>Brighton Art Gallery<br/> Cleaner Job in Brighton</div>
      </div>
      <div className={styles.answersWrapper}>
        <div className={styles.row}>
          <div className={styles.answersSpace}/>
          {
            arrAsker.map((item, index) => {
              return <div key={item.asker_id} onClick={()=>navigate('/watch-answer',{state:{
                  asker_id:item.asker_id,
                  user_id:userID
                }})} className={styles.cardWrap}>
                <div className={styles.answersContainer}>
                  <div className={styles.answerCard}/>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
};

export default AllAnswers;
