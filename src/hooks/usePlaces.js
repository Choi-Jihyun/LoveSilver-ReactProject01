import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePlaces() {

  const [allPlaces, setAllPlaces] = useState([])

  useEffect(()=>{
    axios.get('/data/places.json').then((res)=>{
      setAllPlaces(res.data)
    })
  }, [])

  return (
      [allPlaces]
  )
}