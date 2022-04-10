import React, {useEffect, useRef, useState} from 'react';
import styles from './SelectPickerPhone.module.scss';
import * as cn from "classnames";


const SelectPickerPhone = ({onChange, data, placeholder, defaultValue, inputRegister}) => {
  const [searchCodeShown, setSearchCodeShown] = useState(false);
  const searchFieldRef = useRef();
  const isSearching = useRef(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentCountryCode, setCurrentCountryCode] = useState(defaultValue);

  const [optionsList, setOptionsList] = useState(data);

  const checkWindowClick = (e) => {
    if (searchFieldRef.current &&
      searchCodeShown &&
      !e.composedPath().includes(searchFieldRef.current)) {
      setSearchCodeShown(false);
    }
  }

  const OnChange = e => {
    isSearching.current = e.target.value.length > 0;
    const regex = new RegExp(e.target.value || '.+', 'i');
    setOptionsList(prevState => {
      return data.map(el => {
        if (el.countryName) {
          const candidate = el.countryName.match(regex);
          if (candidate && candidate[0] !== '') {
            return {countryName: candidate.input, phonecode: el.phonecode};
          }
        }
      }).filter(el => el != null)
    })
  }

  useEffect(() => {
    document.addEventListener('click', checkWindowClick)
    return () => document.removeEventListener('click', checkWindowClick)
  }, [])

  return (
    <div className={styles.selectPickerWrapper}>
      <div className={styles.pickerWrapper}>
        <div className={styles.countryCodeField} onClick={() => setSearchCodeShown(prevState => !prevState)}>
          <div className={styles.iconWrapper} style={{backgroundImage: `url(${selectedItem.unicode || "https://flagcdn.com/us.svg"})`}}/>
          <span>{currentCountryCode}</span>
        </div>
        <input type="number" className={styles.phoneNumberField} placeholder={"Mobile Number"} {...inputRegister}/>
      </div>
      <div ref={searchFieldRef} className={cn(styles.searchWrapper, {[styles.searchWrapper_active]: searchCodeShown})}>
        <div className={styles.searchFieldWrapper}>
          <input className={styles.searchField} type="text" placeholder={"Search"} onChange={OnChange}/>
        </div>
        <div className={styles.countryCodeList}>
          {optionsList?.length > 0 ? optionsList?.map((el, index) => {
            return <span onClick={() => {
              setSelectedItem(el);
              setSearchCodeShown(false);
              setCurrentCountryCode(el.phonecode);
              onChange(el.phonecode);
            }} className={cn(styles.countryCodeOption, {[styles.countryCodeOption_active]: isSearching.current && index === 0, [styles.countryCodeOption_selected]: el.CountryId === selectedItem.CountryId})} key={index}>
              {el?.countryName + " " + el?.phonecode}
            </span>
          }) : <span className={styles.noResult}>No results found</span>}
        </div>
      </div>
    </div>
  )
}

export default SelectPickerPhone;
