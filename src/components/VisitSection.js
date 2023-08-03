import React, { useEffect } from 'react'
import styles from './css/visitsection.module.css'
import { Link } from 'react-router-dom'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
// import useProducts from './hooks/useProducts';

// 스와이퍼 적용
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';


export default function VisitSection() {

  const [swiper, setSwiper] = useState(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const goPrevSlide = () => {
    if (swiper) {swiper.slidePrev();}
  };

  const goNextSlide = () => {
    if (swiper) {swiper.slideNext();}
  };

  const handleSlideChange = () => {
    if (swiper) {
      setIsFirstSlide(swiper.isBeginning);
      setIsLastSlide(swiper.isEnd);
      setCurrentSlide(swiper.activeIndex);
    }
  };
  
  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', handleSlideChange);
    }
  }, [swiper]);

  const visit_view_list = [
    {index: 1, place: '용인 동백 LoveSilver', address: '용인시 동백로 7길 용인 동백 LoveSilver', call: '010-111-0000', img: '/images/visit01.png'},
    {index: 2, place: '사랑 교회', address: '서울특별시 서초구 사랑로 7길 사랑 교회', call: '010-222-0000', img: '/images/visit02.png'},
    {index: 3, place: '성남 판교 LoveSilver', address: '경기도 성남시 판교 7길 성남 판교 LoveSilver', call: '010-333-0000', img: '/images/visit03.png'},
    {index: 4, place: '수원 광교 LoveSilver', address: '경기도 수원시 광교 7길 수원 광교 LoveSilver', call: '010-444-0000', img: '/images/visit01.png'}
  ]

  // const [allProducts] = useProducts()

  return (

    <div id={styles.visit_section_wrap} className='contents'>
      <section id={styles.visit_section}>
      <h2 className='hidden'>지점 둘러보기</h2>
        <div id={styles.background}>
          <div id={styles.bg_left}></div>
          <div id={styles.bg_right}></div>
          <div id={styles.bg_png}></div>
        </div>
        <div id={styles.visit_contents_gallery_wrap}>
          <div id={styles.visit_contents}>
            <div className={styles.visit_gallery_controller}>
              <TfiAngleLeft onClick={goPrevSlide} className={`${styles.angle_button} ${styles.angle_left} ${isFirstSlide ? styles.disable : ''}`}/>
              <span>{String(currentSlide + 1).padStart(2, '0')}</span>
              <TfiAngleRight onClick={goNextSlide} className={`${styles.angle_button} ${styles.angle_right} ${isLastSlide ? styles.disable : ''}`}/>
            </div>
            <p className={styles.visit_title}>{visit_view_list[currentSlide].place}</p>

            <p className={styles.visit_subtitle}>
              {visit_view_list[currentSlide].address}<br/>
              TEL. {visit_view_list[currentSlide].call}<br/>
              FAX.{visit_view_list[currentSlide].call}<br/>
              E-mail. lovesilver@naver.com
            </p>
            <p className='green_button'>
              <Link to= '/visit'>방문하기</Link>
            </p>
          </div>
          <div className={styles.white_gradient_bg}></div>
          <div className={styles.visit_gallery}>
            <Swiper
              slidesPerView={3}
              spaceBetween={50}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className={`"mySwiper" ${styles.visit_swiper}`}
              style={{postion: 'absolute', left: 0, top: 0}}
              onSwiper={setSwiper}
              onSlideChange={handleSlideChange}
            >
              {
                visit_view_list.map((item)=>(
                  <SwiperSlide><img src={item.img} alt='방문하기'/></SwiperSlide>
                ))
              }

            </Swiper>

          </div>
        </div>
      </section>
    </div>
  )
}
