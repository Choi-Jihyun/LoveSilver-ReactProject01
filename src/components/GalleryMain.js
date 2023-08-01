import React, { useEffect, useState } from 'react';
import styles from './css/gallerymain.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useProducts from './hooks/useProducts';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules';

export default function GalleryMain() {

  const [allProducts] = useProducts()

  const places = [
    {index: 0, text: '모든 지점', fullPlaceName: '모든 지점'},
    {index: 1, text: '용인 동백', fullPlaceName: '용인 동백 LoveSilver'},
    {index: 2, text: '사랑 교회', fullPlaceName: '사랑 교회'},
    {index: 3, text: '성남 판교', fullPlaceName: '성남 판교 LoveSilver'},
    {index: 4, text: '수원 광교', fullPlaceName: '수원 광교 LoveSilver'}
  ];

  const [selectPlace, setSelectPlace] = useState(places[0].fullPlaceName)
  const [placeItems, setPlaceItems] = useState([])


  useEffect(()=>{
    if(selectPlace === '모든 지점') {
      setPlaceItems(allProducts)
    } else {
      const placeItems = allProducts.filter((item) => (item.place === selectPlace))
      setPlaceItems(placeItems)
    }
  }, [selectPlace, allProducts])

  const navigate = useNavigate()

  return (
    <div id={styles.gallery_section_wrap} className='contents'>
      <section id={styles.gallery_section}>
      <h2 className='hidden'>갤러리</h2>
        <div className={styles.title_wrap}>
          <p className='title'>Gallery</p>
          <p className='subtitle'>LoveSilver의 다양한 활동을 살펴보세요!</p>
        </div>
        <div className={styles.select_bar}>
          <ul className={styles.select_place_list}>
            {
              places.map((item)=>(
                <li key={item.index} className={selectPlace === item.fullPlaceName ? 'selected' : ''} onClick={()=>{
                  setSelectPlace(item.fullPlaceName)

                }}>
                  <Link>{item.text}</Link>
                </li>
              ))
            }

          </ul>
        </div>
        <div className={styles.gallery_main}>
          <ul className={styles.gallery_list}>

            {
              placeItems.map((item)=>(
                <li key={item.id} onClick={()=>{
                  navigate(`/gallery/${item.id}`)
                }}>
                  <div className={styles.gallery_li_wrap}>
                    {/* <div className={styles.gallery_li_img}>{item.image}<img src='' alt=''></img></div> */}
                    <div className={styles.gallery_li_img}>
                      <Swiper className={styles.swiper} spaceBetween={0} loop={true} slidesPerView={1} pagination={true} modules={[Pagination, Navigation]}>
                        {item.images.map((image, index) => (
                          <SwiperSlide className={styles.swiper_slide} key={index}>
                            <img className={styles.swiper_img} src={image} alt='스와이퍼 이미지'/>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className={styles.gallery_li_title}>{item.title}</div>
                    <div className={styles.gallery_li_place}>{item.place}</div>
                    <div className={styles.gallery_li_date}>{item.date}</div>
                  </div>
                </li>
              ))
            }
            

          </ul>
        </div>


      </section>
    </div>
  )
}
