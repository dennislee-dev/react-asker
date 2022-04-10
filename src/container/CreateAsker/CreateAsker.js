import React, {useEffect, useRef, useState} from 'react';
import styles from './CreateAsker.module.scss'
import {useNavigate} from "react-router-dom";
import CreateAskerTwo from "./CreateAskerTwo";
import CreateAskerOne from "./CreateAskerOne";
import CreateAskerThird from "../../components/UI/icons/Create/CreateAskerThird";

const CreateAsker = (props) => {
  const [step, setStep] = useState('oneStep');
  const [path, setPath] = useState(['oneStep', 'twoStep', 'thirdStep']);
  const [currentAsker,setCurrentAsker]=useState({});
  const [activeAskerId,setActiveAskerId]=useState('');

    const elRef = useRef();
    let navigate = useNavigate();

    const handleContinue = () => {
      // request axios

    };

    // const removeEffect = () => {
    //   elRef.current?.classList.add("ease-out-effect")
    //   const timer = setTimeout(() => {
    //     handleContinue();
    //   }, 1200);
    //   return timer;
    // };

  const nextStep = () => {
    // console.log('nextStepLOG');
    const currentStep = path.indexOf(step);
    setStep(path[(currentStep != null && path[currentStep + 1] != null) ? (currentStep + 1) : currentStep]);
  }

  const prevStep = () => {
    const currentStep = path.indexOf(step);
    if (currentStep != null && path[currentStep - 1] != null) {
      setStep(path[currentStep - 1])
    } else {
      setStep(path[currentStep]);
    }
  };


  const renderCreateAsker = () => {
    switch (step) {
      case 'oneStep':
        return <CreateAskerOne setCurrentAsker={setCurrentAsker} setActiveAskerId={setActiveAskerId} nextStep={nextStep}/>;
      case 'twoStep':
        return <CreateAskerTwo activeAskerId={activeAskerId} currentAsker={currentAsker}  nextStep={nextStep} onStepChange={prevStep}/>;
      case 'thirdStep':
        return <CreateAskerThird activeAskerId={activeAskerId} currentAsker={currentAsker} nextStep={nextStep} onStepChange={prevStep}/>;

      default:
        return null
      // return <Loader className={styles.loading}/>;
    }
  }


  return (
    <div className={styles.createContainerWrap}>
      {
        renderCreateAsker()
      }

    </div>
    )
  }
;

export default CreateAsker;
