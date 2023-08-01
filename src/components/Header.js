import React, { useState } from 'react';
import styles from './css/header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {

  const menu = [
    {menu_name: '방문', menu_link: '/visit'},
    {menu_name: '커리큘럼', menu_link: '/curriculum'}, 
    {menu_name: '갤러리', menu_link: '/gallery'}, 
    {menu_name: '문의', menu_link: '/inquire'}
  ];
  const [selectMenu, setSelectMenu] = useState([])

  return (
    <div id={styles.header_wrap}>
      <header>
        <h1>
          <Link to='/'>
            <span>LoveSilver</span>
          </Link>
        </h1>
        <nav id={styles.mainmenu}>
          <h2 className="hidden">메인메뉴</h2>
          <ul id={styles.mainmenu_list}>
            {
              menu.map((item)=>(
                <li>
                  <Link to={item.menu_link} className={selectMenu === item.menu_name ? styles.selected : ''} onClick={()=>{
                  setSelectMenu(item.menu_name)
                }}>{item.menu_name}</Link>
                </li>
              ))
            }
            {/* <li>
              <Link to='/visit' className={styles.selected}>방문</Link>
            </li>
            <li>
              <Link to='/curriculum' className={styles.selected}>커리큘럼</Link>
            </li>
            <li>
              <Link to='/gallery' className={styles.selected}>갤러리</Link>
            </li>
            <li>
              <Link to='/inquire' className={styles.selected}>문의</Link>
            </li> */}
          </ul>
        </nav>
      </header>
    </div>
  )
}
