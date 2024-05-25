import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.p`
    color: black;
    font-size: 30px;
    margin: 4px 0;
    text-align: center;
    font-weight: bold;
    margin: 5px 0;
`
export const WrapperHeaderSub = styled.p`
    color: grey;
    font-size: 15px;
    margin: 4px 0;
    text-align: center;
    font-style: italic;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    background: #BBF0E3;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 14px;
    line-height: 30px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: cemter;
    gap: 20px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`