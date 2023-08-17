import React, { useEffect, useState } from 'react';
import styles from './css/gallerymain.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import useMenus from '../../hooks/useMenus';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper/modules';


export default function GalleryMain() {

  const [allProducts] = useProducts()
  const [allMenus] = useMenus()
  const galleryMenu = allMenus.find(menu => menu.index === 2);
  const [selectPlace, setSelectPlace] = useState('모든 지점')
  const {search} = useLocation()
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

  useEffect(() => { // 메인에서 선택한 카테고리 보여줌 
    console.log('search: '+search);
    if (search) {
      const getPlace = decodeURIComponent(new URLSearchParams(search).get('place')) // search 전체값을 받아와서 category 속성값만 얻어내는 약속된 객체함수 
      if (getPlace) {
        setSelectPlace(getPlace);
      }
    }
  }, [search])


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
              galleryMenu?.detailCategory.map((item, detailIndex)=>(
                <li 
                  key={detailIndex} 
                  className={selectPlace === item.place ? styles.selected : ''}
                  onClick={()=>{
                    setSelectPlace(item.place)
                  }}
                >
                  <Link>{item.place}</Link>
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
