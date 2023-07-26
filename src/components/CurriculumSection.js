import React from 'react'
import styles from './css/curriculumsection.module.css'
import { FaBookReader, FaPalette, FaHiking } from 'react-icons/fa'

export default function CurriculumSection() {
  return (
    <div id={styles.curriculum_section_wrap} className='contents'>
      <section id={styles.curriculum_section}>
      <h2 className='hidden'>커리큘럼</h2>
        <div className={styles.title_wrap}>
          <p className='title'>Curriculum</p>
          <p className='subtitle'>loveSilver의 차별화된 커리큘럼</p>
        </div>
        <div className={styles.curriculums}>
          <ul className={styles.curriculums_list}>
            <li>
              <div>
                <div className={styles.curri_pink_circle}></div>
                <FaBookReader className={styles.curri_icon}/>
              </div>
              <p className={styles.curri_title}>우리는 작가</p>
              <p className={styles.curri_subtitle}>매주 다른 주제의 글을 쓰고 글을 모아 직접 책으로 출판하는 프로그램입니다.</p>
            </li>
            <li>
              <div>
                <div className={styles.curri_pink_circle}></div>
                <FaPalette className={styles.curri_icon}/>
              </div>
              <p className={styles.curri_title}>우리는 예술가</p>
              <p className={styles.curri_subtitle}>매주 신나는 미술 프로그램과 음악 프로그램으로 구성되어 있습니다.</p>
            </li>
            <li>
              <div>
                <div className={styles.curri_pink_circle}></div>
                <FaHiking className={styles.curri_icon}/>
              </div>
              <p className={styles.curri_title}>이팔청춘</p>
              <p className={styles.curri_subtitle}>재활, 요가, 등산, 당구 등 다양한 운동 프로그램으로 구성되어 있습니다.</p>
            </li>
          </ul>
        </div>


      </section>
    </div>
  )
}
