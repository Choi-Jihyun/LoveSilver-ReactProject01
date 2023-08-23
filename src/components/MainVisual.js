import React, { useEffect, useRef } from 'react'
import styles from './css/mainvisual.module.css'
import { Link } from 'react-router-dom';
import { TfiAngleRight, TfiAngleDown } from "react-icons/tfi";
import gsap from 'gsap';


export default function MainVisual() {

  function scrollDownAni() {
    gsap.to(angleDownWrapRef.current, {top: "1rem", duration: 0.2, delay: 1, onComplete: ()=>{
      gsap.to(angleDownWrapRef.current, {top: "0.3rem", duration: 0.3, onComplete: ()=>{
        gsap.to(angleDownWrapRef.current, {top: "1rem", duration: 0.2,onComplete: ()=>{
          gsap.to(angleDownWrapRef.current, {top: "0.3rem", duration: 0.3})
        }})
      }})
    }})
  }
  useEffect(()=>{
    let intervalAni;

    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        clearInterval(intervalAni); // 스크롤이 100vh를 넘으면 interval 제거
      }
    };
    
    intervalAni = setInterval(() => {
      scrollDownAni();
    }, 2200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalAni);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const angleDownWrapRef = useRef()
  return (
    <div id={styles.main_visual_wrap}>
      <section id={styles.main_visual}>
        <h2 className='hidden'>메인비주얼</h2>
        <div id={styles.visual_wrap}>
          <div id={styles.img}></div>
          <div id={styles.visual_contents}>
            <div id={styles.texts}>
              <p id={styles.title}>LoveSilver<br/>care center</p>
              <p id={styles.subtitle}>사랑실버 주간센터에 오신 것을 환영합니다.</p>
            </div>
            <div id={styles.visit_button}>
              <Link to='/visit/0'>
                <p className={styles.plus_text}>visit</p>
                <TfiAngleRight className={styles.angle_right}/>
              </Link>
            </div>
            <div id={styles.scroll_instruction}>
              <p className={styles.plus_text}>scroll</p>
              <div className={styles.scoll_icon_wrap} ref={angleDownWrapRef}>
                <TfiAngleDown className={styles.angle_down}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

