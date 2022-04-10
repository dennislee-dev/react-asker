import React, {useState} from 'react';
import HomeStart from "./HomeStart";
import HomeCreateQuestion from "./HomeCreateQuestion";

const Home = (props) => {
  const [LoginStatus, setLoginStatus] = useState(false);

  return (
    <>
      {LoginStatus ? <HomeCreateQuestion/> : <HomeStart/>}
    </>
  )
};

export default Home;
