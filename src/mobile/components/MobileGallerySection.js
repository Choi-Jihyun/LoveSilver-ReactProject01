import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './css/gallerysection.module.css'
import useProducts from '../../hooks/useProducts'


export default function GallerySection() {

  const [allProducts] = useProducts()
  const [galleryItems, setGalleryItems] = useState([]);
  const displayGalleryItems = allProducts.filter((item) => item.id > 1 && item.id < 6 );

  useEffect(() => {
    setGalleryItems(displayGalleryItems);
  }, [allProducts, galleryItems]);


  return (
    <div id={styles.gallery_section_wrap} className='contents'>
      <section id={styles.gallery_section}>
      <h2 className='hidden'>활동 갤러리</h2>
        <div className={styles.text_wrap}>
          <p className='title'>Our best gallery from LoveSilver</p>
          <p className='subtitle'>다양한 활동들을 담은 사진으로 LoveSilver의 즐거운 일상을 엿볼 수 있습니다. 예술, 체조, 문화행사 등 다채로운 프로그램들을 통해 회원님들에게 행복을 선사하는 저희 센터에서 보낸 활기찬 시간을 갤러리에서 확인해보세요. 이곳에서는 회원님들의 삶에 즐거움과 활력을 불어넣는 순간들을 만나보실 수 있습니다.</p>
          <p className='green_button'>
            <Link to= '/mobilegallery'>구경하기</Link>
          </p>
        </div>
        <div className={styles.gallery_wrap}>
          <ul className={styles.gallery_list}>
          {
            galleryItems.map((item) => (
              <li>
                <Link to='/mobilegallery'>
                  <img src={item.images[0]} style={{width: "100%", height: '100%', objectPosition: "center", objectFit: "cover"}}/>
                </Link>
              </li>
            ))
          }
          </ul>
        </div>
      </section>
    </div>
  )
}
