import React, {useEffect, useRef, useState} from 'react';
import styles from "./ShareAsker.module.scss";
import {useLocation, useNavigate} from "react-router-dom";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import ShareIcon from "../../components/UI/icons/ShareIcon";
import ContactLink from "../../components/UI/icons/Contact/ContactLink";
import LetterIcon from "../../components/UI/icons/LetterIcon";
import CloseIcon from "../../components/UI/icons/CloseIcon";
import {Modal} from "react-bootstrap";
import EmailIcon from "../../components/UI/icons/EmailIcon";
import {http} from "../../http/http";
import copy from "copy-html-to-clipboard";
// import {ReactComponent as ArrowDown}  from '../../image/svg/arow-down.svg';
import {useForm} from "react-hook-form";
import ArrowDown from "../../components/UI/icons/ArrowDown";
import TriangleSearchSm from "../../components/UI/icons/TriangleSearchSm";

const ShareAsker = ({closeOption, isLeft, setType, type, askerCode, createType ,  ...props}) => {
  // console.log(askerCode)
  console.log(isLeft);
  const [show, setShow] = useState(false);
  const [typeShare, setTypeShare] = useState('share');
  const location = useLocation();
  const [sharedAskerId, setSharedAskerId] = useState();
  const [locationShare, setLocationShare] = useState();
  let navigate = useNavigate();
  const cardRef = useRef(null);
  const [EmailID, setEmailID] = useState("");
  const {register, handleSubmit, formState: {errors}} = useForm();



  useEffect(() => {
    if (createType === 'create') {
      setTypeShare(createType)
    } else {
      setTypeShare('share')
    }
  }, [createType])

  useEffect(() => {
    if (location.state.sharedAskerId != null) {
      setSharedAskerId(location.state.sharedAskerId)
    } else if (askerCode) {
      setSharedAskerId(askerCode)
    }
  }, [location.state.sharedAskerId, askerCode])

  useEffect(() => {
    if (location != null) {
      setLocationShare(location.state)
    } else if (props.location) {
      setLocationShare(props.location)
    }
  }, [location, props.location])

  useEffect(async () => {
    if (cardRef?.current?.classList.contains("start-rotate")) {
      cardRef?.current?.classList.remove("start-rotate")
    }

    const timer = setTimeout(() => {
      cardRef?.current?.classList.add("start-rotate")
    }, 1);

    return () => clearTimeout(timer);
  }, [props]);

  const handleClose = () => {
    setShow(false);
  };

  const changeType = (e, type) => {
    e.preventDefault();
    setType(type)
  }

  const handleShow = () => {
    setShow(true);
  };
  const sendEmail = async () => {
    http.post('share-asker-send-mail-api', `email=${EmailID}&asker_code=${sharedAskerId || askerCode}`)
      .then(resp => resp.data)
      .then((res) => {
        console.log('setShow', res);
        setShow(false);
        // if (res.status === true) {
        //   setViewAsker(res.data);
        // }
      })
      .catch((err) => {
        setShow(false);
        console.log(err);
      })
  };

  const onCopy = (e, type) => {
    e.preventDefault();
    if (type === 'email') {
      copy(`<span>${`askerapp.com/${sharedAskerId || askerCode}`}</span>`, {
        asHtml: true,
      });
    } else if (type === 'code') {
      copy(`<span>${sharedAskerId || askerCode}</span>`, {
        asHtml: true,
      });
    }
  };

  const closeBox = (e) => {
    if (typeShare === 'share') {
      navigate('/dashboard')
    } else if (typeShare === 'create') {
      closeOption(e)
    }
  }

  const shareBox = () => {
    return (
      <>
        <button className={styles.btnClose} onClick={(e) => closeBox(e)}>
          <CloseIcon className={styles.closeIcon}/>
        </button>
        <div className={styles.cardContainer}>
          <div className={styles.logoBox}>
            <LetterIcon className={styles.letterIcon}/>
          </div>
          <div className={styles.titleBox}>
            <ShareIcon className={styles.shareLink}/>
            Share Asker
          </div>
          <div className={styles.text}>Invite people to answer using this Asker’s unique access code or via direct link:</div>

          <div className={styles.inputBox}>
            <div className={`${styles.inputBlock} `}>
              <div className={styles.textBox}>
                <input name={'name'} readOnly="readonly" defaultValue={sharedAskerId}/>
              </div>
              <button type='button' className={styles.linkIconWrap} onClick={(e) => onCopy(e, 'code')}>
                <ContactLink className={styles.linkIcon}/>
              </button>
            </div>
            <div className={`${styles.inputBlock} `}>
              <div className={styles.textBox}>
                <input name={'name'} readOnly="readonly" placeholder={`askerapp.com/${sharedAskerId}`}/>
              </div>
              <button type='button' className={styles.linkIconWrap} onClick={(e) => onCopy(e, 'email')}>
                <ContactLink className={styles.linkIcon}/>
              </button>
            </div>
          </div>
          <div className={`button-box ${styles.buttonBox}`}>
            <button type="button" className={`continue-btn  ${styles.buttonStylePublich}`} onClick={handleShow}>
              <span>SHARE NOW</span>
              <div className={styles.plusIconBox}>
                <ShareIcon className={`${styles.shareIcon}`}/>
              </div>
            </button>
          </div>
        </div>
      </>
    )
  }

  const modalBlock = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="share-email-modal"
      >
        <Modal.Body>
          <div id="shareAskerModal" className={`share-email-modal ${styles.shareEmailModal}`}>
            <a href="#" className="shareAskerModalClose"/>
            <div className="center-box theme-bg">
              <div className="center-box-inner">
                <div className="log-reg-form">
                  {/*<form method="POST" action="{{route('asker.send_mail')}}" >*/}
                  <form method="POST" onSubmit={handleSubmit(sendEmail)} role={'form'}>
                    {/* @csrf */}
                    <div className="head">
                      <h4>Share Code</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </p>
                    </div>
                    <div className="cust-form-row">
                      <div className="cust-form-col">
                        <div className={`text-filled-modal with-icon ${styles.inputBlock}`}>
                          <input
                            type="hidden"
                            // value="{{$asker}}"
                            name="asker_code"
                          />

                          <div className="icon">
                            <EmailIcon className={styles.emailIcon}/>
                          </div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmailID(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="cust-form-row" >
                    {/*<div className="cust-form-row" onClick={() => sendEmail()}>*/}
                      <div className="cust-form-col">

                        <div className={`submit-filled with-icon button-box ${styles.buttonBox}`}>
                          <input
                            type="submit"
                            // type="button"
                            value="SHARE"
                            className={`continue-btn shareAskerModalClose ${styles.buttonStylePublich}`}
                            // onClick={() => sendEmail()}
                          />
                          <div className="icon">
                            <div className={styles.shareIconBox}>
                              <ArrowBtn className={`${styles.shareIcon}`}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  const renderContent = () => {
    if (typeShare === 'share') {
      return (
        <>
          <div className={styles.mainContainer}>
            <div className={`${styles.contentContainer}`}>
              <div className={`${styles.cardWrap} ${styles.cardLeft}`}>
                <div className={`${styles.cardBg} ${styles.cardBgSide}`}>
                  <div className={styles.cardContainer}>
                  </div>
                </div>
              </div>
              <div ref={cardRef} className={`default-flip flip-card-inner ${styles.cardWrap}`}>
                <div className={`${styles.cardBg}`}>
                  {shareBox()}
                </div>
                {/*<div className={styles.rotate}>*/}
                  <TriangleSearchSm className={`${styles.rotateT}`}/>
                  {/*<div className="triangle-violet"/>*/}
                {/*</div>*/}
              </div>
              <div className={`${styles.cardWrap} ${styles.cardRight}`}>
                <div className={`${styles.cardBg} ${styles.cardBgSide}`}>
                  <div className={styles.cardContainer}>
                  </div>
                </div>
              </div>
            </div>

            {modalBlock()}

          </div>
        </>
      )
    } else if (typeShare === 'create') {
      return (
        <>
          <div ref={cardRef} className={`card ${isLeft ? 'card--back' : 'card--backLeft'} ${(type === 'edit-share') ? styles.activeShare : ''} ${type==='menu-share' ? styles.menuEditShare : ''}  ${styles.cardBg}  ${location?.pathname === '/view-asker' ? styles.withAbsoluteAndTop : ''} ${styles.cardWrap}`}>
            <div className={`${styles.cardBg}`}>
              {shareBox()}
            </div>
            <TriangleSearchSm className={`${styles.rotateT}`}/>
              {/*<ArrowDown className={styles.rotateT}/>*/}
          </div>

          {modalBlock()}
        </>
      )
    }
  }

  return (
    <>
      {renderContent()}
    </>
  )
};

export default ShareAsker;
