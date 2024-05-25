import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import ProductBlock from '../../components/ProductBlock/ProductBlock'
import { Pagination, Row, Col } from 'antd'
import { ProductsWrapper, WrapperNavigation } from './style'

const TypeProductPage = () => {
    const onChange = () => {}
  return (
    <div style={{padding: '0 110px', backgroundColor:'#F7F9FA'}}>
    <Row style={{ flexWrap:'nowrap', paddingTop: '20px'}}>
        <WrapperNavigation span={4}>
            <Navigation/>
        </WrapperNavigation>
        <Col span={20}>
        <ProductsWrapper>
             <ProductBlock/>
             <ProductBlock/>
             <ProductBlock/>
             <ProductBlock/>
             <ProductBlock/>
             <ProductBlock/>
             <ProductBlock/>
             <ProductBlock/>
        </ProductsWrapper>
        <Pagination defaultCurrent={1} onChange={onChange} total={50} style={{textAlign: 'center', margin:'18px 0'}} />
        </Col>
    </Row>
       
    </div>
  )
}

export default TypeProductPage