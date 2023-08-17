import React, { useEffect, useRef, useState } from 'react'
import styles from './css/visitplaceimages.module.css'
import usePlaces from '../../hooks/usePlaces'
import { useParams } from 'react-router-dom';
import gsap from 'gsap';


export default function VisitPlaceImages() {

  const [allPlaces] = usePlaces();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const {placeId} = useParams()
  const selectedPlace = allPlaces.find(place => place.index === parseInt(placeId));

  const handleScroll = () => {
    const section = stickyRef.current;
    if (section) {
          const scrollPosition = section.offsetTop;
          const newIndex = Math.min(Math.max(Math.floor(scrollPosition / 270), 0), 7); // Adjust 500 as needed
          setSelectedIndex(newIndex);
        }
  };

  useEffect(() => {    
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleNavClick = (index) => {
    setSelectedIndex(index);
    const newPosition = index * 270;
    stickyRef.current.scrollBy(0, newPosition);
    console.log('sectionRef: '+sectionRef.current.scrollTop);
  };

  // sticky_wrap 요소에 ScrollTrigger를 적용합니다.
  gsap.to(stickyRef.current, {
    scrollTrigger: {
      trigger: stickyRef.current,
      start: "top 60px",  // 시작 위치 (화면 상단에서 60px 아래에서 시작)
      end: () => `+=${stickyRef.current.offsetHeight - 700 + 60}`,  // 끝 위치 (요소 높이 - 화면 높이 + 시작 위치)
      scrub: true,  // 스크롤에 따라 부드럽게 움직임
      pin: true,    // 요소를 고정시킴 (position: sticky와 같은 효과)
      anticipatePin: 1  // 핀이 적용될 위치를 미리 예측하여 부드러운 움직임을 보장
    }
  });


  return (
    <div id={styles.visit_place_images_wrap} className='contents'>
      <section id={styles.visit_place_images} ref={sectionRef}>
        <h2 className='hidden'>{selectedPlace?.place} 내부 사진</h2>
        <div className={styles.sticky_wrap} ref={stickyRef}>
          <div className={styles.title_wrap}>
            <p className='subtitle'>장소 둘러보기</p>
            <p className='title'>Explore each place</p>
          </div>
          <div className={styles.img_nav_wrap}>
            <div className={styles.img_wrap}>
              {
                // allPlaces.slice(1,2).map((item)=>(
                  selectedPlace?.placeImg.map((detailItem)=>(
                    <img
                      src={detailItem.path} alt={detailItem.category}
                      className={`${detailItem.index === selectedIndex && styles.selected}`}
                      
                    />
                  ))
                // ))
              }
            </div>
            <div className={styles.nav_wrap}>
              {
                allPlaces.slice(0,1).map((item)=>(
                  item.placeImg.map((detailItem)=>(
                    <p
                      key={detailItem.index}
                      className={`${detailItem.index === selectedIndex && styles.selected}`}
                      onClick={()=>{
                        handleNavClick(detailItem.index)
                      }}
                    >
                      {detailItem.category}
                    </p>
                  ))
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
