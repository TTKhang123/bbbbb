import React, { useEffect, useRef, useState } from 'react'
import ProductType from '../../components/type_of_products/ProductType'
import SliderComponent from '../../components/SilderComponent/SliderComponent'
import Slide1 from '../../assets/images/Slide1.png'
import Slide2 from '../../assets/images/Slide2.png'
import Slide3 from '../../assets/images/Slide3.png'
import Slide4 from '../../assets/images/Slide4.png'
import ProductBlock from '../../components/ProductBlock/ProductBlock'
import { WrapperTypeProduct, ButtonHover, WrapperProduct } from './style'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [limit, setLimit] = useState(4)
  // const array = ['Áo', 'Quần ', 'Phụ kiện', 'Balo, túi xách', 'Đồ bơi']
  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState()

  const fetchProductAll = async (context) => {
    console.log('context', context)
    const search = context?.queryKey && context?.queryKey[2]
    const limit = context?.queryKey && context?.queryKey[1]
    const res = await ProductService.getAllProduct(search, limit)
    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.data)
      return []
    }
    return res


  }

  useEffect(() => {
    if (refSearch.current) {
      setLoading(true)
      fetchProductAll(searchDebounce).then(() => setLoading(false))
    }
    refSearch.current = true;
  }, [searchDebounce])

  const { isPending, data: products } = useQuery({ queryKey: ['products', limit, searchDebounce], queryFn: () => fetchProductAll(searchDebounce), retry: 3, retryDelay: 1000 });
  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products?.data)
    }
  }, [products])

  return (
    <Loading isPending={isPending || isPending}>
      <div style={{ padding: '2px 150px' }}>
        <WrapperTypeProduct>
          {/* {array.map((item) => {
            return (
              <ProductType name={item} key={item} />
            )
          })} */}
        </WrapperTypeProduct>
      </div>
      <div id='main' style={{ padding: '0 150px' }}>
        <SliderComponent arrayImages={[Slide1, Slide2, Slide3, Slide4]} />
        <WrapperProduct>
          {stateProducts?.map((product) => {
            console.log('product', product)
            return (
              <ProductBlock
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                type={product.type}
                selled={product.selled}
                id={product._id}
              />
            )
          })}

        </WrapperProduct>
        {/* <div style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
          <ButtonHover text="Nhấn để xem thêm" type='outline' styleButton={{
            padding: 0,
            margin: '13px 0px',
            border: '1px solid blue',
            color: 'blue',
            height: '40px',
            width: '200px'
          }} styleTextButton={{ fontWeight: 500 }}
            onClick={() => setLimit((prev) => prev + 4)} />
        </div> */}
      </div>
    </Loading>
  )
}

export default HomePage
