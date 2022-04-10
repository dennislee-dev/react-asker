import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import styles from "./SignUp.module.scss";
import ArrowBack from "../../components/UI/icons/ArrowBack";
import QuestionLogin from "../../components/UI/icons/QuestionLogin";
import LogoWhite from "../../components/UI/icons/LogoWhite";
import Input from "../../components/UI/Input/Input";
import EmailIcon from "../../components/UI/icons/EmailIcon";
import {NavLink} from "react-router-dom";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import LinePhone from "../../components/UI/icons/LinePhone";
import {http} from "../../http/http";

const Verification = ({newUser,...props}) => {
  // console.log('props',props)
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [verifyCode, setVerifyCode] = useState("");
  const [focusInput, setFocusInput] = useState(false);

  const onSubmit = (data) => {
    console.log('onSubmit', data);
    // encodeURIComponent()
  };
  const onSendData = (data) => {
    const form = new FormData();
    form.append('country_code', newUser.country_code);
    form.append('verification_code', verifyCode);
    form.append('user_id', newUser.id);
    form.append('phone', newUser.phone);

    http.post('ApiVerifyOtp', form).then((res) => {
      // console.log(res)
      // console.log('verificationStatusTrue',res.data.status === true)
      if (res.data.status === true) {
        props.nextStep(data)
      }

    });
    console.log('onSendDat', data);
    // props.nextStep(data)
  };

  const prevStep = () => {
    document.activeElement.blur();
    props.onStepChange();
  };

  console.log('hhh', focusInput,  verifyCode.length > 0, verifyCode.length);
  return (
    <>
      <div className={`fade-in ${styles.content}`}>
        <button type='button' className={styles.arrowBtnWrap} onClick={prevStep}><ArrowBack className={styles.arrowBack}/></button>
        <div className={styles.logoBox}>
          <QuestionLogin className={styles.questionIcon}/>
          <LogoWhite className={styles.logo}/>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSendData)}>
          <div className={styles.title}>Verification</div>
          <div className={styles.text}>We’ve texted you a code to verify your number.</div>
          <div className={styles.inputBox}>
            <div className={`${styles.codeBox}`}>
              <input
                type="text"
                maxLength="4"
                id="OtpVerfication"
                name="verification_code"
                onBlur={(e) => {
                  if(e.target.value.length === 0) {
                    setFocusInput(false)
                  }
                  console.log('blue', e.target.value);
                }}
                onFocus={(e) => {
                    setFocusInput(true)
                }}
                onChange={(e) => {
                    setVerifyCode(e.target.value)
                  // if (e.target.value.length === 4) {
                  // }
                  console.log('setVerifyCode', e.target.value, verifyCode, e.target.value.length);
                }}
              />
              <div className={`otp-bg ${styles.codeItems}`}>
                {/*<span className={(focusInput && verifyCode.length === 0) || (!focusInput && verifyCode.length === 0) ? '' :  styles.opacity}/>*/}
                <span className={focusInput || (!focusInput && verifyCode.length > 0) ? '' :  styles.opacity}>{verifyCode[0]}</span>
                <span className={(focusInput && verifyCode.length >= 1) || (!focusInput && verifyCode.length > 1) ? '' :  styles.opacity}>{verifyCode[1]}</span>
                <span className={(focusInput && verifyCode.length >= 2) || (!focusInput && verifyCode.length > 2) ? '' :  styles.opacity}>{verifyCode[2]}</span>
                <span className={(focusInput && verifyCode.length >= 3) || (!focusInput && verifyCode.length > 3) ? '' :  styles.opacity}>{verifyCode[3]}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.text} ${styles.paddingTop}`}>Already have an account?</div>
          <NavLink to={'/log-in'} className={`${styles.title} ${styles.greenText}`}>SIGN IN</NavLink>
          <div className={`${styles.buttonBox}`}>
            <button type="button" className={`continue-btn`} onClick={onSendData}>
              <span>Continue</span>
              <ArrowBtn className={styles.arrowBtn}/>
            </button>
            <LinePhone className={styles.linePhone}/>
          </div>
        </form>
      </div>
    </>
  )
};

export default Verification;
