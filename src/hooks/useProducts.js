import { useEffect, useState } from 'react'
import axios from 'axios'
import { getProducts } from '../api/firebase'

export default function useProducts() {

  const [allProducts, setAllProducts] = useState([])

  useEffect(()=>{
    // axios.get('/data/products.json').then((res)=>{
    //   setAllProducts(res.data)
    // })
    getProducts().then((res)=>{
      setAllProducts(res)
    })
  }, [])

  return (
    [allProducts]
  )
}