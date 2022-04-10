import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import CreateAccount from "./CreateAccount";
import Verification from "./Verification";
import CreatePassword from "./CreatePassword";

const SignUp = (props) => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [step, setStep] = useState('createAccount');
  const [path, setPath] = useState(['createAccount', 'verification', 'password']);
  const [registration, setRegistration] = useState({});
  const [newUser,setNewUser] = useState('')
  // console.log('newUser',newUser)

  const onSubmit = (data) => {
    console.log('onSubmit', data);
  };

  const nextStep = () => {
    console.log('nextStepLOG');
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

  const renderRegistrationStep = () => {
    switch (step) {
      case 'createAccount':
        return <CreateAccount setNewUser={setNewUser} nextStep={nextStep}/>;
      case 'verification':
        return <Verification  newUser={newUser} nextStep={nextStep} onStepChange={prevStep}/>;
      case 'password':
        return <CreatePassword newUser={newUser} nextStep={nextStep} onStepChange={prevStep}/>;

      default:
        return null
      // return <Loader className={styles.loading}/>;
    }
  }

  return (
    <div className={`container-login`}>
      <div className={`contentWrap-login`}>
        <div className={`contentBox-login`}>
            {renderRegistrationStep()}
        </div>
      </div>
    </div>
  )

  };

export default SignUp;
