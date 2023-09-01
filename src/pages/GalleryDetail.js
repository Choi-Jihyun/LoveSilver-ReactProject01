import React, { useEffect, useState } from 'react'
import BlackMenuBg from '../components/BlackMenuBg'
import styles from '../components/css/gallerydetail.module.css'
import { useLocation, useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Pagination } from 'swiper/modules';
import { getProductDetail } from '../api/firebase'

export default function GalleryDetail() {
  const {productId} = useParams()
  //const [allProducts] = useProducts()
  const [productItem, setProductItem] = useState([])
  const {pathname}= useLocation()

  useEffect(() => {
    // const productItem = allProducts.filter((item)=>(item.id === productId))
    // setProductItem(productItem)
    getProductDetail(productId).then((res)=>{
      setProductItem(res)
    })
  }, [productId])
  
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
            <div className={styles.title_wrap}>
              <p className={styles.gallery_title}>{productItem.title}</p>
              <p className={styles.gallery_place}>{productItem.place}</p>
            </div>
            <div className={styles.gallery_date}>{productItem.date}</div>
            <div className={styles.gallery_body_text}>{productItem.body_text}</div>
            <div className={styles.swiper_wrap}>
              <Swiper className={styles.swiper} spaceBetween={0} loop={true} slidesPerView={1} pagination={true} navigation modules={[Pagination, Navigation]}>
                {
                productItem.images.map((image, index) => (
                  <SwiperSlide className={styles.swiper_slide} key={index}>
                    <img className={styles.swiper_img} src={image} alt='스와이퍼 이미지'/>
                  </SwiperSlide>
                ))
                }
              </Swiper>
        
            </div>
            <div className={styles.gallery_img_wrap}>
              <p className={styles.gallery_detail_title}>사진 차례로 보기</p>
              {
              productItem.images.map((image, index) => (
                <div className={styles.gallery_show} key={index}>
                  <img className={styles.gallery_imgs} src={image} alt='스와이퍼 이미지'/>
                </div>
              ))
              }
            </div>

          </section>
        </div>
      </div>
      
    </div>
  )
}
