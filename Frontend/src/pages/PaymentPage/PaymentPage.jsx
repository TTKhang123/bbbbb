

import { WrapperBank, WrapperInfo, WrapperRight, WrapperTotal } from './style';

import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const PaymentPage = () => {
  const order = useSelector((state) => state.order)

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])

  const diliveryPriceMemo = useMemo(() => {
    return 10000
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', fontSize: '35px' }}>Thanh toán</h3>
        <WrapperBank>
          <h3>Thông tin chuyển khoản</h3>
          <h4>Ngân hàng: Vietcombank</h4>
          <h4>STK: 012345678</h4>
          <h4>Nội dung: Tên người đặt - SĐT - Tên sản phẩm - Địa chỉ giao hàng </h4>
        </WrapperBank>
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                </span>
              </WrapperTotal>
            </div>

          </WrapperRight>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage