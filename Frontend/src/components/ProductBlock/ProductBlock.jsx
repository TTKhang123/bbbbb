import React from 'react'
import { CardStyle, NameOfProduct, PriceOfProduct, RatingProps } from './style'
import { useNavigate } from 'react-router-dom';
import { SpaceCompactItemContext } from 'antd/es/space/Compact';

const ProductBlock = (props) => {
  const { countInStock, description, image, name, price, type, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <div>
      <CardStyle
        hoverable
        head={{ width: '200px', height: '200px' }}
        cover={<img alt="example" src={image} />}
        body={{ padding: '10px' }}
        style={{ width: 200 }}
        // className="custom-card"
        onClick={() => handleDetailsProduct(id)}
      >
        <NameOfProduct>{name}</NameOfProduct>
        <RatingProps>
          <span style={{ fontSize: '13px' }}>Phân loại: {type}</span>
        </RatingProps>
        <PriceOfProduct>{price} VNĐ
        </PriceOfProduct>
      </CardStyle>
    </div>
  )
}

export default ProductBlock