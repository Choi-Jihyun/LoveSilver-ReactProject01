import React from 'react'
import styles from './css/reviewsection.module.css'

export default function ReviewSection() {
  return (
    <div id={styles.review_section_wrap} className='contents'>
      <section id={styles.review_section}>
      <h2 className='hidden'>후기</h2>
        <div className={styles.title_wrap}>
          <p className='title'>What our member say</p>
          <p className='subtitle'>loveSilver를 경험한 회원님들의 생생한 후기</p>
        </div>
        <div className={styles.review_wrap}>
          <ul className={styles.review_list}>
            <li>
              <span className={styles.person_icon}></span>
              <div className={styles.review_box}>
                <div className={styles.review_marks_icon}></div>
                <p className={styles.review}>LoveSilver에서 보낸 시간은 저에게 큰 축복이었습니다. 친절하고 배려심 넘치는 직원들과 함께 더 이상 외로움을 느끼지 않았고, 다양한 활동들을 통해 새로운 친구들과의 인연을 맺을 수 있었습니다. 정말 감사합니다.</p>
                <div class={styles.reviewers_info}>
                  <p className={styles.reviewer}>최*현</p>
                  <p className={styles.reviewers_location}>용인 동백 LoveSilver</p>
                </div>
              </div>
            </li>
            <li>
              <span className={styles.person_icon}></span>
              <div className={styles.review_box}>
                <div className={styles.review_marks_icon}></div>
                <p className={styles.review}>문화행사, 체조, 예술활동 등 다양한 프로그램들이 제공되어 저의 일상에 활력을 불어넣어 주었습니다. 이곳 덕분에 저의 삶이 더욱 풍요로워졌고, 늙어가는 동안에도 즐겁게 시간을 보내고 있어서 기쁩니다.</p>
                <div class={styles.reviewers_info}>
                  <p className={styles.reviewer}>고*은</p>
                  <p className={styles.reviewers_location}>성남 판교 LoveSilver</p>
                </div>
              </div>
            </li>
          </ul>
        </div>


      </section>
    </div>
  )
}
