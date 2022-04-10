import React, {useEffect, useState} from 'react';
import styles from './Home.module.scss';
import {NavLink} from "react-router-dom";
import QuestionSmall from "../../components/UI/icons/QuestionSmall";
import ClockIcon from "../../components/UI/icons/ClockIcon";
import AddQuestion from "../../components/UI/icons/AddQuestion";

const HomeCreateQuestion = (props) => {
  const [AllPromotionVideo, setAllPromotionVideo] = useState([]);

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

  // const renderQuestionList = (text) => {
  //   re
  // }

  return (
    <div className={`${styles.askerWrapper}`}>
      <div className={`${styles.askerRow}`}>
        <div className={`${styles.questionsWrap}`}>
          <div className={`${styles.questionsCol}`}>
            {
              firstBlockQuestions.map((item, index) =>
                <div key={index} className={styles.questionBox}>
                  <QuestionSmall className={styles.questionIcon}/>
                  <div className={styles.questionText}>{item}</div>
                  <ClockIcon className={styles.clockIcon}/>
                </div>
              )
            }
            <button type='button' className={styles.createBox}>
              <div className={styles.questionText}>CREATE QUESTION</div>
              <AddQuestion className={styles.addIcon}/>
            </button>
            {
              secondBlockQuestions.map((item, index) =>
                <div key={index} className={styles.questionBox}>
                  <QuestionSmall className={styles.questionIcon}/>
                  <div className={styles.questionText}>{item}</div>
                  <ClockIcon className={styles.clockIcon}/>
                </div>
              )
            }

          </div>
        </div>
        <div className={`${styles.askerCol}  ${styles.withPadding}`}>
          <div className={styles.question}>
            <div className={styles.iconTop}/>
          </div>
          <div className={`${styles.imgWrapStatic} ${styles.imgCreatePhone}`}/>
          <div className={`${styles.questionBottom}`}>
            <div className={`${styles.iconBottom}`}/>
          </div>
        </div>
      </div>
      {/*</div>*/}
    </div>
  );
};

export default HomeCreateQuestion;
