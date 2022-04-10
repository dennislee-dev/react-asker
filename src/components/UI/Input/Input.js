import React, {useEffect, useState} from 'react';
import styles from './Input.module.scss'
import {isTouchEnabled} from "../../../utils/helpers";

const Input = ({
                 register,
                 onClick,
                 placeholder,
                 defaultValue,
                 disabled,
                 errors,
                 type,
                 maxLength,
                 name,
                 onChange,
                 wrapStyle,
                 children,
                 addPadding,
                 inputStyles,
                 ...props
               }) => {
  const [isShow, setIsShow] = useState(false)
  const [isError, setIsError] = useState(false);
  const [inputType, setInputType] = useState('text');
  // console.log('custom', inputStyles, name, defaultValue);

  // console.log('input', name);

  useEffect(() => {
    if (errors && errors[name]) {
      setIsError(true);
    } else {
      setIsError(null);
    }
  }, [errors]);


  useEffect(() => {
    if (type === 'number' && !isTouchEnabled()) {
      setInputType('text');
    } else {
      setInputType(type || 'text');
    }
  }, [type]);


  const handleChange = (event) => {
    console.log(event.target.value);
    if (props.onChange != null) {
      props.onChange(event);
    }

    if (props.name === 'email') {
      event.target.value = event.target.value.trim();
    }

    if (props?.register?.onChange) {
      props?.register.onChange(event);
    }
  }

  useEffect(() => {
    if (type === 'password' && isShow) {
      setInputType('text')
    } else if (type === 'password' && !isShow) {
      setInputType('password')
    }
  }, [type, isShow])

  const changeShow = () => {
    setIsShow(prevState => !prevState);

  }


  const renderError = () => {
    if (errors && errors[name]) {
      switch (errors[name].type) {
        case 'required':
          return errors[name].message || 'Required field';
        case 'maxLength':
          return errors[name].message || 'Max length exceeded';
        case 'minLength':
          return errors[name].message || 'Incorrect amount of characters';
        case 'validate':
          return errors[name].message || 'Invalid format';
        case 'pattern':
          return errors[name].message || 'Invalid format';
        default:
          return null;
      }
    }

    return null;
  }

  return (
    <div className={`${styles.inputWrap} ${addPadding != null ? styles.addPading : ''} `}>
      <div className={`${wrapStyle ? wrapStyle : ''} ${styles.Input}`}>
        <div className={styles.iconBox}>{children}</div>
        <input
          {...props}
          type={inputType}
          onChange={handleChange}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onClick={onClick}
          disabled={disabled}
          {...register}
        />
        {type === 'password' ?
          <button type='button' className={styles.showText} onClick={changeShow}>{!isShow ? 'Show' : "Hide"}</button>
          : null}
      </div>
      {errors[name] != null ? <div className={styles['error-message']}>{renderError()}</div> : null}
    </div>
  )
};

export default Input;
