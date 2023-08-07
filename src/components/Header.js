import React, { useEffect, useRef, useState } from 'react';
import styles from './css/header.module.css';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import usePlaces from '../hooks/usePlaces';
import useMenus from '../hooks/useMenus';
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Header() {

  const [allPlaces] = usePlaces();
  const [allMenus] = useMenus();

  const menu = [
    {name: '방문', link: '/visit'},
    {name: '커리큘럼', link: '/curriculum'}, 
    {name: '갤러리', link: '/gallery'}, 
    {name: '문의', link: '/inquire'}
  ];
  const [selectMenu, setSelectMenu] = useState('')
  const [hoverMenu, setHoverMenu] = useState('')

  const handleMouseEnter = (index) => {
    setHoverMenu(allMenus[index].category);
    gsap.to(headerRef.current, { height: '21.4rem', duration: 0.3, background: 'white', borderBottom: 'solid 1px #ccc', boxShadow: '0px 0px 10px 0px #ccc' });
    gsap.to( '.change_text_color', { color: 'black', duration: 0.3 });
  };

  const handleMouseLeave = () => {
    setHoverMenu('');
    gsap.to(headerRef.current, { height: '80px', duration: 0.3, background: 'transparent', borderBottom: 'none', boxShadow: 'none'  });
    gsap.to('.change_text_color', { color: 'white', duration: 0.3 });
  };
  
  const arrowMouseEnter = (menuIndex, detailIndex) => {
    const arrowRef = arrowRightRefs.current[menuIndex][detailIndex];
    gsap.to(arrowRef, {paddingRight: '0.3rem', duration: 0.2})
  }
  const arrowMouseLeave = (menuIndex, detailIndex) => {
    const arrowRef = arrowRightRefs.current[menuIndex][detailIndex];
    gsap.to(arrowRef, {paddingRight: '0rem', duration: 0.2})
  }

  const headerRef = useRef(null);
  const liRefs = useRef([]);
  // const arrowRightRefs = useRef([]);
  const arrowRightRefs = useRef(allMenus.map(() => []));
  

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
                allMenus.map((item, index)=>(
                  <li 
                    key={index} 
                    onMouseEnter={() => handleMouseEnter(index)}
                    ref={(el) => (liRefs.current[index] = el)}
                    className={hoverMenu === item.category ? styles.selected : ''}
                  >
                    <Link 
                      to={item.link} 
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
          allMenus.map((item, menuIndex)=>(
            <div className={`${styles.submenu_wrap} ${hoverMenu === item.category ? styles.selected : ''}`} key={menuIndex}>

              <div className={styles.submenu_list_withus_wrap}>
                <div className={styles.submenu_list_wrap}>
                  <p className={styles.submenu_explain_el}>{item.explainTitle}</p>
                  {
                    item.detailCategory.map((detailItem, index)=>(
                      <div key={item.index}>
                        <Link to={item.link} >
                          {
                            <p className={styles.places}  key={index}>
                              {detailItem.name}
                            </p>
                          }
                        </Link>
                      </div>
                    ))
                  }
                </div>
                <div className={styles.with_us_wrap}>
                  <p className={styles.with_us}>LoveSilver 함께하기</p>
                </div>
              </div>
              <div className={styles.submenu_img_wrap}>
                {
                  item.detailCategory.slice(0, 2).map((detailItem, detailIndex)=>(
                    <div
                      className={styles.submenu_img_content} 
                      key={detailIndex} 
                      onMouseEnter={() => arrowMouseEnter(menuIndex, detailIndex)} 
                      onMouseLeave={() => arrowMouseLeave(menuIndex, detailIndex)}
                    >
                      <Link to='/visit'>
                        <img src={detailItem.img} alt='이미지' />
                        <div class={styles.place_text_wrap}>
                          <p className={styles.place_name}>{detailItem.name}</p>
                          <p className={styles.visit_button}>
                            <p className={styles.visit_text} ref={(el) => (arrowRightRefs.current[menuIndex] = el)}>{item.explainTitle}</p>
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
