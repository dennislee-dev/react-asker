import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import OptionContent from "./OptionContent";
import EditAsker from "../EditAsker/EditAsker";
import ShareAsker from "../ShareAsker/ShareAsker";
import styles from './AskerOption.module.scss'

const AskerOption = ({onChange, isActiveAsker, location, viewAsker, ...props}) => {
    const [selectPrivate, setSelectPrivate] = useState("");
    // console.log('helloWorld',viewAsker)
    const [type, setType] = useState("");
    const [isLeft, setIsLeft] = useState("");
    // const location = useLocation();
    const [askerCode, setAskerCode] = useState()


    // console.log('option',viewAsker)

    useEffect(() => {
      if (type === 'edit') {

      }
    }, [])

    const closeOption = (e) => {
      // console.log('onChange',);
      e.preventDefault();
      onChange('front');
      setType('')

    }

    const renderContent = () => {
    //   if (type === 'option') {
    //     return <OptionContent closeOption={closeOption}
    //                           selectPrivate={selectPrivate}
    //                           location={location}
    //                           setSelectPrivate={setSelectPrivate}
    //                           setType={setType}
    //                           setAskerCode={setAskerCode}
    //                           viewAsker={viewAsker}
    //     />
    //   } else if (type === 'edit') {
        return <>
            <OptionContent
            closeOption={closeOption}
            selectPrivate={selectPrivate}
            location={location}
            setSelectPrivate={setSelectPrivate}
            setType={setType}
            type={type}
            setAskerCode={setAskerCode}
            viewAsker={viewAsker}
            isActiveAsker={isActiveAsker}
            setIsLeft={setIsLeft}
            isLeft={isLeft}
          />
          <EditAsker isLeft={isLeft} type={type} setIsLeft={setIsLeft} setAskerCode={setAskerCode} setType={setType} location={location}/>
          <ShareAsker isLeft={isLeft} type={type} setIsLeft={setIsLeft} askerCode={askerCode} setType={setType} closeOption={closeOption} createType='create' location={location}/>
        </>
      // } else if (type === 'share') {
      //   return <ShareAsker askerCode={askerCode} setType={setType} closeOption={closeOption} createType='create' location={location}/>
      // }
    }


    return (
      <div className={styles.optionalContainer}>
        {renderContent()}
      </div>
    )
  }
;

export default AskerOption;
