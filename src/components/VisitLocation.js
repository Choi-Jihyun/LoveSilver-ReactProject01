import React, { useState } from 'react'
import styles from './css/visitlocation.module.css'
import { Link, useParams } from 'react-router-dom'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import usePlaces from '../hooks/usePlaces';

export default function VisitLocation() {
  const [level, setLevel] = useState(2);
  const {placeId} = useParams()
  const [allPlaces] = usePlaces()
  const selectedPlace = allPlaces.find(place => place.index === parseInt(placeId));
  // selectedPlace 사용할 때 selectedPlace? 사용하기

  return (
    <div id={styles.visit_location_wrap} className='contents'>
      <section id={styles.visit_location}>
        <h2 className='hidden'>{selectedPlace?.place} 위치</h2>
        <div className={styles.title_wrap}>
          <p className='subtitle'>아름다운 {selectedPlace?.locationName[0].text}</p>
          <p className='title'>Located In {selectedPlace?.locationName[1].text}<br/> {selectedPlace?.locationName[2].text}</p>
        </div>
        <div className={styles.map_api}>
          <Map 
            center={{ lat: 33.5563, lng: 126.79581 }} 
            style={{ width: '100%', height: '100%' }}
            scrollwheel ={false} 
            level={2} 
          >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
            <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
              <div className='overlay'>{selectedPlace?.place}</div>
            </CustomOverlayMap>
            <div className={styles.map_buttons}>
              <button onClick={() => setLevel(level + 1)} className={styles.minus_button}>-</button>
              <button onClick={() => setLevel(level - 1)} className={styles.plus_button}>+</button>
            </div>
          </Map>
        </div>
        <div className={styles.location_info}>
          <div className={styles.location_title_wrap}>
            <p className={styles.location_title}>{selectedPlace?.place}</p>
          </div>

          <div className={styles.location_detail_wrap}>
            <div className={styles.location_address_and_call}>
              <div className={styles.location_address}>
                <p className={styles.location_detail_category}>location</p>
                <p className={styles.location_detail_text}>
                  {selectedPlace?.locationName[3].text},<br/>
                  {selectedPlace?.place}
                </p>
              </div>
              <div className={styles.location_call}>
                <p className={styles.location_detail_category}>call</p>
                <p className={styles.location_detail_text}>{selectedPlace?.locationName[4].text}</p>
              </div>
            </div>
            <div className={styles.location_directions}>
              <p className={styles.location_detail_category}>directions</p>
              <ul className={styles.direction_list}>
                <li><Link to='https://map.kakao.com/?q=%EC%9A%A9%EC%9D%B8%20%EB%8F%99%EB%B0%B1%20LoveSilver' target="_blank" rel="noopener noreferrer">카카오맵으로 길찾기</Link></li>
                <li><Link to='https://map.naver.com/v5/search/%EC%9A%A9%EC%9D%B8%20%EB%8F%99%EB%B0%B1%20LoveSilver?c=15,0,0,0,dh' target="_blank" rel="noopener noreferrer">네이버맵으로 길찾기</Link></li>
                <li><Link to='https://surl.tmobiapi.com/a670daa6' target="_blank" rel="noopener noreferrer">티맵으로 길찾기</Link></li>
                <li><Link to='https://www.google.co.kr/maps/search/용인+동백+LoveSilver' target="_blank" rel="noopener noreferrer">구글지도로 길찾기</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
