import { Col, Image, Rate, Row } from 'antd'
import React from 'react'
import imageProductSmall from '../../assets/images/small1.jpg'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import { useMemo } from 'react'

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const [errorLimitOrder, setErrorLimitOrder] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()


  const onChange = (value) => {
    setNumProduct(Number(value))
  }

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if (id) {
      const res = await ProductService.getDetailsProduct(id)
      return res.data
    }
  }

  useEffect(() => {
    initFacebookSDK()
  }, [])

  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
    if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
      setErrorLimitOrder(false)
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true)
    }
  }, [numProduct])

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success('Đã thêm vào giỏ hàng')
    }
    return () => {
      dispatch(resetOrder())
    }
  }, [order.isSucessOrder])

  const handleChangeCount = (type, limited) => {
    if (type === 'increase') {
      if (!limited) {
        setNumProduct(numProduct + 1)
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1)
      }
    }
  }

  const { isPending, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct
  });

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/SignInPage', { state: location?.pathname })
    } else {
      // {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
      if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
        dispatch(addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInstock: productDetails?.countInStock
          }
        }))
      } else {
        setErrorLimitOrder(true)
      }
    }
  }

  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: '100%' }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
          <Image src={productDetails?.image} alt="image of product" preview={false} />
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
          <WrapperAddressProduct style={{ marginLeft: '20px' }}>Mô tả sản phẩm: {productDetails?.description}</WrapperAddressProduct>
          <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ marginBottom: '10px', marginLeft: '20px' }}>Số lượng</div>
            <WrapperQualityProduct>
              <button style={{ border: 'none', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                <MinusOutlined style={{ color: '#000', fontSize: '18px' }} />
              </button>
              <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
              <button style={{ border: 'none', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                <PlusOutlined style={{ color: '#000', fontSize: '18px' }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: 'red',
                  height: '48px',
                  width: '250px',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  marginLeft: '20px'
                }}
                onClick={handleAddOrderProduct}
                text={'Mua hàng'}
                styleTextButton={{ color: 'white', fontSize: '25px', fontWeight: 'bold' }}
              ></ButtonComponent>
              {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>}
            </div>
          </div>
        </Col>

      </Row >

    </Loading >
  )
}

export default ProductDetailsComponent