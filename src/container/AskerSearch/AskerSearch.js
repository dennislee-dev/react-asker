import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./AskerSearch.module.scss";
import AllAnswerIcon from "../../components/UI/icons/AllAnswerIcon";
import SearchBgTriangle from "../../components/UI/icons/SearchBgTriangle";
import QuestionOption from "../../components/UI/icons/QuestionOption";
import SearchIcon from "../../components/UI/icons/SearchIcon";
import {http} from "../../http/http";
import {ReactComponent as ArrowDown} from '../../image/svg/arow-down.svg';
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const AskerSearch = (props) => {
  const cardRef = useRef(null);
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [asker, setAsker] = useState('');


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

    http.post('askerCode', `asker_code=${search}&user_id=${localStorage.getItem("UserID")}`)
      .then(resp => resp.data)
      .then(res => {
        // console.log(res)
        if (res != null) {
          // await setAsker(res.asker)

          cardRef?.current?.classList.add("customRotate")
          setTimeout(() => {
            navigate('/start-asker', {
              state: {
                foundAsker: res.asker,
                askerCode: search,
                from: 'asker-search'
              }
            })
          }, 400);



          // if (respJson.status === true) {
          //   history.push({ pathname: "/SatrtAnswer", state: respJson });
          // }
        }
      })
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
      <div className={`${styles.contentContainer}`}>
        <div ref={cardRef} className={`default-flip flip-card-inner cardWrap ${styles.cardWrapContact}`}>
            <div className={styles.cardContainerContact}>
          <div className={styles.triangleWrap}>
              <div className={styles.contentBox}>
                <SearchBgTriangle className={styles.triangleBgIcon}/>
                <div className={styles.searchBox}>
                  <div className={styles.titleBox}>
                    <QuestionOption className={styles.questionOption}/>
                    Asker Search
                  </div>
                  <div className={styles.text}>Enter Asker Access Code below.</div>

                  <div className={`search-filled ${styles.searchFilled}`}>
                    <input
                      type="text"
                      name="asker_code"
                      placeholder="ENTER ASKER CODE"
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.searchBtn}
                      onClick={() => hendaleingFormSubmit()}
                    >
                      <SearchIcon className={styles.serchIcon}/>
                    </button>
                  </div>
                </div>
                {/*<ArrowDown className={styles.arrowDown}/>*/}
              </div>
            {/*<TriangleSearchSm className={styles.rotateT}/>*/}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default AskerSearch;
