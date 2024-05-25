import styled from "styled-components";
import { Card } from "antd";
export const NameOfProduct = styled.div
`
    line-height: 10px;
    font-size: 16px;
    font-weight: bold;  
    text-align: center;
`

export const RatingProps = styled.div
`
    font-size: 16px;
    font-weight: normal;
    margin-top: 8px;
    text-align: center;
`
export const PriceOfProduct = styled.div`
    color: red;
    font-size: 16px;
    font-weigth: 450;
    text-align: center;
    font-weight: bold;
`
export const CardStyle = styled(Card)`
    width: 150px;
    & img {
        height: 230px;
        width: 150px;
    }
`