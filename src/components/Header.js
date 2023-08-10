import React, { useEffect, useRef, useState } from 'react';
import styles from './css/header.module.css';
import { Link, createSearchParams, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import useMenus from '../hooks/useMenus';
import { FaLongArrowAltRight } from "react-icons/fa";


export default function Header() {
  
  
  const [allMenus] = useMenus();
  const [selectMenu, setSelectMenu] = useState('');
  const [hoverMenu, setHoverMenu] = useState('');
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [category, setCategory] = useState(null);
  const { search } = useLocation();

  const headerRef = useRef(null);
  const submenuWrapRef = useRef([]);
  const liRefs = useRef([]);

  const handleMouseEnter = (index) => {
    setHoverMenu(allMenus[index].category);
    gsap.to(headerRef.current, { height: '21.4rem', duration: 0.3, background: 'white', borderBottom: 'solid 1px #ccc', boxShadow: '0px 0px 10px 0px #ccc' });
    gsap.to( '.change_text_color', { color: 'black', duration: 0.3 });
    gsap.to(submenuWrapRef.current, { opacity: 1, marginTop: 80, duration: 0.15});
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setHoverMenu('');
    gsap.to(headerRef.current, { height: '80px', duration: 0.3, background: 'transparent', borderBottom: 'none', boxShadow: 'none'  });
    gsap.to('.change_text_color', { color: 'white', duration: 0.3 });
    gsap.to(submenuWrapRef.current, { opacity: 0, marginTop: 0, duration: 0.3})
    setIsMouseEntered(false);
  };

  const handleWheel = (event) => {
      if (event.deltaY > 0) {
        // 휠 내릴 때
        gsap.to(headerRef.current, { top: -80, background: 'transparent', duration: 0.3, ease: 'power3.out' });
        gsap.to('.change_text_color', { color: 'white', duration: 0.3 });
      } else {
        // 휠 올릴 때
        if (window.scrollY <= window.innerHeight * 0.2) {
          gsap.to(headerRef.current, { top: 0, background: 'transparent', duration: 0.3, ease: 'power3.out' });
          gsap.to('.change_text_color', { color: 'white', duration: 0.3 });
        } else {
          gsap.to(headerRef.current, { top: 0, background: 'white', duration: 0.3, ease: 'power3.out' });
          gsap.to( '.change_text_color', { color: 'black', duration: 0.3 });
        }
      }
  };

  useEffect(() => {
    if (isMouseEntered === false) {
      window.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (isMouseEntered === false) {
        window.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isMouseEntered]);



  return (
    <div 
      id={styles.header_wrap} 
      onMouseLeave={handleMouseLeave} 
      ref={headerRef}
    >
  
        <header>
          <div id={styles.mainmenu_wrap}>
            <h1>
              <Link to='/' onClick={() => setSelectMenu('')}>
                <span className='change_text_color'>LoveSilver</span>
              </Link>
            </h1>
            <nav id={styles.mainmenu}>
              <h2 className="hidden">메인메뉴</h2>
              <ul id={styles.mainmenu_list}>
                {
                  allMenus.map((item)=>(
                    <li
                      key={item.index}
                      onMouseEnter={() => handleMouseEnter(item.index)}
                      ref={(el) => (liRefs.current[item.index] = el)}
                      className={hoverMenu === item.category ? styles.selected : ''}
                    >
                      <Link
                        to={item.link !== '/visit' ? item.link : item.link + '/0'}
                        className={selectMenu === item.category ? styles.selected : ''}
                        onClick={()=>{
                          setSelectMenu(item.category)
                        }}
                      >
                        <span className='change_text_color'>{item.category}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
  
            {
            allMenus.map((item)=>(
              <div
                className={`${styles.submenu_wrap} ${hoverMenu === item.category ? styles.selected : ''}`}
                key={item.index}
                ref={(el) => (submenuWrapRef.current[item.index] = el)}
              >
                <div className={styles.submenu_list_withus_wrap}>
                  <div className={styles.submenu_list_wrap}>
                    <p className={styles.submenu_explain_el}>{item.explainTitle}</p>
                    <div className={styles.places_wrap}>
                      {
                        item.detailCategory.map((detailItem, index)=>(
                          <div key={item.index}>
                            {/* <Link
                              to={item.link !== '/visit' ? item.link : item.link + '/' + index}
                              onClick={()=>{
                                setSelectMenu(item.category)
                                // placeCategory = detailItem.place;
                              }}
                            > */}
                            <Link
                              to={
                                item.link === '/visit'
                                  ? item.link + '/' + index
                                  : item.link === '/gallery'
                                  ? {
                                      pathname: item.link,
                                      search: `?${createSearchParams({ place: `${detailItem.place}` })}`,
                                    }
                                  : item.link
                              }
                              onClick={()=>{
                                setSelectMenu(item.category)
                              }}
                            >
                              <p className={styles.places} key={index}>
                                {detailItem.name}
                              </p>
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className={styles.with_us_wrap}>
                    <Link to='/inquire'>
                      <p className={styles.with_us}>LoveSilver 함께하기</p>
                    </Link>
                  </div>
                </div>
                <div className={styles.submenu_img_wrap}>
                  {
                    item.detailCategory.slice(0, 2).map((detailItem, detailIndex)=>(
                      <div className={styles.submenu_img_content} key={item.index}>
                        <Link 
                          to={
                            item.link === '/visit' ? item.link + '/' + detailIndex
                              : item.link === '/gallery' ?
                                {
                                  pathname: item.link,
                                  search: `?${createSearchParams({ place: `${detailItem.place}` })}`,
                                }
                              : item.link
                          } 
                          onClick={()=>{
                            setSelectMenu(item.category)
                          }}
                        >
                          <img src={detailItem.img} alt='이미지' />
                          <div class={styles.place_text_wrap}>
                            <p className={styles.place_name}>{detailItem.name}</p>
                            <p className={styles.visit_button}>
                              <p className={styles.visit_text}>
                                  {item.explainTitle}
                              </p>
                              <FaLongArrowAltRight className={styles.arrow_right_icon}/>
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
  
          </div>
        </header>
    </div>
  )
}
