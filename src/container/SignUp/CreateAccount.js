import React, {useEffect, useRef, useState} from 'react';
import styles from "./SignUp.module.scss";
import ArrowBack from "../../components/UI/icons/ArrowBack";
import QuestionLogin from "../../components/UI/icons/QuestionLogin";
import LogoWhite from "../../components/UI/icons/LogoWhite";
import Input from "../../components/UI/Input/Input";
import {NavLink, useNavigate} from "react-router-dom";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import LinePhone from "../../components/UI/icons/LinePhone";
import {useForm} from "react-hook-form";
import MenIcon from "../../components/UI/icons/MenIcon";
import {http} from '../../http/http'
import SelectPickerPhone from "../../components/UI/SelectPickerPhone/SelectPickerPhone";


const CreateAccount = ({setNewUser,...props}) => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();

  const [countryData, setCountryData] = useState();
  const countryCodeRef = useRef('+1');


  const onSendData = (data) => {
    const form = new FormData();
    form.append('name', data.name);
    form.append('phone', data.phone);
    form.append('country_code', countryCodeRef.current);

    http.post('APIsendsms', form).then(async (res) => {
        const {user} = res.data;
      //засетить нового юзера.
        await setNewUser(user)
        props.nextStep(data)


    });
  };

  const OnChangeSelectValue = (countryCode) => {
    countryCodeRef.current = countryCode;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user === "Logout" || user === null) {
    } else {
      navigate('/');
    }

    http.post('country')
      .then((res) => res.data)
      .then((res) => {
        if (res.status === true) {
          setCountryData(res?.country);
        }
      }).catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <>
      <div className={`fade-in ${styles.content}`}>
        <button type='button' className={styles.arrowBtnWrap}><ArrowBack className={styles.arrowBack}/></button>
        <div className={styles.logoBox}>
          <QuestionLogin className={styles.questionIcon}/>
          <LogoWhite className={styles.logo}/>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSendData)}>
          <div className={styles.title}>Create Account</div>
          <div className={styles.text}>Enter your name & mobile number</div>
          <div className={styles.inputBox}>
            <Input
              name='name'
              type='text'
              defaultValue={null}
              placeholder='Full name'
              errors={errors}
              addPadding={true}
              register={register("name",)}
            ><MenIcon className={styles.menIcon}/>
            </Input>

            {
              countryData &&
              <SelectPickerPhone
                onChange={OnChangeSelectValue}
                placeholder={'placeholder'}
                inputRegister={register("phone", {required: true})}
                data={countryData}
                defaultValue={'+1'}/>
            }

          </div>
          <div className={`${styles.text} ${styles.paddingTop}`}>Already have an account?</div>
          <NavLink to={'/log-in'} className={`${styles.title} ${styles.greenText}`}>SIGN IN</NavLink>
          <div className={`${styles.buttonBox}`}>
            <button type="submit" className={`continue-btn`}>
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

export default CreateAccount;
