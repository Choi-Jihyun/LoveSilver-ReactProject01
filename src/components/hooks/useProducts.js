import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useProducts() {

  const [allProducts, setAllProducts] = useState([])

  useEffect(()=>{
    axios.get('/data/products.json').then((res)=>{
      setAllProducts(res.data)
    })
  }, [])

  return (
    [allProducts]
  )
}