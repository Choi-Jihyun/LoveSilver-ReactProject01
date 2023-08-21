import React, { useEffect, useRef, useState } from 'react'
import styles from './css/visitplaceimages.module.css'
import usePlaces from '../../hooks/usePlaces'
import { useParams } from 'react-router-dom';


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
