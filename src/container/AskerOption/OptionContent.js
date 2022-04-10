import React from 'react';
import styles from "./AskerOption.module.scss";
import CloseIcon from "../../components/UI/icons/CloseIcon";
import QuestionOption from "../../components/UI/icons/QuestionOption";
import EditCreateBtn from "../../components/UI/icons/Create/EditCreateBtn";
import ShareIcon from "../../components/UI/icons/ShareIcon";
import MessageIcon from "../../components/UI/icons/MessageIcon";
import BellIcon from "../../components/UI/icons/BellIcon";
import TwoMenIcon from "../../components/UI/icons/TwoMenIcon";
import {http} from "../../http/http";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const OptionContent = ({closeOption, setIsLeft, type, isActiveAsker, selectPrivate, setSelectPrivate, location, setType,setAskerCode,viewAsker, ...props}) => {
  const onChangePrivate = (e) => {
    // e.preventDefault();
    if (e.target.checked) {
      activeAsker("a");
      setSelectPrivate("checked");
    } else {
      setSelectPrivate("");
      activeAsker("i");
    }
    // }
  };

  const activeAsker = (status) => {
    http.post('inactiveAsker', `user_id=${location?.state?.user_id}&asker_id=${location?.state?.asker_id}&asker_status=${status}`)
      .then(resp => resp.data)
      .then((res) => {
       // return setAskerCode(res.asker_code)
       //  console.log('resOption', res);
        // if (res.status === true) {
        // setCountryData(res?.country);
        // }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const changeType = (e, type) => {
    e.preventDefault();
    if (type === 'menu-share') {
      setIsLeft(true)
    }

    setType(type)
  }

  console.log(type)

  return (
      <>
        <div className={`card card--front ${(type === 'edit' || type === 'menu-share' || type === 'edit-share') ? 'card--front--flip' : ''} ${styles.cardBg}`}>
          <button className={styles.btnClose} onClick={(e) => closeOption(e)}>
            <CloseIcon className={styles.closeIcon}/>
          </button>
          {/*</div>*/}
          <div className={styles.cardContainer}>
            <div className={styles.titleBox}>
              <QuestionOption className={styles.questionOption}/>
              Asker Options
            </div>
            <div className={styles.btnBox}>
              <button className={styles.contentBox} type='button' onClick={(e) => changeType(e, 'edit')}>
                <div className={`${styles.optionBlock} `}>
                  <div className={styles.iconWrap}>
                    <EditCreateBtn className={styles.linkIcon}/>
                  </div>
                  <div className={styles.textBox}>
                    <span className={styles.title}>Edit</span>
                    <span className={styles.text}>Edit this Asker</span>
                  </div>
                </div>
              </button>

              <button className={styles.contentBox} onClick={(e) => {
                setAskerCode(viewAsker.asker_code)
                changeType(e, 'menu-share')
              }}>
                <div className={`${styles.optionBlock} `}>
                  <div className={styles.iconWrap}>
                    <ShareIcon className={styles.linkIcon}/>
                  </div>
                  <div className={styles.textBox}>
                    <span className={styles.title}>Publish & Share</span>
                    <span className={styles.text}>Invite people to answer</span>
                  </div>
                </div>
              </button>
              <button className={styles.contentBox}>
                <div className={`${styles.optionBlock} `}>
                  <div className={styles.iconWrap}>
                    <MessageIcon className={styles.linkIcon}/>
                  </div>
                  <div className={styles.textBox}>
                    <span className={styles.title}>Contact</span>
                    <span className={styles.text}>Respond to your answers</span>
                  </div>
                </div>
              </button>
              <button className={styles.contentBox}>
                <div className={`${styles.optionBlock} `}>
                  <div className={styles.iconWrap}>
                    <BellIcon className={styles.linkIcon}/>
                  </div>
                  <div className={styles.textBox}>
                    <span className={styles.title}>Notifications</span>
                    <span className={styles.text}>Stay updated with this Asker</span>
                  </div>
                </div>
              </button>
              <button className={styles.contentBox}>
                <div className={`${styles.optionBlock} `}>
                  {/*<div className={styles.iconWrap}>*/}
                  <TwoMenIcon className={styles.menIcon}/>
                  {/*</div>*/}
                  <div className={styles.textBox}>
                    <span className={styles.title}>Collaborate</span>
                    <span className={styles.text}>Share Admin Access to this Asker</span>
                  </div>
                </div>
              </button>
            </div>
            <div className={`${styles.deactivateBlock}`}>
              <div className={`${styles.acdcToogler}`}>
                <input
                  type="checkbox"
                  role={'checkbox'}
                  className="toggle-switch-checkbox"
                  name="toggleSwitchPrivateuser"
                  id={"user"}
                  onChange={onChangePrivate}
                  // onChange={(e) => onChangePrivate(e)}
                  value={"private"}
                  checked={selectPrivate === "checked"}
                />
                <span/>
              </div>
              <div className={styles.textBox}>
                <span className={styles.title}>Deactivate Asker</span>
                <span className={styles.text}>Take this Asker offline</span>
              </div>
            </div>
          </div>
        </div>
        {isActiveAsker !== null && <TriangleSearchSm className={`card card--front ${(type === 'edit' || type === 'menu-share' || type === 'edit-share') ? 'card--front--flip' : ''} ${styles.rotateT} ${!isActiveAsker ? styles.leftT : ''}`}/>}
        {/*<ArrowDown className={styles.rotateT}/>*/}
      </>
    )
  }
;

export default OptionContent;
