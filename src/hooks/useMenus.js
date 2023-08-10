import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMenus() {

  const [allMenus, setAllMenus] = useState([])

  useEffect(()=>{
    axios.get('/data/menus.json').then((res)=>{
      setAllMenus(res.data)
    })
  }, [])

  return (
    [allMenus]
  )
}
