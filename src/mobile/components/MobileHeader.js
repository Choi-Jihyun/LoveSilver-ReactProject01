import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import styles from './css/header.module.css'
import useMenus from '../../hooks/useMenus'
import gsap from 'gsap'
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { useAuthContext } from '../../context/AuthContext'
import { login, logout } from '../../api/firebase'
import { FaRegUserCircle, FaAngleDown } from "react-icons/fa";


export default function MobileHeader() {

  const [allMenus] = useMenus();
  const [selectMenu, setSelectMenu] = useState('');
  const [clickIndex, setClickIndex] = useState(null)

  const headerRef = useRef(null);
  const liRefs = useRef([]);

  const menuIcon = useRef();
  const closeBtn = useRef();
  const menuWrap = useRef();
  const grayLayer = useRef();
  let closeHeight = useMemo(()=>(45), [])
  let openHeight = useMemo(()=>(null), [])
  const {user} = useAuthContext()

  const openMenu = useCallback(() => {
    gsap.set('body, html', {overflow: 'hidden'})
    grayLayer.current.style.display = 'block';
    gsap.to(grayLayer.current, {opacity: 0.8, duration: 0.4})
    menuWrap.current.style.display = 'block';
    gsap.to(menuWrap.current, {right: 0, duration: 0.4})
    gsap.to(closeBtn.current, {delay: 0.3, opacity: 1, left: '-40px', duration: 0.2})
  }, [])

  const closeMenu = useCallback(() => {
    if(clickIndex !== null) {
      setClickIndex(null)
    }
    gsap.to(closeBtn.current, {opacity: 0, left: '0px', duration: 0.1})
    gsap.set('body, html', {overflowY: 'visible'})
    gsap.to(grayLayer.current, {opacity: 0, duration: 0.4})
    gsap.to(menuWrap.current, {right: '-60vw', duration: 0.4, onComplete: ()=>{
      grayLayer.current.style.display = 'none';
      menuWrap.current.style.display = 'none';
    }})
  }, [clickIndex])

  const toggleMenu = (index) => {
    if(clickIndex === index) {
      setClickIndex(null)
    } else {
      setClickIndex(index)
    }
  }


  return (
    <div 
      id={styles.header_wrap} 
      ref={headerRef}
    >
      <header>
          <div id={styles.mobile_menu_wrap}>
            <div className={styles.header_wrap}>
              <div className={styles.header_inner}>
                <h1>
                  <Link to='/' onClick={() => setSelectMenu('')}>
                    <span className='change_text_color'>LoveSilver</span>
                  </Link>
                </h1>
                <div className={styles.mobilemenu_icon_wrap} ref={menuIcon} onClick={openMenu}><BiMenuAltRight className={styles.mobilemenu_icon}/></div>
              </div>
            </div>

            <nav id={styles.mobilemenu} ref={menuWrap}>
              <h2 className="hidden">모바일 메뉴</h2>
              <div id={styles.mobileclose_btn} ref={closeBtn} onClick={closeMenu}><BiX className={styles.close_icon}/></div>
              <div id={styles.mobilemenu_inner}>
                <div className={styles.greet_title}>
                {
                  user ?
                  <p>LoveSilver에 오신 <br/>{user.displayName}님 환영합니다.</p>
                  : 
                  <p>LoveSilver 에 오신<br/>여러분 환영합니다.</p>
                }
                </div>
                <div className={styles.login_button}>
                  {
                    user ? 
                    <div>
                      <p><img src={user.photoURL} style={{width: '30px', height: '30px', borderRadius: '50%'}}/></p>
                      <p 
                        onClick={() => {
                          login();
                          logout();
                          closeMenu();
                        }} 
                        className={styles.login_text} 
                        id={styles.login_out_text}>
                          로그아웃
                      </p>
                    </div>
                    : 
                    <div onClick={login}>
                      <FaRegUserCircle id={styles.logout_icon}/>
                      <p className={styles.login_text} >로그인</p>
                    </div>
                  }
                </div>

                <ul id={styles.mobilemenu_list}>
                  {
                    allMenus.map((item)=>(
                          
                      item.category === '커리큘럼' || item.category === '문의' ?
                        <li
                          key={item.index}
                          ref={(el) => (liRefs.current[item.index] = el)}
                          className={clickIndex === item.index ? styles.selected : ''}
                          onClick={closeMenu}
                          style={
                            item.index === clickIndex ? {height: closeHeight + 10 + (closeHeight*item.detailCategory.length)} : { height: item.index === clickIndex ? closeHeight : openHeight }
                          }
                        >
                          <Link
                            to={item.mobileLink}
                            className={selectMenu === item.category ? styles.selected : ''}
                          >
                            <p className={styles.category}>{item.category}</p>
                          </Link>
                        </li>
                      :
                      <li
                        key={item.index}
                        ref={(el) => (liRefs.current[item.index] = el)}
                        className={clickIndex === item.index ? styles.selected : ''}
                        onClick={()=>{
                          toggleMenu(item.index)
                        }}
                        style={
                          item.index === clickIndex ? {height: closeHeight + 10 + (closeHeight*item.detailCategory.length)} : { height: item.index === clickIndex ? closeHeight : openHeight }
                        }
                      >
                        <p className={styles.category} >{item.category}</p>
                        <span className={styles.mobile_arrow_icon}><FaAngleDown /></span>
                        <ul className={styles.mobilesubmenu_list}>
                          {
                            item.detailCategory.map((detailItem, detailIndex)=>(
                              <Link
                                to={
                                  item.mobileLink === '/mobilevisit'
                                    ? item.mobileLink + '/' + detailIndex
                                    : item.mobileLink === '/mobilegallery'
                                    ? {
                                        pathname: item.mobileLink,
                                        search: `?${createSearchParams({ place: `${detailItem.place}` })}`,
                                      }
                                    : item.mobileLink
                                }
                                onClick={() => {
                                  setSelectMenu(item.category);
                                  closeMenu();
                                }}
                                key={detailIndex}
                              >
                                <li key={detailIndex} className={styles.submenu_li}>
                                  {detailItem.name}
                                </li>
                              
                              </Link>

                            ))
                          }
                        </ul>
                      </li>
                          

                    ))
                  }
                  
                </ul>
              </div>
            </nav>
            <div id={styles.mobile_grayLayer} ref={grayLayer} onClick={closeMenu}></div>

          </div>
        </header>

    </div>
  )
}
