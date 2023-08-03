import React, { useEffect, useRef, useState } from 'react';
import styles from './css/header.module.css';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import usePlaces from '../hooks/usePlaces';

export default function Header() {

  const menu = [
    {name: '방문', menu_link: '/visit'},
    {name: '커리큘럼', menu_link: '/curriculum'}, 
    {name: '갤러리', menu_link: '/gallery'}, 
    {name: '문의', menu_link: '/inquire'}
  ];
  const [selectMenu, setSelectMenu] = useState('')
  const [hoverMenu, setHoverMenu] = useState('')

  const handleMouseEnter = (index) => {
    setHoverMenu(menu[index].name);
    gsap.to(headerRef.current, { height: '20rem', duration: 0.3, background: 'white' });
    gsap.to('span', { color: 'black', duration: 0.3 });
  };

  const handleMouseLeave = () => {
    setHoverMenu('');
    gsap.to(headerRef.current, { height: 'auto', duration: 0.3, background: 'transparent' });
    gsap.to('span', { color: 'white', duration: 0.3 });
  };

  const headerRef = useRef(null);
  const liRefs = useRef([]);
  const [allPlaces] = usePlaces();

  return (
    <div 
      id={styles.header_wrap} 
      // onMouseLeave={handleMouseLeave} 
      ref={headerRef}
    >
      <header>
        <div id={styles.mainmenu_wrap}>
          <h1>
            <Link to='/' onClick={() => setSelectMenu('')}>
              <span>LoveSilver</span>
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
                      to={item.menu_link} 
                      className={selectMenu === item.name ? styles.selected : ''} 
                      onClick={()=>{
                        setSelectMenu(item.name)
                      }}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
        <div className={`${styles.submenu_wrap} ${styles.selected}`}>
          <div className={styles.submenu_list_wrap}>
            <p>LoveSilver</p>

            {
              allPlaces.map((item)=>(
                <p>
                  {item.place}
                </p>
              ))
            }
          </div>
          <div className={styles.submenu_img_wrap}>
              
          </div>
        </div>
      </header>
    </div>
  )
}
