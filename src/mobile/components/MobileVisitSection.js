import React, { useEffect } from 'react'
import styles from './css/visitsection.module.css'
import { Link } from 'react-router-dom'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import usePlaces from '../../hooks/usePlaces';

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

  const [allPlaces] = usePlaces()

  return (

    <div id={styles.visit_section_wrap} className='contents'>
      <section id={styles.visit_section}>
      <h2 className='hidden'>지점 둘러보기</h2>
      <div className={styles.title_wrap}>
        <p className='title'>Visit</p>
        <p className='subtitle'>전국의 LoveSilver를 둘러보세요!</p>
      </div>
        <div id={styles.visit_contents_gallery_wrap}>
          <div id={styles.visit_contents}>
            <div className={styles.visit_gallery_controller}>
              <TfiAngleLeft onClick={goPrevSlide} className={`${styles.angle_button} ${styles.angle_left} ${isFirstSlide ? styles.disable : ''}`}/>
              <span>{String(currentSlide + 1).padStart(2, '0')}</span>
              <TfiAngleRight onClick={goNextSlide} className={`${styles.angle_button} ${styles.angle_right} ${isLastSlide ? styles.disable : ''}`}/>
            </div>

            { 
            
              allPlaces.map((item)=>(
                <div key={item.index}>

                  <p style={{ display: currentSlide === item.index ? 'block' : 'none' }} className={`${styles.visit_title}`}>{item.place}</p>

                  <p style={{ display: currentSlide === item.index ? 'block' : 'none' }} className={styles.visit_subtitle}>
                    {item.address}<br/>
                    TEL. {item.call}<br/>
                    FAX.{item.call}<br/>
                    E-mail. lovesilver@naver.com
                  </p>
                  <p style={{ display: currentSlide === item.index ? 'block' : 'none' }} className='green_button'>
                    <Link to={`/mobilevisit/${item.index}`} onClick={()=>{
                    }}>방문하기</Link>
                  </p>
                </div>
              ))
            }

          </div>
          <div className={styles.white_gradient_bg}></div>
          <div className={styles.visit_gallery}>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
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
                allPlaces.map((item)=>(
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
