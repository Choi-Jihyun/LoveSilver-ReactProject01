import React from 'react'
import styles from './css/contactus.module.css'
import { FaPhoneAlt, FaInstagram, FaFacebookF, FaLinkedinIn, FaBimobject } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div id={styles.contactus_section_wrap}>
      <section id={styles.contactus_section}>
      <h2 className='hidden'>상담문의</h2>
        <div className={styles.contactus_wrap}>
          <div className={styles.title_wrap}>
            <p className='title'>Contact us</p>
            <p className='subtitle'>상담 문의</p>
          </div>
          <div className={styles.company_info_wrap}>
            <div className={styles.call_num_wrap}>
              <FaPhoneAlt className={styles.icon_phone}/>
              <p className={styles.call}>02-000-0000</p>
            </div>
            <p className={styles.infos}>
              대표이사: 고하은<br/>
              사업자 등록번호: 161-59-3030<br/>
              경기도 성남시 분당구 판교 최고 7길 7<br/>
              (주) LoveSilver<br/>
              Fax. 02-000-0000<br/>
              E-mail. lovesilver@naver.com
            </p>
            <ul className={styles.sns_list}>
              <li><FaInstagram/></li>
              <li><FaFacebookF/></li>
              <li><FaBimobject/></li>
              <li><FaLinkedinIn/></li>
            </ul>
          </div>
          <div className={styles.contact_form_wrap}>
            <form className={styles.contact_form}>
              <fieldset>
                <legend className='hidden'>상담 문의 form</legend>
                
                <p className={styles.form_user_name}>
                  <label>
                    <span className={styles.form_explain_text}>작성자 *</span>
                    <input type="text" id={styles.user_name} className={`${styles.txt_box_long} ${styles.txt_box}`} name="user_name" placeholder="홍길동"/>
                  </label>
                </p>
                <p className={styles.form_user_email_and_call}>
                  <label>
                    <span className={styles.form_explain_text}>이메일 *</span>
                    <input type="email" id={styles.user_email} className={`${styles.txt_box_half} ${styles.txt_box}`} name="user_email" placeholder="example@email.com"/>
                  </label>
                  <label>
                    <span className={styles.form_explain_text2}>전화번호</span>
                    <input type="tel" id={styles.user_call} className={`${styles.txt_box_half} ${styles.txt_box}`} name="user_call" placeholder="010-0000-0000"/>
                  </label>
                </p>
                <p className={styles.form_subject}>
                  <label>
                    <span className={styles.form_explain_text}>문의 유형 *</span>
                    <select>
                      <option>입소 문의</option>
                      <option>가맹 문의</option>
                      <option>기타 문의</option>
                    </select>
                  </label>
                </p>
                <p>
                  <label>
                    <span className={styles.form_explain_text}>문의 내용*</span>
                    <textarea id="user_write" className={`${styles.txt_box}`} placeholder="문의 내용을 입력하세요."></textarea>
                  </label>
                </p>
                <p>
                  <input type="submit" value="문의하기" className={styles.green_button}/>
                </p>
              </fieldset>
            </form>

          </div>
        </div>
      </section>
      
    </div>
  )
}
