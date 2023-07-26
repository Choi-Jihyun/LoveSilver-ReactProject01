import React from 'react';
import styles from './css/header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
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
            <li>
              <Link to='/visit'>방문</Link>
            </li>
            <li>
              <Link to='/curriculum'>커리큘럼</Link>
            </li>
            <li>
              <Link to='/gallery'>갤러리</Link>
            </li>
            <li>
              <Link to='/inquire'>문의</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
