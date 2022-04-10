import React, {useState} from 'react';
import styles from "../Login/Login.module.scss";
import ArrowBack from "../../components/UI/icons/ArrowBack";
import QuestionLogin from "../../components/UI/icons/QuestionLogin";
import LogoWhite from "../../components/UI/icons/LogoWhite";
import Input from "../../components/UI/Input/Input";
import {regexEmail} from "../../utils/helpers";
import EmailIcon from "../../components/UI/icons/EmailIcon";
import LockIcon from "../../components/UI/icons/LockIcon";
import {NavLink, useNavigate} from "react-router-dom";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import LinePhone from "../../components/UI/icons/LinePhone";
import {useForm} from "react-hook-form";
import {http} from "../../http/http";

const CreatePassword = (props) => {
  console.log('createPassword',props)
  let navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [verifyCode, setVerifyCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [focusInput, setFocusInput] = useState(false);



  const onSubmit = (data) => {
    console.log('onSubmit', data);
    // encodeURIComponent()
  };
  const onSendData = (data) => {
    const form = new FormData();
    form.append('email',data.email);
    form.append('password',data.password);
    form.append('user_id', props.newUser.id);
    // form.append('phone', newUser.phone);

    http.post('registerEmail', form).then((res) => {
      // console.log(res)
      // console.log('loginEmailStatus',res.data.status === true)
      if (res.data.status === true) {
       navigate('/log-in')
      }

    });
    // props.nextStep(data)
  };

  const prevStep = () => {
    document.activeElement.blur();
    props.onStepChange();
  };


  return (
    <div className={`fade-in ${styles.content}`}>
      <button type='button' className={styles.arrowBtnWrap} onClick={prevStep}><ArrowBack className={styles.arrowBack}/></button>
      <div className={styles.logoBox}>
        <QuestionLogin className={styles.questionIcon}/>
        <LogoWhite className={styles.logo}/>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSendData)} role={'form'} >
        <div className={styles.title}>Create Password</div>
        <div className={styles.text}>Password must be at least 8 characters.</div>
        <div className={styles.inputBox}>
          <Input
            name='email'
            // onChange={(e)=>{
            //   setUserEmail(e.target.value)
            //   // console.log('passwordSend',userEmail)
            // }}
            type='email'
            errors={errors}
            placeholder='Email'

            register={register("email", {required: true, maxLength: 128, pattern: regexEmail})}
            addPadding={true}
          ><EmailIcon className={styles.emailIcon}/></Input>
          <Input
            name='password'
            // onChange={(e)=>{
            //   setUserPassword(e.target.value)
            //   // console.log('passwordSend',userPassword)
            // }}
            type='password'
            errors={errors}
            register={register("password", {required: true,minLength: {
                value: 5,
                message: "min length is 5"
              }})}
            placeholder='Password'
          ><LockIcon className={styles.lockIcon}/></Input>
        </div>
        <div className={`${styles.text} ${styles.paddingTop}`}>Already have an account?</div>
        <NavLink to={'/log-in'} className={`${styles.title} ${styles.greenText}`}>SIGN IN</NavLink>
        <div className={`${styles.buttonBox}`}>
          <button type="submit" className={`continue-btn`}
                  // onClick={onSendData}
          >
            <span>Continue</span>
            <ArrowBtn className={styles.arrowBtn}/>
          </button>
          <LinePhone className={styles.linePhone}/>
        </div>
      </form>
    </div>
  )
  };

export default CreatePassword;
