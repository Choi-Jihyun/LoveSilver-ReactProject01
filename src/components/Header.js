import React, { useEffect, useRef, useState } from 'react';
import styles from './css/header.module.css';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import usePlaces from '../hooks/usePlaces';
import useMenus from '../hooks/useMenus';
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Header() {

  const menu = [
    {name: '방문', link: '/visit'},
    {name: '커리큘럼', link: '/curriculum'}, 
    {name: '갤러리', link: '/gallery'}, 
    {name: '문의', link: '/inquire'}
  ];
  const [selectMenu, setSelectMenu] = useState('')
  const [hoverMenu, setHoverMenu] = useState('')

  const handleMouseEnter = (index) => {
    setHoverMenu(menu[index].name);
    gsap.to(headerRef.current, { height: '21.4rem', duration: 0.3, background: 'white', borderBottom: 'solid 1px #ccc', boxShadow: '0px 0px 10px 0px #ccc' });
    gsap.to( '.change_text_color', { color: 'black', duration: 0.3 });
  };

  const handleMouseLeave = () => {
    setHoverMenu('');
    gsap.to(headerRef.current, { height: '80px', duration: 0.3, background: 'transparent', borderBottom: 'none', boxShadow: 'none'  });
    gsap.to('.change_text_color', { color: 'white', duration: 0.3 });
  };
  
  const arrowMouseEnter = (index) => {
    const arrowRef = arrowRightRefs.current[index];
    gsap.to(arrowRef, {paddingRight: '0.3rem', duration: 0.2})
  }
  const arrowMouseLeave = (index) => {
    const arrowRef = arrowRightRefs.current[index];
    gsap.to(arrowRef, {paddingRight: '0rem', duration: 0.2})
  }

  const headerRef = useRef(null);
  const liRefs = useRef([]);
  const arrowRightRefs = useRef([]);
  const [allPlaces] = usePlaces();
  const [allMenus] = useMenus();

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
                menu.map((item, index)=>(
                  <li 
                    key={index} 
                    onMouseEnter={() => handleMouseEnter(index)}
                    ref={(el) => (liRefs.current[index] = el)}
                    className={hoverMenu === item.name ? styles.selected : ''}
                  >
                    <Link 
                      to={item.link} 
                      className={selectMenu === item.name ? styles.selected : ''} 
                      onClick={()=>{
                        setSelectMenu(item.name)
                      }}
                    >
                      <span className='change_text_color'>{item.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>

        <div className={`${styles.submenu_wrap} ${hoverMenu === menu[0].name ? styles.selected : ''}`}>
          <div className={styles.submenu_list_withus_wrap}>
            <div className={styles.submenu_list_wrap}>
              <p className={styles.submenu_explain_el}>LoveSilver</p>
              {
                allPlaces.map((item)=>(
                  <Link to='/visit'>
                    <p className={styles.places}>
                      {item.place}
                    </p>
                  </Link>
                ))
              }
            </div>
            <div className={styles.with_us_wrap}>
              <p className={styles.with_us}>LoveSilver 함께하기</p>
            </div>
          </div>
          <div className={styles.submenu_img_wrap}>
            {
              allPlaces.slice(0, 2).map((item, index)=>(
                <div className={styles.submenu_img_content} key={index} onMouseEnter={() => arrowMouseEnter(index)} onMouseLeave={() => arrowMouseLeave(index)}>
                  <Link to='/visit'>
                    <img src={item.placeImg} alt='이미지' />
                    <div class={styles.place_text_wrap}>
                      <p className={styles.place_name}>{item.place}</p>
                      <p className={styles.visit_button}>
                        <p className={styles.visit_text} ref={(el) => (arrowRightRefs.current[index] = el)}>visit</p>
                        <FaLongArrowAltRight className={styles.arrow_right_icon}/>
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
          
        <div className={`${styles.submenu_wrap} ${hoverMenu === menu[1].name ? styles.selected : ''}`}>
          <div>커리큘럼</div>
        </div>

        <div className={`${styles.submenu_wrap} ${hoverMenu === menu[2].name ? styles.selected : ''}`}>
          <div>갤러리</div>
        </div>

        <div className={`${styles.submenu_wrap} ${hoverMenu === menu[3].name ? styles.selected : ''}`}>
          <div>문의</div>
        </div>


        </div>
      </header>
    </div>
  )
}
