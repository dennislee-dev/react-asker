import React, {useEffect, useRef} from 'react';
import styles from './Login.module.scss';
import QuestionLogin from "../../components/UI/icons/QuestionLogin";
import LogoWhite from "../../components/UI/icons/LogoWhite";
import ArrowBack from "../../components/UI/icons/ArrowBack";
import {useForm} from "react-hook-form";
import Input from "../../components/UI/Input/Input";
import EmailIcon from "../../components/UI/icons/EmailIcon";
import LockIcon from "../../components/UI/icons/LockIcon";
import {NavLink, useNavigate} from "react-router-dom";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import LinePhone from "../../components/UI/icons/LinePhone";
import {regexEmail} from "../../utils/helpers";
import {http} from "../../http/http";
import HomeStart from "../Home/HomeStart";

const Login = (props) => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const onSubmit = (data) => {
    const form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);

    http.post("loginEmail", form)
      .then((resp) => resp.data)
      .then((respJson) => {
        localStorage.setItem("UserProfile", respJson.status);
        console.log("login details", respJson);
        if (respJson.status === true) {
          localStorage.setItem("UserID", respJson.user.id);
          localStorage.setItem("User", JSON.stringify(respJson.user));
          // dispatch(setUserProfile(respJson));
          // navigate('/dashboard');
          cardRef?.current?.classList.add("start-rotate")
          setTimeout(() => {
            navigate('/dashboard', {state:{
                from:'login'
              }});
          }, 200)
        } else {
          alert(respJson.message);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <>
      <div className={`container-login`}>
        <div ref={cardRef} className={`contentWrap-login`}>
          <div className={`contentBox-login`}>
            <div className={`fade-in ${styles.content}`}>
              <button type='button' className={styles.arrowBtnWrap}><ArrowBack className={styles.arrowBack}/></button>
              <div className={styles.logoBox}>
                <QuestionLogin className={styles.questionIcon}/>
                <LogoWhite className={styles.logo}/>
              </div>
              <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit, (err) => {console.log('error', err);})}>
                <div className={styles.title}>Log in</div>
                <div className={styles.text}>Enter your login details.</div>
                <div className={styles.inputBox}>
                  <Input
                    name='email'
                    type='email'
                    errors={errors}
                    placeholder='Email'
                    register={register("email", {required: true, maxLength: 255, pattern: regexEmail})}
                    addPadding={true}
                  ><EmailIcon className={styles.emailIcon}/></Input>
                  <Input
                    name='password'
                    type='password'
                    errors={errors}
                    placeholder='Password'
                    register={register("password", {required: true, maxLength: 255})}
                  ><LockIcon className={styles.lockIcon}/></Input>
                </div>
                <NavLink to={'/'} className={`${styles.text} ${styles.paddingTop}`}>No account?</NavLink>
                <NavLink to={'/sign-up'} className={`${styles.title} ${styles.greenText}`}>JOIN ASKER</NavLink>
                <div className={`${styles.buttonBox}`}>
                  <button type="submit" className={`continue-btn`}>
                    <span>Continue</span>
                    <ArrowBtn className={styles.arrowBtn}/>
                  </button>
                  <LinePhone className={styles.linePhone}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
};

export default Login;
