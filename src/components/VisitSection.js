import React from 'react'
import styles from './css/visitsection.module.css'
import { Link } from 'react-router-dom'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

export default function VisitSection() {
  return (
    <div id={styles.visit_section_wrap} className='contents'>
      <section id={styles.visit_section}>
      <h2 className='hidden'>지점 둘러보기</h2>
        <div id={styles.background}>
          <div id={styles.bg_left}></div>
          <div id={styles.bg_right}></div>
          <div id={styles.bg_png}></div>
        </div>
        <div id={styles.visit_contents}>
          <div className={styles.visit_gallery_controller}>
            <TfiAngleLeft className={`${styles.angle_button} ${styles.angle_left}`}/>
            <span>01</span>
            <TfiAngleRight className={`${styles.angle_button} ${styles.angle_right}`}/>
          </div>
          <p className={styles.visit_title}>용인 동백 LoveSilver</p>
          <p className={styles.visit_subtitle}>
            용인시 동백로 7길 용인 동백 LoveSilver<br/>
            TEL. 000-000-0000<br/>
            FAX. 000-000-0000<br/>
            E-mail. lovesilver@naver.com
          </p>
          <p className='green_button'>
            <Link to= '/visit'>방문하기</Link>
          </p>
        </div>
        <div className={styles.visit_gallery}>
          <ul className={styles.visit_gallery_list}>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </div>
  )
}
