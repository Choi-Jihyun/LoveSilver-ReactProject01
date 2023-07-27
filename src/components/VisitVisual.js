import React from 'react'
import styles from './css/visitvisual.module.css'

export default function VisitVisual() {
  return (
    <div id={styles.visit_visual_wrap}>
      <section id={styles.visit_visual}>
        <h2 className='hidden'>방문페이지비주얼</h2>
        <div className={styles.visual_wrap}>
          <div className={styles.img}></div>

          <div className={styles.visual_contents}>
            <div className={styles.texts}>
              <p className={styles.subtitle}>visit us</p>
              <p className={styles.title}>용인 동백<br/>LoveSilver</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
