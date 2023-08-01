import React, { useEffect, useState } from 'react'
import BlackMenuBg from '../components/BlackMenuBg'
import styles from '../components/css/gallerydetail.module.css'
import { useLocation, useParams } from 'react-router-dom'
import useProducts from '../components/hooks/useProducts'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function GalleryDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const {productId} = useParams()

  const [allProducts] = useProducts()

  const [productItem, setProductItem] = useState([])

  const {pathname}= useLocation()

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
                    <Swiper
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
                    </Swiper>
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
