import styles from './Loader.module.scss';
import {useEffect, useState} from "react";

const Loader = ({className, isActive, setIsActive}) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const begin = setInterval(() => {
      console.log(count);
      setCount(prevState => {
        if (prevState === 0) {
          setIsActive(false);
        }
        return prevState - 1;
      });
    }, 1000)

    return () => {clearInterval(begin);}
  }, [])

  return (
    <div className={`${styles.loader} ${className} `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>{count}</span>
    </div>
  )
}

export default Loader;
