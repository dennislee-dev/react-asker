import React, {useEffect, useState} from 'react';
import styles from "./Answer.module.scss";

const ButtonAnswer = ({time, startTimer,cb}) => {
  const [newTimer, setNewTimer] = useState(time)

  // useEffect(() => {
  //   if (time) {
  //     set
  //   }
  // })

  useEffect(() => {
      const count = setInterval(() => {setNewTimer(prevState => {
          // console.log('prevst', prevState);
          if (prevState > 0) {
            return prevState - 1;
          } else {
            clearInterval(count)
            return 0
          }
        }
      )}, 1000)
    return () => clearInterval(count)
  }, [])

  return (
    <button type='button' className={styles.content} onClick={cb}>
      <span>finish answer</span>

      <div className={styles.redCircleWrap}>
        <div className={styles.timer}>
          {newTimer}
        </div>
      </div>
      <div className={styles.line}/>
    </button>
  )
};

export default ButtonAnswer;
