import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div `
    display: flex;
    align-item: center;
    gap: 50px;
    height: 20px;
    border-bottom: 1px dashed;
`

export const ButtonHover = styled(ButtonComponent)`
&:hover {
    color: white;
    background-color: rgb(113, 135, 226);
    span{
        color: white
    }
}
`
   
export const WrapperProduct = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
`
