import React, {useEffect, useState} from 'react';
import styles from './ViewAsker.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {http} from "../../http/http";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";

const ViewAsker = (props) => {
  const location = useLocation();
  const [viewAsker, setViewAsker] = useState()
  const {asker_id, user_id} = location?.state;
  const [nextQuestionList, setNextQuestionList] = useState([]);
  // const cardRef = useRef(null);
  const [allAskers, setAllAskers] = useState([]);
  const images = [1,2, 3, 4, 5]

  useEffect(() => {
      http.post('archivedAsker', `user_id=${localStorage.getItem("UserID")}`)
      // http.post('allAsker', `user_id=${localStorage.getItem("UserID")}`)
        .then(resp => resp.data)
        .then((res) => {
          console.log('res', res, res.asker);
          if (res.status === true) {
            setAllAskers(res.asker)
          }
        })

  }, []);

  useEffect(async () => {

    if (location?.state) {
      getNextQuestionList(asker_id, user_id);
      ViewAnswer(asker_id, user_id);
    }

    // return () => clearTimeout(timer);
  }, [location]);

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

  const ViewAnswer = async (asker_id, user_id) => {
    http.post('viewAnswers', `user_id=${user_id}&asker_id=${asker_id}`)
      .then(resp => resp.data)
      .then((res) => {
        console.log('ViewAns', res);
        if (res.status === true) {
          setViewAsker(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };



  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.contentContainer}`}>
        <CustomCarousel
          data={allAskers}
          autoPlay={false}
          state={location?.state}
          interval={5000}
          nextQuestionList={nextQuestionList}
          viewAsker={viewAsker}
          // type={'watchAnswer'}
          type={'viewAsker'}
        />
      </div>
    </div>
  )
};

export default ViewAsker;
