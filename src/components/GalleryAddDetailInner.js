import React from 'react'
import styles from './css/galleryadddetailinner.module.css'
import useMenus from '../hooks/useMenus';
import { useAuthContext } from '../context/AuthContext';

export default function GalleryAddDetailInner() {

  const {user} = useAuthContext();
  const [allMenus] = useMenus();
  const galleryMenu = allMenus.find(menu => menu.index === 2);

  return (
    <div id={styles.gallery_add_detail_section_wrap} className='contents'>
      <section id={styles.gallery_add_detail_section}>
        <h2 className='hidden'>갤러리 추가하기</h2>
        <div className={styles.submit_form_wrap}>
        <form className={styles.form}>
          <p className={styles.form_user_name}>
            {
              user && user.isAdmin ?
              <div className={styles.whomade}>
                <p>{user.displayName} 관리자 님, 차례대로 내용을 입력하고 제출하기 버튼을 눌러주세요.</p>
              </div>
              :
              <p>구글 로그인 후 사용하실 수 있습니다.</p>
            }
          </p>
          <label htmlFor="location">장소</label>
          <select id="location" name="location" className={styles.select}>
            <option value="용인 동백">용인 동백</option>
            <option value="사랑 교회">사랑 교회</option>
            <option value="성남 판교">성남 판교</option>
            <option value="수원 광교">수원 광교</option>
          </select>

          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" className={styles.input} />

          <label htmlFor="content">내용</label>
          <textarea id="content" name="content" className={styles.textarea}></textarea>

          <label htmlFor="image">이미지</label>
          <input type="file" id="image" name="image" class={styles.fileInput} multiple />
          <div id="preview"></div>

          <button type="submit" className={styles.button}>게시하기</button>
        </form>
        
        </div>
      </section>
    </div>
  )
}
