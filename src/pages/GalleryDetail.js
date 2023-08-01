import React, { useEffect, useRef, useState } from 'react'
import BlackMenuBg from '../components/BlackMenuBg'
import styles from '../components/css/gallerydetail.module.css'
import { useLocation, useParams } from 'react-router-dom'
import useProducts from '../components/hooks/useProducts'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';

export default function GalleryDetail() {
  const {productId} = useParams()
  const [allProducts] = useProducts()
  const [productItem, setProductItem] = useState([])
  const {pathname}= useLocation()
  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const thumbsSwiperRef = useRef(null);


  useEffect(() => {
    const productItem = allProducts.filter((item)=>(item.id === productId))
    setProductItem(productItem)
  }, [allProducts, productId])
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname])
  
  if (productItem.length === 0) {
    return null;
  }

  const item = productItem[0];
  
  return (
    <div>
      <BlackMenuBg/>
      <div style={{width: '100%', minHeight: '1000px'}}>
        <div id={styles.gallery_detail_section_wrap} className='contents'>
          <section id={styles.gallery_detail_section}>
          <h2 className='hidden'>갤러리</h2>
            
            {
              productItem.map((item)=>(
                <>
                  <div className={styles.title_wrap}>
                    <p className={styles.gallery_title}>{item.title}</p>
                    <p className={styles.gallery_place}>{item.place}</p>
                  </div>
                  <div className={styles.gallery_date}>{item.date}</div>
                  <div className={styles.gallery_body_text}>{item.body_text}</div>
                  <div className={styles.swiper_wrap}>
                    <Swiper className={styles.swiper} spaceBetween={0} loop={true} slidesPerView={1} pagination={true} navigation modules={[Pagination, Navigation]}>
                      {item.images.map((image, index) => (
                        <SwiperSlide className={styles.swiper_slide} key={index}>
                          <img className={styles.swiper_img} src={image} alt='스와이퍼 이미지'/>
                        </SwiperSlide>
                      ))}
                    </Swiper>


                  {/* <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    loop={true}
                    spaceBetween={0}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {
                      item.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} />
                        </SwiperSlide>
                      ))
                    }
                    
                  </Swiper>
                  
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {item.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} />
                      </SwiperSlide>
                    ))}
                  </Swiper> */}
                  </div>
                  <div className={styles.gallery_img_wrap}>
                    <p className={styles.gallery_detail_title}>사진 차례로 보기</p>
                    {item.images.map((image, index) => (
                      <div className={styles.gallery_show} key={index}>
                        <img className={styles.gallery_imgs} src={image} alt='스와이퍼 이미지'/>
                      </div>
                    ))}
                  </div>


                </>
              ))
            }
          
          </section>
        </div>
      </div>
      
    </div>
  )
}
