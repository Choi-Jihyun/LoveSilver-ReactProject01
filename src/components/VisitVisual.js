import React, { useEffect, useState } from 'react'
import styles from './css/visitvisual.module.css'
import { useParams } from 'react-router-dom'
import usePlaces from '../hooks/usePlaces'

export default function VisitVisual() {
  const {placeId} = useParams()
  const [allPlaces] = usePlaces()

  const selectedPlace = allPlaces.find(place => place.index === parseInt(placeId));
  const [selectVisit, setSelectVisit]= useState({})
  useEffect(()=>{
    setSelectVisit(allPlaces.find(place => place.index === parseInt(placeId)))
  }, [])


  // 밑에처럼 selectedPlace가 없는 경우에 대비하는 코드가 필요하다. 
  // return에서 제시한 것과 같이 selectedPlace?처럼 null인지 확인하고 값을 받아오도록 확인할 수 있다.
  // if (!selectedPlace) {
  //   // Handle case when selectedPlace is not found
  //   return <p>Place not found.</p>;
  // }

  return (
    <div id={styles.visit_visual_wrap}>
      <section id={styles.visit_visual}>
        <h2 className='hidden'>방문페이지비주얼</h2>
        <div className={styles.visual_wrap}>
          <div className={styles.img} style={{backgroundImage: `url('/images/visit_visual0${selectedPlace?.index}.png')`}}></div>

          <div className={styles.visual_contents}>
            <div className={styles.texts}>
              <p className={styles.subtitle}>visit us</p>
              {/* <p className={styles.title}>용인 동백<br/>LoveSilver{placeId}</p> */}
              <p className={styles.title}>{selectedPlace?.place}</p>
              {
                ()=>{
                    console.log('selectVisit중간: '+selectVisit);
                }
              }
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
