import React, { useEffect, useState } from 'react'
import styles from './css/galleryadddetailinner.module.css'
import useMenus from '../hooks/useMenus';
import { useAuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import { database } from '../api/firebase';


export default function GalleryAddDetailInner() {
  const {pathname}= useLocation()
  const {user} = useAuthContext();
  const [allMenus] = useMenus();
  const galleryMenu = allMenus.find(menu => menu.index === 2);
  const [images, setImages] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const initialSelectedDate = `${year}.${month}.${day}`;

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageArray = [];

    for (const file of files) {
      imageArray.push(URL.createObjectURL(file));
    }
    setImages(imageArray);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedLocation = event.target.location.value;
    const title = event.target.title.value;
    const bodyText = event.target.content.value;
    const imagesArray = images;
  
    if (selectedLocation === "장소 선택") {
      alert("장소를 선택해주세요.");
      return;
    }

    try {
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      // const productCount = snapshot.numChildren();
      let productCount = 0;
      snapshot.forEach(() => {
        productCount++;
      });
  
      // await productsRef.child((productCount + 1).toString()).set({
      //   place: selectedLocation,
      //   images: imagesArray,
      //   title: title,
      //   date: selectedDate,
      //   body_text: bodyText
      // });

      await set(ref(database, `products/0${productCount + 1}`), {
        place: selectedLocation,
        images: imagesArray,
        id: `0${productCount + 1}`,
        title: title,
        date: selectedDate,
        body_text: bodyText
      });
  
      alert('게시되었습니다.');
    } catch (error) {
      console.error(error);
      alert('게시 중 오류가 발생했습니다.');
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])
  

  return (
    <div id={styles.gallery_add_detail_section_wrap} className='contents'>
      <section id={styles.gallery_add_detail_section}>
        <h2 className='hidden'>갤러리 추가하기</h2>
        <div className={styles.submit_form_wrap}>
        <form className={styles.form}  onSubmit={handleSubmit}>
          <div className={styles.form_user_name}>
            {
              user && user.isAdmin ?
              <div className={styles.whomade}>
                <p>{user.displayName} 관리자 님, 차례대로 내용을 입력하고 게시 버튼을 눌러주세요.</p>
              </div>
              :
              <div className={styles.whomade}>
                <p>구글 로그인 후 사용하실 수 있습니다.</p>
              </div>
            }
          </div>
          <div className={styles.line_wrap}>
            <div className={styles.placewrap}>
              <label htmlFor="location">장소</label>
              <select id="location" name="location" className={styles.select}>
                <option value="장소 선택">장소 선택</option>
                <option value="용인 동백">용인 동백</option>
                <option value="사랑 교회">사랑 교회</option>
                <option value="성남 판교">성남 판교</option>
                <option value="수원 광교">수원 광교</option>
              </select>
            </div>
            <div className={styles.datewrap}>
              <label htmlFor="date">날짜</label>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
                className={styles.date}
              />
            </div>
          </div>

          <label htmlFor="title">제목</label>
          <input type="text" id="title" name="title" className={styles.input} />

          <label htmlFor="content">내용</label>
          <textarea id="content" name="content" className={styles.textarea}></textarea>

          <label htmlFor="image">이미지</label>
          <input type="file" id="image" name="image" className={styles.fileInput} multiple
            onChange={handleImageUpload}/>
          <div className="preview">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} className={styles.previewImage} />
            ))}
          </div>
          

          <div className={styles.button_wrap}><button type="submit" className={styles.button}>게시</button></div>
        </form>
        
        </div>
      </section>
    </div>
  )
}