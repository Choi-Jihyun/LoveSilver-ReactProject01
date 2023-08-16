import React from 'react'
import styles from './css/visitintroduce.module.css'
import { Link, useParams } from 'react-router-dom'
import usePlaces from '../../hooks/usePlaces'


export default function VisitIntroduce() {
  const {placeId} = useParams()
  const [allPlaces] = usePlaces()
  const selectedPlace = allPlaces.find(place => place.index === parseInt(placeId));
  if (!selectedPlace) {
    // Handle case when selectedPlace is not found
    return <p>Place not found.</p>;
  }

  return (
    <div id={styles.visit_introduce_wrap} className='contents'>
      <section id={styles.visit_introduce}>
        <h2 className='hidden'>{selectedPlace?.place} 소개</h2>
        <div className={styles.info_img_wrap}>
          <div className={styles.visit_info_wrap}>
            <p className={`subtitle ${styles.subtitle}`}>{selectedPlace.place}에 오신 것을 환영합니다.</p>
            <p className={`title ${styles.title}`}>Welcome to LoveSilver</p>
            <p className={`body_text ${styles.body_text}`}>
              어르신들의 소중한 보호와 행복한 일상을 위해 {selectedPlace.place} 주야간 보호 센터를 소개합니다.<br/>
              저희 센터는 노년기를 맞이한 어르신들에게 안락하고 따뜻한 공간을 제공합니다. 깨끗하고 편안한 시설과 친절한 스태프들이 항상 노인들의 안녕과 행복을 위해 노력하고 있습니다.<br/>
              다양한 활동과 프로그램들을 통해 노인들의 일상을 채워드립니다. 문화예술, 체조, 요가, 요리 등 다양한 분야에서 즐거운 시간을 함께할 수 있으며, 소중한 인연을 만들 수 있는 기회를 제공합니다.<br/>
              건강 상태를 지속적으로 관리하며, 필요한 의료 서비스와 간호도 함께 제공하여 어르신들의 안녕을 최우선으로 합니다.<br/>
              {selectedPlace.place} 주야간 보호 센터에서는 언제나 어르신들을 따뜻한 마음으로 환영합니다. 저희와 함께 즐거운 시간과 행복한 일상을 만들어가시길 바랍니다. 문의 사항이 있으시면 언제든지 연락 주시기 바랍니다. <br/>감사합니다.
            </p>
            <p className={`green_button ${styles.green_button}`}>
              <Link to='/visit'>자세히 보기</Link>
            </p>
          </div>
          <div className={styles.visit_introduce_img1} style={{backgroundImage: `url('${selectedPlace?.introImg[0].path}')`}}></div>
        </div>
        <div className={styles.visit_introduce_img2} style={{backgroundImage: `url('${selectedPlace?.introImg[1].path}')`}}></div>

      </section>
    </div>
  )
}
